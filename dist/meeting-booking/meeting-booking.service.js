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
exports.MeetingBookingService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
const crypto_1 = require("crypto");
const MEETING_BOOKING_INCLUDE = {
    user: {
        select: {
            id: true,
            username: true,
            displayName: true,
            role: true,
        },
    },
};
let MeetingBookingService = class MeetingBookingService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    ensureRoleAllowed(role) {
        const allowedRoles = [
            client_1.UserRole.admin,
            client_1.UserRole.lecturer,
            client_1.UserRole.student,
        ];
        if (!allowedRoles.includes(role)) {
            throw new common_1.ForbiddenException('User role is not allowed');
        }
    }
    async create(createMeetingBookingDto) {
        const user = await this.prisma.user.findUnique({
            where: { id: createMeetingBookingDto.userId },
            select: {
                id: true,
                username: true,
                displayName: true,
                role: true,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        this.ensureRoleAllowed(user.role);
        const startAt = new Date(createMeetingBookingDto.startAt);
        const endAt = new Date(createMeetingBookingDto.endAt);
        if (Number.isNaN(startAt.getTime()) || Number.isNaN(endAt.getTime())) {
            throw new common_1.BadRequestException('Invalid startAt or endAt');
        }
        if (endAt <= startAt) {
            throw new common_1.BadRequestException('endAt must be after startAt');
        }
        const overlap = await this.prisma.meetingBookingLegacy.findFirst({
            where: {
                tableName: createMeetingBookingDto.tableName,
                startAt: { lt: endAt },
                endAt: { gt: startAt },
            },
        });
        if (overlap) {
            throw new common_1.BadRequestException('Time slot already booked');
        }
        return this.prisma.meetingBookingLegacy.create({
            data: {
                id: (0, crypto_1.randomUUID)(),
                userId: user.id,
                tableName: createMeetingBookingDto.tableName,
                startAt,
                endAt,
                purpose: createMeetingBookingDto.purpose,
                attendees: createMeetingBookingDto.attendees,
                updatedAt: new Date(),
            },
            include: MEETING_BOOKING_INCLUDE,
        });
    }
    async findAll(criteria) {
        const page = criteria.page || 1;
        const limit = criteria.limit || 10;
        const skip = (page - 1) * limit;
        const [bookings, total] = await Promise.all([
            this.prisma.meetingBookingLegacy.findMany({
                include: MEETING_BOOKING_INCLUDE,
                orderBy: {
                    startAt: 'desc',
                },
                skip,
                take: limit,
            }),
            this.prisma.meetingBookingLegacy.count(),
        ]);
        return {
            data: bookings,
            criteria: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async findOne(id) {
        const booking = await this.prisma.meetingBookingLegacy.findUnique({
            where: { id },
            include: MEETING_BOOKING_INCLUDE,
        });
        if (!booking) {
            throw new common_1.NotFoundException('Meeting booking not found');
        }
        return booking;
    }
    async update(id, updateMeetingBookingDto) {
        const existingBooking = await this.prisma.meetingBookingLegacy.findUnique({
            where: { id },
        });
        if (!existingBooking) {
            throw new common_1.NotFoundException('Meeting booking not found');
        }
        const user = await this.prisma.user.findUnique({
            where: { id: updateMeetingBookingDto.userId },
            select: {
                id: true,
                username: true,
                displayName: true,
                role: true,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        this.ensureRoleAllowed(user.role);
        const hasChanges = updateMeetingBookingDto.tableName !== undefined ||
            updateMeetingBookingDto.startAt !== undefined ||
            updateMeetingBookingDto.endAt !== undefined ||
            updateMeetingBookingDto.purpose !== undefined ||
            updateMeetingBookingDto.attendees !== undefined;
        if (!hasChanges) {
            throw new common_1.BadRequestException('No data to update');
        }
        const startAt = updateMeetingBookingDto.startAt !== undefined
            ? new Date(updateMeetingBookingDto.startAt)
            : existingBooking.startAt;
        const endAt = updateMeetingBookingDto.endAt !== undefined
            ? new Date(updateMeetingBookingDto.endAt)
            : existingBooking.endAt;
        if (Number.isNaN(startAt.getTime()) || Number.isNaN(endAt.getTime())) {
            throw new common_1.BadRequestException('Invalid startAt or endAt');
        }
        if (endAt <= startAt) {
            throw new common_1.BadRequestException('endAt must be after startAt');
        }
        const tableName = updateMeetingBookingDto.tableName !== undefined
            ? updateMeetingBookingDto.tableName
            : existingBooking.tableName;
        const shouldCheckOverlap = updateMeetingBookingDto.tableName !== undefined ||
            updateMeetingBookingDto.startAt !== undefined ||
            updateMeetingBookingDto.endAt !== undefined;
        if (shouldCheckOverlap) {
            const overlap = await this.prisma.meetingBookingLegacy.findFirst({
                where: {
                    id: { not: id },
                    tableName,
                    startAt: { lt: endAt },
                    endAt: { gt: startAt },
                },
            });
            if (overlap) {
                throw new common_1.BadRequestException('Time slot already booked');
            }
        }
        const data = {};
        if (updateMeetingBookingDto.tableName !== undefined) {
            data.tableName = updateMeetingBookingDto.tableName;
        }
        if (updateMeetingBookingDto.startAt !== undefined) {
            data.startAt = startAt;
        }
        if (updateMeetingBookingDto.endAt !== undefined) {
            data.endAt = endAt;
        }
        if (updateMeetingBookingDto.purpose !== undefined) {
            data.purpose = updateMeetingBookingDto.purpose;
        }
        if (updateMeetingBookingDto.attendees !== undefined) {
            data.attendees = updateMeetingBookingDto.attendees;
        }
        return this.prisma.meetingBookingLegacy.update({
            where: { id },
            data,
            include: MEETING_BOOKING_INCLUDE,
        });
    }
    async remove(id, userId) {
        if (!userId) {
            throw new common_1.BadRequestException('userId is required');
        }
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                username: true,
                displayName: true,
                role: true,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        this.ensureRoleAllowed(user.role);
        const booking = await this.prisma.meetingBookingLegacy.findUnique({
            where: { id },
        });
        if (!booking) {
            throw new common_1.NotFoundException('Meeting booking not found');
        }
        return this.prisma.meetingBookingLegacy.delete({
            where: { id },
            include: MEETING_BOOKING_INCLUDE,
        });
    }
};
exports.MeetingBookingService = MeetingBookingService;
exports.MeetingBookingService = MeetingBookingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MeetingBookingService);
//# sourceMappingURL=meeting-booking.service.js.map