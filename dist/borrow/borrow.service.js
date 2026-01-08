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
exports.BorrowService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let BorrowService = class BorrowService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, createBorrowDto) {
        const book = await this.prisma.book.findUnique({
            where: { id: createBorrowDto.bookId },
        });
        if (!book) {
            throw new common_1.NotFoundException('Sách không tồn tại');
        }
        if (book.availableCopies <= 0) {
            throw new common_1.BadRequestException('Sách hiện không còn bản sao có sẵn');
        }
        const existingBorrow = await this.prisma.borrow.findFirst({
            where: {
                userId,
                bookId: createBorrowDto.bookId,
                status: client_1.BorrowStatus.active,
            },
        });
        if (existingBorrow) {
            throw new common_1.BadRequestException('Bạn đang mượn sách này rồi');
        }
        const result = await this.prisma.$transaction(async (tx) => {
            const borrow = await tx.borrow.create({
                data: {
                    userId,
                    bookId: createBorrowDto.bookId,
                    dueAt: new Date(createBorrowDto.dueAt),
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            username: true,
                            displayName: true,
                        },
                    },
                    book: {
                        select: {
                            id: true,
                            title: true,
                            author: true,
                        },
                    },
                },
            });
            await tx.book.update({
                where: { id: createBorrowDto.bookId },
                data: {
                    availableCopies: {
                        decrement: 1,
                    },
                    borrowCount: {
                        increment: 1,
                    },
                },
            });
            await tx.user.update({
                where: { id: userId },
                data: {
                    totalBorrowed: {
                        increment: 1,
                    },
                },
            });
            await tx.pointTransaction.create({
                data: {
                    userId,
                    delta: 10,
                    reason: client_1.PointReason.borrow,
                    refType: 'borrow_id',
                    refId: borrow.id,
                    note: 'Mượn sách',
                },
            });
            await tx.activity.create({
                data: {
                    userId,
                    eventType: client_1.EventType.borrow,
                    bookId: createBorrowDto.bookId,
                    payload: {
                        borrowId: borrow.id,
                        dueAt: createBorrowDto.dueAt,
                    },
                },
            });
            await tx.ticket.create({
                data: {
                    userId,
                    type: client_1.TicketType.borrow_book,
                    status: client_1.TicketStatus.pending,
                    bookId: createBorrowDto.bookId,
                    reason: `Yêu cầu mượn sách: ${book.title}`,
                },
            });
            return borrow;
        });
        return result;
    }
    async findAll(query, userId) {
        const page = query.page || 1;
        const limit = query.limit || 10;
        const skip = (page - 1) * limit;
        const where = {};
        if (userId) {
            where.userId = userId;
        }
        if (query.status) {
            where.status = query.status;
        }
        if (query.search) {
            where.book = {
                OR: [
                    {
                        title: {
                            contains: query.search,
                            mode: 'insensitive',
                        },
                    },
                    {
                        author: {
                            contains: query.search,
                            mode: 'insensitive',
                        },
                    },
                ],
            };
        }
        const [borrows, total] = await Promise.all([
            this.prisma.borrow.findMany({
                where,
                include: {
                    user: {
                        select: {
                            id: true,
                            username: true,
                            displayName: true,
                        },
                    },
                    book: {
                        select: {
                            id: true,
                            title: true,
                            author: true,
                            coverImage: true,
                            availableCopies: true,
                        },
                    },
                },
                orderBy: {
                    dueAt: 'asc',
                },
                skip,
                take: limit,
            }),
            this.prisma.borrow.count({ where }),
        ]);
        const now = new Date();
        const borrowsWithCalculatedFields = borrows.map((borrow) => {
            const dueDate = new Date(borrow.dueAt);
            const daysLeft = Math.ceil((dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
            const isExpired = daysLeft < 0;
            return {
                ...borrow,
                daysLeft,
                isExpired,
            };
        });
        return {
            data: borrowsWithCalculatedFields,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async findOne(id, userId) {
        const borrow = await this.prisma.borrow.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        displayName: true,
                    },
                },
                book: {
                    select: {
                        id: true,
                        title: true,
                        author: true,
                    },
                },
            },
        });
        if (!borrow) {
            throw new common_1.NotFoundException('Lịch sử mượn không tồn tại');
        }
        if (userId && borrow.userId !== userId) {
            throw new common_1.ForbiddenException('Bạn không có quyền xem lịch sử mượn này');
        }
        return borrow;
    }
    async returnBook(id, userId) {
        const borrow = await this.prisma.borrow.findUnique({
            where: { id },
            include: {
                book: true,
            },
        });
        if (!borrow) {
            throw new common_1.NotFoundException('Lịch sử mượn không tồn tại');
        }
        if (borrow.userId !== userId) {
            throw new common_1.ForbiddenException('Bạn không có quyền trả sách này');
        }
        if (borrow.status === client_1.BorrowStatus.returned) {
            throw new common_1.BadRequestException('Sách đã được trả rồi');
        }
        const now = new Date();
        const isLate = now > borrow.dueAt;
        const result = await this.prisma.$transaction(async (tx) => {
            const updated = await tx.borrow.update({
                where: { id },
                data: {
                    status: client_1.BorrowStatus.returned,
                    returnedAt: now,
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            username: true,
                            displayName: true,
                        },
                    },
                    book: {
                        select: {
                            id: true,
                            title: true,
                            author: true,
                        },
                    },
                },
            });
            await tx.book.update({
                where: { id: borrow.bookId },
                data: {
                    availableCopies: {
                        increment: 1,
                    },
                },
            });
            await tx.user.update({
                where: { id: userId },
                data: {
                    totalReturned: {
                        increment: 1,
                    },
                },
            });
            const points = isLate ? -5 : 5;
            await tx.pointTransaction.create({
                data: {
                    userId,
                    delta: points,
                    reason: isLate ? client_1.PointReason.return_late : client_1.PointReason.return_on_time,
                    refType: 'borrow_id',
                    refId: borrow.id,
                    note: isLate ? 'Trả sách muộn' : 'Trả sách đúng hạn',
                },
            });
            await tx.activity.create({
                data: {
                    userId,
                    eventType: client_1.EventType.return,
                    bookId: borrow.bookId,
                    payload: {
                        borrowId: borrow.id,
                        isLate,
                    },
                },
            });
            await tx.ticket.create({
                data: {
                    userId,
                    type: client_1.TicketType.return_book,
                    status: client_1.TicketStatus.pending,
                    bookId: borrow.bookId,
                    reason: `Yêu cầu trả sách: ${borrow.book.title}`,
                },
            });
            return updated;
        });
        return result;
    }
    async renew(id, userId, renewDto) {
        const borrow = await this.prisma.borrow.findUnique({
            where: { id },
            include: {
                book: {
                    select: {
                        id: true,
                        title: true,
                        author: true,
                    },
                },
            },
        });
        if (!borrow) {
            throw new common_1.NotFoundException('Lịch sử mượn không tồn tại');
        }
        if (borrow.userId !== userId) {
            throw new common_1.ForbiddenException('Bạn không có quyền gia hạn sách này');
        }
        if (borrow.status === client_1.BorrowStatus.returned) {
            throw new common_1.BadRequestException('Sách đã được trả rồi, không thể gia hạn');
        }
        if (borrow.renewCount >= borrow.maxRenewCount) {
            throw new common_1.BadRequestException('Bạn đã gia hạn tối đa số lần cho phép');
        }
        const now = new Date();
        const currentDueAt = new Date(borrow.dueAt);
        const daysRemaining = Math.ceil((currentDueAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        const totalDays = daysRemaining + renewDto.days;
        if (totalDays >= 30) {
            throw new common_1.BadRequestException(`Tổng thời gian gia hạn (${daysRemaining} ngày còn lại + ${renewDto.days} ngày gia hạn = ${totalDays} ngày) không được vượt quá 30 ngày`);
        }
        const newDueAt = new Date(currentDueAt);
        newDueAt.setDate(newDueAt.getDate() + renewDto.days);
        const updated = await this.prisma.borrow.update({
            where: { id },
            data: {
                dueAt: newDueAt,
                renewCount: {
                    increment: 1,
                },
            },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        displayName: true,
                    },
                },
                book: {
                    select: {
                        id: true,
                        title: true,
                        author: true,
                    },
                },
            },
        });
        return updated;
    }
    async remove(id, userId) {
        const borrow = await this.prisma.borrow.findUnique({
            where: { id },
        });
        if (!borrow) {
            throw new common_1.NotFoundException('Lịch sử mượn không tồn tại');
        }
        if (borrow.userId !== userId) {
            throw new common_1.ForbiddenException('Bạn không có quyền xóa lịch sử mượn này');
        }
        if (borrow.status !== client_1.BorrowStatus.returned) {
            throw new common_1.BadRequestException('Chỉ có thể xóa lịch sử mượn đã trả');
        }
        return this.prisma.borrow.delete({
            where: { id },
        });
    }
};
exports.BorrowService = BorrowService;
exports.BorrowService = BorrowService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BorrowService);
//# sourceMappingURL=borrow.service.js.map