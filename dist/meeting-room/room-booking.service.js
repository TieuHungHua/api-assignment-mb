"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomBookingService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
const booking_search_dto_1 = require("./dto/booking-search.dto");
const BLOCKING_STATUSES = [
    client_1.RoomBookingStatus.pending,
    client_1.RoomBookingStatus.approved,
];
const BOOKING_INCLUDE = {
    room: {
        include: {
            resources: true,
        },
    },
    user: {
        select: {
            id: true,
            displayName: true,
            email: true,
            studentId: true,
            username: true,
        },
    },
};
let RoomBookingService = class RoomBookingService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createBooking(user, dto) {
        const startAt = new Date(dto.start_at);
        const endAt = new Date(dto.end_at);
        if (Number.isNaN(startAt.getTime()) || Number.isNaN(endAt.getTime())) {
            throw new common_1.BadRequestException('Invalid start_at or end_at');
        }
        this.assertOneHourSlot(startAt, endAt);
        const room = await this.prisma.meetingRoom.findUnique({
            where: { id: dto.room_id },
            include: { resources: true },
        });
        if (!room || !room.isActive) {
            throw new common_1.NotFoundException('Room not found');
        }
        if (dto.attendee_count > room.capacity) {
            throw new common_1.BadRequestException('attendee_count exceeds room capacity');
        }
        const purpose = dto.purpose.trim();
        if (!purpose) {
            throw new common_1.BadRequestException('purpose is required');
        }
        const status = this.getDefaultStatus();
        const now = new Date();
        const booking = await this.prisma.$transaction(async (tx) => {
            await this.assertNoConflict(tx, dto.room_id, startAt, endAt);
            const createdBooking = await tx.roomBooking.create({
                data: {
                    roomId: dto.room_id,
                    userId: user.id,
                    startAt,
                    endAt,
                    purpose,
                    attendeeCount: dto.attendee_count,
                    status,
                    approvedAt: status === client_1.RoomBookingStatus.approved ? now : null,
                },
                include: BOOKING_INCLUDE,
            });
            await tx.ticket.create({
                data: {
                    userId: user.id,
                    type: client_1.TicketType.room_booking,
                    status: client_1.TicketStatus.pending,
                    roomId: dto.room_id,
                    startAt,
                    endAt,
                    reason: purpose,
                },
            });
            return createdBooking;
        });
        return this.formatBooking(booking);
    }
    async searchBookings(criteria, currentUser) {
        if (currentUser) {
            this.assertKnownRole(currentUser.role);
        }
        const page = criteria.page ?? 1;
        const pageSize = criteria.pageSize ?? 20;
        const skip = (page - 1) * pageSize;
        const where = this.buildBookingWhere(criteria);
        const orderBy = this.buildBookingOrderBy(criteria);
        const [items, total] = await Promise.all([
            this.prisma.roomBooking.findMany({
                where,
                include: BOOKING_INCLUDE,
                orderBy,
                skip,
                take: pageSize,
            }),
            this.prisma.roomBooking.count({ where }),
        ]);
        return {
            items: items.map((item) => this.formatBooking(item)),
            meta: {
                page,
                pageSize,
                totalItems: total,
                totalPages: Math.ceil(total / pageSize),
            },
        };
    }
    async getBookingById(id, currentUser) {
        if (currentUser) {
            this.assertKnownRole(currentUser.role);
        }
        const booking = await this.prisma.roomBooking.findUnique({
            where: { id },
            include: BOOKING_INCLUDE,
        });
        if (!booking) {
            throw new common_1.NotFoundException('Booking not found');
        }
        return this.formatBooking(booking);
    }
    async cancelBooking(id, currentUser, dto) {
        const booking = await this.prisma.roomBooking.findUnique({
            where: { id },
            include: BOOKING_INCLUDE,
        });
        if (!booking) {
            throw new common_1.NotFoundException('Booking not found');
        }
        if (!this.isOwnerOrStaff(booking.userId, currentUser)) {
            throw new common_1.ForbiddenException('Not allowed to cancel this booking');
        }
        if (!BLOCKING_STATUSES.includes(booking.status)) {
            throw new common_1.BadRequestException('Booking cannot be cancelled');
        }
        const updated = await this.prisma.$transaction(async (tx) => {
            const updatedBooking = await tx.roomBooking.update({
                where: { id },
                data: {
                    status: client_1.RoomBookingStatus.cancelled,
                    cancelledBy: currentUser.id,
                    cancelledAt: new Date(),
                    cancelReason: dto.reason?.trim() || null,
                },
                include: BOOKING_INCLUDE,
            });
            await tx.ticket.create({
                data: {
                    userId: booking.userId,
                    type: client_1.TicketType.room_cancellation,
                    status: client_1.TicketStatus.pending,
                    roomId: booking.roomId,
                    startAt: booking.startAt,
                    endAt: booking.endAt,
                    reason: dto.reason?.trim() || 'Hủy đặt phòng',
                },
            });
            return updatedBooking;
        });
        return this.formatBooking(updated);
    }
    async approveBooking(id, currentUser) {
        this.assertStaffRole(currentUser.role);
        const booking = await this.prisma.roomBooking.findUnique({
            where: { id },
            include: BOOKING_INCLUDE,
        });
        if (!booking) {
            throw new common_1.NotFoundException('Booking not found');
        }
        if (booking.status !== client_1.RoomBookingStatus.pending) {
            throw new common_1.BadRequestException('Only pending bookings can be approved');
        }
        await this.assertNoConflict(this.prisma, booking.roomId, booking.startAt, booking.endAt, booking.id);
        const updated = await this.prisma.roomBooking.update({
            where: { id },
            data: {
                status: client_1.RoomBookingStatus.approved,
                approvedBy: currentUser.id,
                approvedAt: new Date(),
            },
            include: BOOKING_INCLUDE,
        });
        return this.formatBooking(updated);
    }
    async rejectBooking(id, currentUser, dto) {
        this.assertStaffRole(currentUser.role);
        const booking = await this.prisma.roomBooking.findUnique({
            where: { id },
            include: BOOKING_INCLUDE,
        });
        if (!booking) {
            throw new common_1.NotFoundException('Booking not found');
        }
        if (booking.status !== client_1.RoomBookingStatus.pending) {
            throw new common_1.BadRequestException('Only pending bookings can be rejected');
        }
        const updated = await this.prisma.roomBooking.update({
            where: { id },
            data: {
                status: client_1.RoomBookingStatus.cancelled,
                cancelledBy: currentUser.id,
                cancelledAt: new Date(),
                cancelReason: dto.reason?.trim() || null,
            },
            include: BOOKING_INCLUDE,
        });
        return this.formatBooking(updated);
    }
    assertKnownRole(role) {
        if (!role) {
            throw new common_1.ForbiddenException('Role is required');
        }
    }
    assertStaffRole(role) {
        if (role !== client_1.UserRole.admin && role !== client_1.UserRole.lecturer) {
            throw new common_1.ForbiddenException('Admin or staff role required');
        }
    }
    isOwnerOrStaff(ownerId, currentUser) {
        if (ownerId === currentUser.id) {
            return true;
        }
        return (currentUser.role === client_1.UserRole.admin ||
            currentUser.role === client_1.UserRole.lecturer);
    }
    assertOneHourSlot(startAt, endAt) {
        if (startAt >= endAt) {
            throw new common_1.BadRequestException('start_at must be before end_at');
        }
        const durationMs = endAt.getTime() - startAt.getTime();
        const oneHourMs = 60 * 60 * 1000;
        if (durationMs !== oneHourMs) {
            throw new common_1.BadRequestException('Slot must be exactly 60 minutes');
        }
        if (startAt.getMinutes() !== 0 ||
            startAt.getSeconds() !== 0 ||
            startAt.getMilliseconds() !== 0) {
            throw new common_1.BadRequestException('start_at must be aligned to the hour');
        }
    }
    getDefaultStatus() {
        return process.env.BOOKING_AUTO_APPROVE === 'true'
            ? client_1.RoomBookingStatus.approved
            : client_1.RoomBookingStatus.pending;
    }
    async assertNoConflict(prisma, roomId, startAt, endAt, excludeId) {
        const conflict = await prisma.roomBooking.findFirst({
            where: {
                roomId,
                status: { in: BLOCKING_STATUSES },
                AND: [{ startAt: { lt: endAt } }, { endAt: { gt: startAt } }],
                ...(excludeId ? { NOT: { id: excludeId } } : {}),
            },
            select: { id: true },
        });
        if (conflict) {
            throw new common_1.ConflictException('Room is already booked for this slot');
        }
    }
    buildBookingWhere(criteria) {
        const filters = criteria.filters ?? [];
        if (!filters.length) {
            return {};
        }
        const andConditions = [];
        for (const filter of filters) {
            const mappedField = this.mapFilterField(filter.field);
            if (!mappedField) {
                throw new common_1.BadRequestException(`Unsupported filter field: ${filter.field}`);
            }
            const value = this.coerceFilterValue(mappedField, filter.value);
            const condition = this.buildFilterCondition(mappedField, filter.op, value);
            andConditions.push(condition);
        }
        return { AND: andConditions };
    }
    mapFilterField(field) {
        switch (field) {
            case 'status':
                return 'status';
            case 'start_at':
                return 'startAt';
            case 'end_at':
                return 'endAt';
            case 'created_at':
                return 'createdAt';
            case 'room_id':
                return 'roomId';
            case 'user_id':
                return 'userId';
            case 'attendee_count':
                return 'attendeeCount';
            case 'purpose':
                return 'purpose';
            default:
                return null;
        }
    }
    coerceFilterValue(field, value) {
        if (field === 'status') {
            if (Array.isArray(value)) {
                return value.map((item) => this.normalizeStatus(String(item)));
            }
            return this.normalizeStatus(String(value));
        }
        if (field === 'startAt' || field === 'endAt' || field === 'createdAt') {
            const parseDate = (input) => {
                const parsed = new Date(String(input));
                if (Number.isNaN(parsed.getTime())) {
                    throw new common_1.BadRequestException(`Invalid date value for ${field}`);
                }
                return parsed;
            };
            if (Array.isArray(value)) {
                return value.map((item) => parseDate(item));
            }
            return parseDate(value);
        }
        if (field === 'attendeeCount') {
            const parseNumber = (input) => {
                const parsed = Number(input);
                if (Number.isNaN(parsed)) {
                    throw new common_1.BadRequestException('Invalid attendee_count value');
                }
                return parsed;
            };
            if (Array.isArray(value)) {
                return value.map((item) => parseNumber(item));
            }
            return parseNumber(value);
        }
        return value;
    }
    normalizeStatus(status) {
        const normalized = status.toLowerCase();
        if (Object.values(client_1.RoomBookingStatus).includes(normalized)) {
            return normalized;
        }
        throw new common_1.BadRequestException(`Invalid status: ${status}`);
    }
    buildFilterCondition(field, op, value) {
        switch (op) {
            case booking_search_dto_1.FilterOperator.EQ:
                return { [field]: value };
            case booking_search_dto_1.FilterOperator.NE:
                return { [field]: { not: value } };
            case booking_search_dto_1.FilterOperator.IN:
                return {
                    [field]: { in: Array.isArray(value) ? value : [value] },
                };
            case booking_search_dto_1.FilterOperator.GTE:
                return { [field]: { gte: value } };
            case booking_search_dto_1.FilterOperator.LTE:
                return { [field]: { lte: value } };
            case booking_search_dto_1.FilterOperator.GT:
                return { [field]: { gt: value } };
            case booking_search_dto_1.FilterOperator.LT:
                return { [field]: { lt: value } };
            case booking_search_dto_1.FilterOperator.CONTAINS:
                if (field !== 'purpose') {
                    throw new common_1.BadRequestException('CONTAINS is only supported for purpose');
                }
                return {
                    purpose: { contains: String(value), mode: 'insensitive' },
                };
            default:
                throw new common_1.BadRequestException('Unsupported operator');
        }
    }
    buildBookingOrderBy(criteria) {
        const sorts = criteria.sorts ?? [];
        if (!sorts.length) {
            return [{ startAt: 'desc' }];
        }
        return sorts.map((sort) => {
            const sortField = sort.field;
            const field = this.mapSortField(sortField);
            if (!field) {
                throw new common_1.BadRequestException(`Unsupported sort field: ${sortField}`);
            }
            const direction = sort.dir === booking_search_dto_1.SortDirection.ASC ? 'asc' : 'desc';
            return { [field]: direction };
        });
    }
    mapSortField(field) {
        switch (field) {
            case 'start_at':
                return 'startAt';
            case 'end_at':
                return 'endAt';
            case 'created_at':
                return 'createdAt';
            case 'status':
                return 'status';
            case 'attendee_count':
                return 'attendeeCount';
            default:
                return null;
        }
    }
    formatBooking(booking) {
        return {
            id: booking.id,
            room_id: booking.roomId,
            user_id: booking.userId,
            start_at: booking.startAt.toISOString(),
            end_at: booking.endAt.toISOString(),
            purpose: booking.purpose,
            attendee_count: booking.attendeeCount,
            status: booking.status,
            approved_by: booking.approvedBy,
            approved_at: booking.approvedAt ? booking.approvedAt.toISOString() : null,
            cancelled_by: booking.cancelledBy,
            cancelled_at: booking.cancelledAt
                ? booking.cancelledAt.toISOString()
                : null,
            cancel_reason: booking.cancelReason,
            created_at: booking.createdAt.toISOString(),
            updated_at: booking.updatedAt.toISOString(),
            room: {
                id: booking.room.id,
                name: booking.room.name,
                capacity: booking.room.capacity,
                image_url: booking.room.imageUrl,
                resources: booking.room.resources.map((resource) => resource.type),
            },
            user: {
                id: booking.user.id,
                name: booking.user.displayName,
                email: booking.user.email,
                student_code: booking.user.studentId,
                username: booking.user.username,
            },
        };
    }
};
exports.RoomBookingService = RoomBookingService;
exports.RoomBookingService = RoomBookingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RoomBookingService);
//# sourceMappingURL=room-booking.service.js.map