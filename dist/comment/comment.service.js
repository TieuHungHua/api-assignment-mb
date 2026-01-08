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
exports.CommentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let CommentService = class CommentService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createComment(userId, bookId, createCommentDto) {
        const book = await this.prisma.book.findUnique({
            where: { id: bookId },
        });
        if (!book) {
            throw new common_1.NotFoundException('Sách không tồn tại');
        }
        const existingComment = await this.prisma.comment.findUnique({
            where: {
                userId_bookId: {
                    userId,
                    bookId,
                },
            },
        });
        if (existingComment) {
            throw new common_1.BadRequestException('Bạn đã bình luận cho sách này rồi');
        }
        const result = await this.prisma.$transaction(async (tx) => {
            const comment = await tx.comment.create({
                data: {
                    userId,
                    bookId,
                    content: createCommentDto.content,
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            username: true,
                            displayName: true,
                            avatar: true,
                        },
                    },
                },
            });
            await tx.book.update({
                where: { id: bookId },
                data: {
                    commentCount: {
                        increment: 1,
                    },
                },
            });
            await tx.user.update({
                where: { id: userId },
                data: {
                    totalComments: {
                        increment: 1,
                    },
                },
            });
            await tx.pointTransaction.create({
                data: {
                    userId,
                    delta: 5,
                    reason: client_1.PointReason.comment,
                    refType: 'comment_id',
                    refId: comment.id,
                    note: 'Bình luận sách',
                },
            });
            await tx.activity.create({
                data: {
                    userId,
                    eventType: client_1.EventType.comment,
                    bookId,
                    payload: {
                        commentId: comment.id,
                        content: createCommentDto.content.substring(0, 100),
                    },
                },
            });
            return comment;
        });
        return {
            id: result.id,
            content: result.content,
            user: result.user,
            createdAt: result.createdAt,
            updatedAt: result.updatedAt,
        };
    }
    async getComments(bookId, query) {
        const book = await this.prisma.book.findUnique({
            where: { id: bookId },
        });
        if (!book) {
            throw new common_1.NotFoundException('Sách không tồn tại');
        }
        const page = query.page || 1;
        const limit = query.limit || 10;
        const skip = (page - 1) * limit;
        const [comments, total] = await Promise.all([
            this.prisma.comment.findMany({
                where: {
                    bookId,
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            username: true,
                            displayName: true,
                            avatar: true,
                        },
                    },
                },
                orderBy: {
                    createdAt: 'desc',
                },
                skip,
                take: limit,
            }),
            this.prisma.comment.count({
                where: {
                    bookId,
                },
            }),
        ]);
        return {
            data: comments.map((comment) => ({
                id: comment.id,
                content: comment.content,
                user: comment.user,
                createdAt: comment.createdAt,
                updatedAt: comment.updatedAt,
            })),
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async updateComment(userId, commentId, updateCommentDto) {
        const comment = await this.prisma.comment.findUnique({
            where: { id: commentId },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        displayName: true,
                        avatar: true,
                    },
                },
            },
        });
        if (!comment) {
            throw new common_1.NotFoundException('Bình luận không tồn tại');
        }
        if (comment.userId !== userId) {
            throw new common_1.ForbiddenException('Bạn không có quyền sửa bình luận này');
        }
        const updated = await this.prisma.comment.update({
            where: { id: commentId },
            data: {
                content: updateCommentDto.content,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        displayName: true,
                        avatar: true,
                    },
                },
            },
        });
        return {
            id: updated.id,
            content: updated.content,
            user: updated.user,
            createdAt: updated.createdAt,
            updatedAt: updated.updatedAt,
        };
    }
    async deleteComment(userId, commentId) {
        const comment = await this.prisma.comment.findUnique({
            where: { id: commentId },
        });
        if (!comment) {
            throw new common_1.NotFoundException('Bình luận không tồn tại');
        }
        if (comment.userId !== userId) {
            throw new common_1.ForbiddenException('Bạn không có quyền xóa bình luận này');
        }
        await this.prisma.$transaction(async (tx) => {
            await tx.comment.delete({
                where: { id: commentId },
            });
            await tx.book.update({
                where: { id: comment.bookId },
                data: {
                    commentCount: {
                        decrement: 1,
                    },
                },
            });
            await tx.user.update({
                where: { id: userId },
                data: {
                    totalComments: {
                        decrement: 1,
                    },
                },
            });
        });
        return {
            message: 'Xóa bình luận thành công',
        };
    }
};
exports.CommentService = CommentService;
exports.CommentService = CommentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CommentService);
//# sourceMappingURL=comment.service.js.map