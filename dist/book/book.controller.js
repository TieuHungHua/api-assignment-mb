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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const book_service_1 = require("./book.service");
const create_book_dto_1 = require("./dto/create-book.dto");
const update_book_dto_1 = require("./dto/update-book.dto");
const books_query_dto_1 = require("./dto/books-query.dto");
const book_response_dto_1 = require("./dto/book-response.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const optional_jwt_auth_guard_1 = require("../auth/optional-jwt-auth.guard");
const common_2 = require("@nestjs/common");
const favorite_service_1 = require("../favorite/favorite.service");
const favorites_query_dto_1 = require("../favorite/dto/favorites-query.dto");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
let BookController = class BookController {
    bookService;
    favoriteService;
    constructor(bookService, favoriteService) {
        this.bookService = bookService;
        this.favoriteService = favoriteService;
    }
    async create(createBookDto, coverImageFile) {
        return this.bookService.create(createBookDto, coverImageFile);
    }
    async getFavorites(query, currentUser) {
        return this.favoriteService.getFavorites(currentUser.id, query);
    }
    async findAll(query, req) {
        return this.bookService.findAll(query, req.user?.id);
    }
    async findOne(id, req) {
        return this.bookService.findOne(id, req.user?.id);
    }
    async update(id, updateBookDto) {
        return this.bookService.update(id, updateBookDto);
    }
    async remove(id) {
        return this.bookService.remove(id);
    }
};
exports.BookController = BookController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Tạo sách mới (có thể kèm file ảnh bìa)' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                title: {
                    type: 'string',
                    description: 'Tên sách',
                    example: 'Clean Code',
                },
                author: {
                    type: 'string',
                    description: 'Tác giả',
                    example: 'Robert C. Martin',
                },
                categories: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Danh mục sách',
                    example: ['Programming', 'Software Engineering'],
                },
                coverImage: {
                    type: 'string',
                    format: 'binary',
                    description: 'File ảnh bìa sách (jpg, jpeg, png, gif, webp, max 10MB). Nếu không có file, có thể gửi URL ảnh trong coverImageUrl',
                },
                coverImageUrl: {
                    type: 'string',
                    description: 'URL ảnh bìa từ Cloudinary (nếu không upload file)',
                    example: 'https://res.cloudinary.com/...',
                },
                availableCopies: {
                    type: 'number',
                    description: 'Số lượng bản sao có sẵn',
                    example: 5,
                },
            },
            required: ['title', 'author'],
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Tạo sách thành công',
        type: book_response_dto_1.BookResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Dữ liệu không hợp lệ' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Chưa đăng nhập' }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('coverImage', {
        storage: (0, multer_1.memoryStorage)(),
        limits: {
            fileSize: 10 * 1024 * 1024,
        },
        fileFilter: (req, file, cb) => {
            if (!file) {
                return cb(null, true);
            }
            if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
                return cb(new Error('Chỉ chấp nhận file ảnh (jpg, jpeg, png, gif, webp)'), false);
            }
            cb(null, true);
        },
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_book_dto_1.CreateBookDto, Object]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('favorites'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy danh sách sách yêu thích của user' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, example: 10 }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false, type: String, description: 'Tìm kiếm theo tên sách hoặc tác giả' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Thành công',
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Chưa đăng nhập' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [favorites_query_dto_1.FavoritesQueryDto, Object]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "getFavorites", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(optional_jwt_auth_guard_1.OptionalJwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy danh sách sách với phân trang và tìm kiếm' }),
    (0, swagger_1.ApiQuery)({
        name: 'page',
        required: false,
        type: Number,
        description: 'Số trang (mặc định: 1)',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        required: false,
        type: Number,
        description: 'Số lượng sách mỗi trang (mặc định: 10, tối đa: 100)',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'search',
        required: false,
        type: String,
        description: 'Tìm kiếm theo tên sách hoặc tác giả',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'author',
        required: false,
        type: String,
        description: 'Lọc theo tác giả',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'category',
        required: false,
        type: String,
        description: 'Lọc theo danh mục',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'sortBy',
        required: false,
        type: String,
        enum: ['createdAt', 'title', 'author'],
        description: 'Trường để sắp xếp (mặc định: createdAt)',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'sortOrder',
        required: false,
        type: String,
        enum: ['asc', 'desc'],
        description: 'Thứ tự sắp xếp (mặc định: desc)',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lấy danh sách sách thành công',
        schema: {
            type: 'object',
            properties: {
                data: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/BookResponseDto' },
                },
                pagination: {
                    type: 'object',
                    properties: {
                        page: { type: 'number', example: 1 },
                        limit: { type: 'number', example: 10 },
                        total: { type: 'number', example: 100 },
                        totalPages: { type: 'number', example: 10 },
                        hasNextPage: { type: 'boolean', example: true },
                        hasPreviousPage: { type: 'boolean', example: false },
                    },
                },
            },
        },
    }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_2.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [books_query_dto_1.BooksQueryDto, Object]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(optional_jwt_auth_guard_1.OptionalJwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy thông tin sách theo ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID của sách' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lấy thông tin sách thành công',
        type: book_response_dto_1.BookResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Sách không tồn tại' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_2.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Cập nhật thông tin sách' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID của sách' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Cập nhật sách thành công',
        type: book_response_dto_1.BookResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Dữ liệu không hợp lệ' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Chưa đăng nhập' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Sách không tồn tại' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_book_dto_1.UpdateBookDto]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Xóa sách' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID của sách' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Xóa sách thành công',
        type: book_response_dto_1.BookResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Không thể xóa sách đang được mượn',
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Chưa đăng nhập' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Sách không tồn tại' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "remove", null);
exports.BookController = BookController = __decorate([
    (0, swagger_1.ApiTags)('books'),
    (0, common_1.Controller)('books'),
    __metadata("design:paramtypes", [book_service_1.BookService,
        favorite_service_1.FavoriteService])
], BookController);
//# sourceMappingURL=book.controller.js.map