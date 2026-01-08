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
exports.NotificationLogService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let NotificationLogService = class NotificationLogService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createDto) {
        return this.prisma.notificationLog.create({
            data: {
                userId: createDto.userId,
                borrowId: createDto.borrowId,
                title: createDto.title,
                body: createDto.body,
                status: createDto.status || 'pending',
            },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        displayName: true,
                    },
                },
                borrow: {
                    include: {
                        book: {
                            select: {
                                id: true,
                                title: true,
                                author: true,
                            },
                        },
                    },
                },
            },
        });
    }
    async findAll(query, userId) {
        const page = query.page || 1;
        const limit = query.limit || 10;
        const skip = (page - 1) * limit;
        const where = {};
        if (userId) {
            where.userId = userId;
        }
        else if (query.userId) {
            where.userId = query.userId;
        }
        if (query.status) {
            where.status = query.status;
        }
        if (query.borrowId) {
            where.borrowId = query.borrowId;
        }
        if (query.isRead !== undefined) {
            where.isRead = query.isRead;
        }
        const [logs, total] = await Promise.all([
            this.prisma.notificationLog.findMany({
                where,
                include: {
                    user: {
                        select: {
                            id: true,
                            username: true,
                            displayName: true,
                        },
                    },
                    borrow: {
                        include: {
                            book: {
                                select: {
                                    id: true,
                                    title: true,
                                    author: true,
                                },
                            },
                        },
                    },
                },
                orderBy: {
                    createdAt: 'desc',
                },
                skip,
                take: limit,
            }),
            this.prisma.notificationLog.count({ where }),
        ]);
        return {
            data: logs,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async findOne(id, userId) {
        const log = await this.prisma.notificationLog.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        displayName: true,
                    },
                },
                borrow: {
                    include: {
                        book: {
                            select: {
                                id: true,
                                title: true,
                                author: true,
                            },
                        },
                    },
                },
            },
        });
        if (!log) {
            throw new common_1.NotFoundException('Thông báo không tồn tại');
        }
        if (userId && log.userId !== userId) {
            throw new common_1.NotFoundException('Thông báo không tồn tại');
        }
        return log;
    }
    async update(id, updateDto, userId) {
        const log = await this.prisma.notificationLog.findUnique({
            where: { id },
        });
        if (!log) {
            throw new common_1.NotFoundException('Thông báo không tồn tại');
        }
        if (userId && log.userId !== userId) {
            throw new common_1.NotFoundException('Thông báo không tồn tại');
        }
        const updateData = {};
        if (updateDto.title !== undefined) {
            updateData.title = updateDto.title;
        }
        if (updateDto.body !== undefined) {
            updateData.body = updateDto.body;
        }
        if (updateDto.status !== undefined) {
            updateData.status = updateDto.status;
            if (updateDto.status === 'sent') {
                updateData.sentAt = new Date();
            }
        }
        if (updateDto.errorMessage !== undefined) {
            updateData.errorMessage = updateDto.errorMessage;
        }
        if (updateDto.isRead !== undefined) {
            updateData.isRead = updateDto.isRead;
            if (updateDto.isRead === true) {
                updateData.readAt = new Date();
            }
            else if (updateDto.isRead === false) {
                updateData.readAt = null;
            }
        }
        return this.prisma.notificationLog.update({
            where: { id },
            data: updateData,
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        displayName: true,
                    },
                },
                borrow: {
                    include: {
                        book: {
                            select: {
                                id: true,
                                title: true,
                                author: true,
                            },
                        },
                    },
                },
            },
        });
    }
    async remove(id, userId) {
        const log = await this.prisma.notificationLog.findUnique({
            where: { id },
        });
        if (!log) {
            throw new common_1.NotFoundException('Thông báo không tồn tại');
        }
        if (userId && log.userId !== userId) {
            throw new common_1.NotFoundException('Thông báo không tồn tại');
        }
        return this.prisma.notificationLog.delete({
            where: { id },
        });
    }
    async markAsRead(id, userId) {
        const log = await this.prisma.notificationLog.findUnique({
            where: { id },
        });
        if (!log) {
            throw new common_1.NotFoundException('Thông báo không tồn tại');
        }
        if (userId && log.userId !== userId) {
            throw new common_1.NotFoundException('Thông báo không tồn tại');
        }
        if (log.isRead) {
            return this.prisma.notificationLog.findUnique({
                where: { id },
                include: {
                    user: {
                        select: {
                            id: true,
                            username: true,
                            displayName: true,
                        },
                    },
                    borrow: {
                        include: {
                            book: {
                                select: {
                                    id: true,
                                    title: true,
                                    author: true,
                                },
                            },
                        },
                    },
                },
            });
        }
        return this.prisma.notificationLog.update({
            where: { id },
            data: {
                isRead: true,
                readAt: new Date(),
            },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        displayName: true,
                    },
                },
                borrow: {
                    include: {
                        book: {
                            select: {
                                id: true,
                                title: true,
                                author: true,
                            },
                        },
                    },
                },
            },
        });
    }
    async markAllAsRead(userId) {
        const result = await this.prisma.notificationLog.updateMany({
            where: {
                userId,
                isRead: false,
            },
            data: {
                isRead: true,
                readAt: new Date(),
            },
        });
        return {
            message: 'Tất cả thông báo đã được đánh dấu đã đọc',
            count: result.count,
        };
    }
};
exports.NotificationLogService = NotificationLogService;
exports.NotificationLogService = NotificationLogService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NotificationLogService);
//# sourceMappingURL=notification-log.service.js.map