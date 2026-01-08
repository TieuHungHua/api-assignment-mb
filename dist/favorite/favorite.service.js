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
exports.FavoriteService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let FavoriteService = class FavoriteService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async toggleFavorite(userId, bookId) {
        const book = await this.prisma.book.findUnique({
            where: { id: bookId },
        });
        if (!book) {
            throw new common_1.NotFoundException('Sách không tồn tại');
        }
        const existingFavorite = await this.prisma.interaction.findUnique({
            where: {
                userId_bookId_type: {
                    userId,
                    bookId,
                    type: client_1.InteractionType.like,
                },
            },
        });
        if (existingFavorite) {
            return this.removeFavorite(userId, bookId, existingFavorite.id);
        }
        else {
            return this.addFavorite(userId, bookId);
        }
    }
    async addFavorite(userId, bookId) {
        const result = await this.prisma.$transaction(async (tx) => {
            const interaction = await tx.interaction.create({
                data: {
                    userId,
                    bookId,
                    type: client_1.InteractionType.like,
                },
                include: {
                    book: {
                        select: {
                            id: true,
                            title: true,
                            author: true,
                            coverImage: true,
                            availableCopies: true,
                            likeCount: true,
                        },
                    },
                },
            });
            await tx.book.update({
                where: { id: bookId },
                data: {
                    likeCount: {
                        increment: 1,
                    },
                },
            });
            await tx.user.update({
                where: { id: userId },
                data: {
                    totalLikes: {
                        increment: 1,
                    },
                },
            });
            await tx.pointTransaction.create({
                data: {
                    userId,
                    delta: 2,
                    reason: client_1.PointReason.like,
                    refType: 'interaction_id',
                    refId: interaction.id,
                    note: 'Yêu thích sách',
                },
            });
            await tx.activity.create({
                data: {
                    userId,
                    eventType: client_1.EventType.like,
                    bookId,
                    payload: {
                        interactionId: interaction.id,
                    },
                },
            });
            return interaction;
        });
        return {
            id: result.id,
            userId: result.userId,
            bookId: result.bookId,
            createdAt: result.createdAt,
            book: result.book,
            isFavorite: true,
        };
    }
    async removeFavorite(userId, bookId, interactionId) {
        const result = await this.prisma.$transaction(async (tx) => {
            await tx.interaction.delete({
                where: { id: interactionId },
            });
            await tx.book.update({
                where: { id: bookId },
                data: {
                    likeCount: {
                        decrement: 1,
                    },
                },
            });
            await tx.user.update({
                where: { id: userId },
                data: {
                    totalLikes: {
                        decrement: 1,
                    },
                },
            });
            const book = await tx.book.findUnique({
                where: { id: bookId },
                select: {
                    id: true,
                    title: true,
                    author: true,
                    coverImage: true,
                    availableCopies: true,
                    likeCount: true,
                },
            });
            return book;
        });
        return {
            bookId,
            book: result,
            isFavorite: false,
        };
    }
    async getFavorites(userId, query) {
        const page = query.page || 1;
        const limit = query.limit || 10;
        const skip = (page - 1) * limit;
        const whereInteraction = {
            userId,
            type: client_1.InteractionType.like,
        };
        if (query.search) {
            whereInteraction.book = {
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
        const [favorites, total] = await Promise.all([
            this.prisma.interaction.findMany({
                where: whereInteraction,
                include: {
                    book: {
                        select: {
                            id: true,
                            title: true,
                            author: true,
                            coverImage: true,
                            description: true,
                            availableCopies: true,
                            likeCount: true,
                            commentCount: true,
                            borrowCount: true,
                            categories: true,
                        },
                    },
                },
                orderBy: {
                    createdAt: 'desc',
                },
                skip,
                take: limit,
            }),
            this.prisma.interaction.count({
                where: whereInteraction,
            }),
        ]);
        const totalPages = Math.ceil(total / limit);
        const bookIds = favorites.map((fav) => fav.bookId);
        const activeBorrows = await this.prisma.borrow.findMany({
            where: {
                userId,
                bookId: { in: bookIds },
                status: 'active',
            },
            select: {
                bookId: true,
                dueAt: true,
            },
        });
        const borrowMap = new Map(activeBorrows.map((b) => [b.bookId, b.dueAt]));
        return {
            data: favorites.map((fav) => ({
                id: fav.id,
                userId: fav.userId,
                bookId: fav.bookId,
                favoritedAt: fav.createdAt,
                book: {
                    ...fav.book,
                    status: fav.book.availableCopies > 0 ? 'có sẵn' : 'không có sẵn',
                    isBorrowed: borrowMap.has(fav.bookId),
                    borrowDue: borrowMap.get(fav.bookId) || null,
                    isFavorite: true,
                },
            })),
            pagination: {
                page,
                limit,
                total,
                totalPages,
                hasNextPage: page < totalPages,
                hasPreviousPage: page > 1,
            },
        };
    }
    async checkFavorite(userId, bookId) {
        const book = await this.prisma.book.findUnique({
            where: { id: bookId },
        });
        if (!book) {
            throw new common_1.NotFoundException('Sách không tồn tại');
        }
        const favorite = await this.prisma.interaction.findUnique({
            where: {
                userId_bookId_type: {
                    userId,
                    bookId,
                    type: client_1.InteractionType.like,
                },
            },
        });
        return {
            bookId,
            isFavorite: !!favorite,
            favoriteId: favorite?.id || null,
        };
    }
};
exports.FavoriteService = FavoriteService;
exports.FavoriteService = FavoriteService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FavoriteService);
//# sourceMappingURL=favorite.service.js.map