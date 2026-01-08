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
exports.BookService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const upload_image_service_1 = require("../upload-image/upload-image.service");
let BookService = class BookService {
    prisma;
    uploadImageService;
    constructor(prisma, uploadImageService) {
        this.prisma = prisma;
        this.uploadImageService = uploadImageService;
    }
    async create(createBookDto, coverImageFile) {
        let coverImageUrl = null;
        if (coverImageFile) {
            const uploadResult = await this.uploadImageService.uploadBookImage(coverImageFile);
            coverImageUrl = uploadResult.secureUrl;
        }
        else if (createBookDto.coverImageUrl) {
            coverImageUrl = createBookDto.coverImageUrl;
        }
        const book = await this.prisma.book.create({
            data: {
                title: createBookDto.title,
                author: createBookDto.author,
                categories: createBookDto.categories || [],
                coverImage: coverImageUrl,
                description: createBookDto.description || null,
                publisher: createBookDto.publisher || null,
                publicationYear: createBookDto.publicationYear || null,
                pages: createBookDto.pages || null,
                availableCopies: createBookDto.availableCopies || 0,
            },
        });
        return {
            ...book,
            status: book.availableCopies > 0 ? 'có sẵn' : 'không có sẵn',
        };
    }
    async findAll(query, userId) {
        const page = query.page || 1;
        const limit = query.limit || 10;
        const skip = (page - 1) * limit;
        const where = {};
        if (query.search) {
            where.OR = [
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
            ];
        }
        if (query.author) {
            where.author = {
                contains: query.author,
                mode: 'insensitive',
            };
        }
        if (query.category) {
            where.categories = {
                has: query.category,
            };
        }
        if (query.status === 'available') {
            where.availableCopies = {
                gt: 0,
            };
            if (userId) {
                where.NOT = {
                    borrows: {
                        some: {
                            userId,
                            status: 'active',
                        },
                    },
                };
            }
        }
        const sortBy = query.sortBy || 'createdAt';
        const sortOrder = query.sortOrder || 'desc';
        const orderBy = {};
        if (sortBy === 'title') {
            orderBy.title = sortOrder;
        }
        else if (sortBy === 'author') {
            orderBy.author = sortOrder;
        }
        else {
            orderBy.createdAt = sortOrder;
        }
        const [books, total] = await Promise.all([
            this.prisma.book.findMany({
                where,
                skip,
                take: limit,
                orderBy,
            }),
            this.prisma.book.count({ where }),
        ]);
        const totalPages = Math.ceil(total / limit);
        let booksWithStatus = books;
        if (userId) {
            const [activeBorrows, favorites] = await Promise.all([
                this.prisma.borrow.findMany({
                    where: {
                        userId,
                        bookId: { in: books.map((b) => b.id) },
                        status: 'active',
                    },
                    select: {
                        bookId: true,
                        dueAt: true,
                    },
                }),
                this.prisma.interaction.findMany({
                    where: {
                        userId,
                        bookId: { in: books.map((b) => b.id) },
                        type: 'like',
                    },
                    select: {
                        bookId: true,
                    },
                }),
            ]);
            const borrowMap = new Map(activeBorrows.map((b) => [b.bookId, b.dueAt]));
            const favoriteSet = new Set(favorites.map((f) => f.bookId));
            booksWithStatus = books.map((book) => ({
                ...book,
                status: book.availableCopies > 0 ? 'có sẵn' : 'không có sẵn',
                isBorrowed: borrowMap.has(book.id),
                borrowDue: borrowMap.get(book.id) || null,
                isFavorite: favoriteSet.has(book.id),
            }));
        }
        else {
            booksWithStatus = books.map((book) => ({
                ...book,
                status: book.availableCopies > 0 ? 'có sẵn' : 'không có sẵn',
                isBorrowed: false,
                borrowDue: null,
                isFavorite: false,
            }));
        }
        return {
            data: booksWithStatus,
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
    async findOne(id, userId) {
        const book = await this.prisma.book.findUnique({
            where: { id },
            include: {
                _count: {
                    select: {
                        borrows: true,
                        comments: true,
                        interactions: {
                            where: {
                                type: 'like',
                            },
                        },
                    },
                },
            },
        });
        if (!book) {
            throw new common_1.NotFoundException('Sách không tồn tại');
        }
        let isBorrowed = false;
        let borrowDue = null;
        let isFavorite = false;
        if (userId) {
            const activeBorrow = await this.prisma.borrow.findFirst({
                where: {
                    userId,
                    bookId: id,
                    status: 'active',
                },
                select: {
                    dueAt: true,
                },
            });
            if (activeBorrow) {
                isBorrowed = true;
                borrowDue = activeBorrow.dueAt;
            }
            const favorite = await this.prisma.interaction.findUnique({
                where: {
                    userId_bookId_type: {
                        userId,
                        bookId: id,
                        type: 'like',
                    },
                },
            });
            isFavorite = !!favorite;
        }
        return {
            ...book,
            status: book.availableCopies > 0 ? 'có sẵn' : 'không có sẵn',
            isBorrowed,
            borrowDue,
            isFavorite,
        };
    }
    async update(id, updateBookDto) {
        const existingBook = await this.prisma.book.findUnique({
            where: { id },
        });
        if (!existingBook) {
            throw new common_1.NotFoundException('Sách không tồn tại');
        }
        const book = await this.prisma.book.update({
            where: { id },
            data: {
                ...(updateBookDto.title && { title: updateBookDto.title }),
                ...(updateBookDto.author && { author: updateBookDto.author }),
                ...(updateBookDto.categories !== undefined && {
                    categories: updateBookDto.categories,
                }),
                ...(updateBookDto.coverImage !== undefined && {
                    coverImage: updateBookDto.coverImage,
                }),
                ...(updateBookDto.description !== undefined && {
                    description: updateBookDto.description,
                }),
                ...(updateBookDto.publisher !== undefined && {
                    publisher: updateBookDto.publisher,
                }),
                ...(updateBookDto.publicationYear !== undefined && {
                    publicationYear: updateBookDto.publicationYear,
                }),
                ...(updateBookDto.pages !== undefined && {
                    pages: updateBookDto.pages,
                }),
                ...(updateBookDto.availableCopies !== undefined && {
                    availableCopies: updateBookDto.availableCopies,
                }),
            },
        });
        return {
            ...book,
            status: book.availableCopies > 0 ? 'có sẵn' : 'không có sẵn',
        };
    }
    async remove(id) {
        const book = await this.prisma.book.findUnique({
            where: { id },
            include: {
                _count: {
                    select: {
                        borrows: {
                            where: {
                                status: 'active',
                            },
                        },
                    },
                },
            },
        });
        if (!book) {
            throw new common_1.NotFoundException('Sách không tồn tại');
        }
        if (book._count.borrows > 0) {
            throw new common_1.BadRequestException('Không thể xóa sách đang được mượn');
        }
        return this.prisma.book.delete({
            where: { id },
        });
    }
};
exports.BookService = BookService;
exports.BookService = BookService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        upload_image_service_1.UploadImageService])
], BookService);
//# sourceMappingURL=book.service.js.map