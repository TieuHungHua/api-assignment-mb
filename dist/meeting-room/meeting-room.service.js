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
exports.MeetingRoomService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let MeetingRoomService = class MeetingRoomService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getRoomsWithAvailability(query) {
        const startAt = new Date(query.start_at);
        const endAt = new Date(query.end_at);
        if (Number.isNaN(startAt.getTime()) || Number.isNaN(endAt.getTime())) {
            throw new common_1.BadRequestException('Invalid start_at or end_at');
        }
        this.assertOneHourSlot(startAt, endAt);
        const page = Number(query.page ?? 1);
        const pageSize = Number(query.pageSize ?? 20);
        const skip = (page - 1) * pageSize;
        const orderBy = this.buildRoomOrderBy(query.sortBy, query.sortDir);
        const [rooms, total] = await Promise.all([
            this.prisma.meetingRoom.findMany({
                where: { isActive: true },
                include: { resources: true },
                orderBy,
                skip,
                take: pageSize,
            }),
            this.prisma.meetingRoom.count({ where: { isActive: true } }),
        ]);
        const roomIds = rooms.map((room) => room.id);
        const conflicts = roomIds.length
            ? await this.prisma.roomBooking.findMany({
                where: {
                    roomId: { in: roomIds },
                    status: {
                        in: [client_1.RoomBookingStatus.pending, client_1.RoomBookingStatus.approved],
                    },
                    AND: [{ startAt: { lt: endAt } }, { endAt: { gt: startAt } }],
                },
                select: { roomId: true },
            })
            : [];
        const busyRoomIds = new Set(conflicts.map((item) => item.roomId));
        return {
            items: rooms.map((room) => ({
                id: room.id,
                name: room.name,
                capacity: room.capacity,
                image_url: room.imageUrl,
                resources: room.resources.map((resource) => resource.type),
                availability: {
                    is_available: !busyRoomIds.has(room.id),
                },
            })),
            meta: {
                page,
                pageSize,
                totalItems: total,
                totalPages: Math.ceil(total / pageSize),
            },
        };
    }
    buildRoomOrderBy(sortBy, sortDir) {
        const direction = sortDir === 'asc' ? 'asc' : 'desc';
        switch (sortBy) {
            case 'capacity':
                return { capacity: direction };
            case 'created_at':
                return { createdAt: direction };
            case 'name':
            default:
                return { name: direction };
        }
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
};
exports.MeetingRoomService = MeetingRoomService;
exports.MeetingRoomService = MeetingRoomService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MeetingRoomService);
//# sourceMappingURL=meeting-room.service.js.map