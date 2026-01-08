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
exports.FavoriteController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const favorite_service_1 = require("./favorite.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const favorites_query_dto_1 = require("./dto/favorites-query.dto");
let FavoriteController = class FavoriteController {
    favoriteService;
    constructor(favoriteService) {
        this.favoriteService = favoriteService;
    }
    async getFavorites(query, currentUser) {
        return this.favoriteService.getFavorites(currentUser.id, query);
    }
    async toggleFavorite(bookId, currentUser) {
        return this.favoriteService.toggleFavorite(currentUser.id, bookId);
    }
    async checkFavorite(bookId, currentUser) {
        return this.favoriteService.checkFavorite(currentUser.id, bookId);
    }
};
exports.FavoriteController = FavoriteController;
__decorate([
    (0, common_1.Get)('favorites'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy danh sách sách yêu thích của user' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, example: 10 }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false, type: String, description: 'Tìm kiếm theo tên sách hoặc tác giả' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Thành công',
        schema: {
            type: 'object',
            properties: {
                data: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'string' },
                            userId: { type: 'string' },
                            bookId: { type: 'string' },
                            createdAt: { type: 'string' },
                            book: {
                                type: 'object',
                                properties: {
                                    id: { type: 'string' },
                                    title: { type: 'string' },
                                    author: { type: 'string' },
                                    coverImage: { type: 'string', nullable: true },
                                    availableCopies: { type: 'number' },
                                    likeCount: { type: 'number' },
                                },
                            },
                        },
                    },
                },
                pagination: {
                    type: 'object',
                    properties: {
                        page: { type: 'number' },
                        limit: { type: 'number' },
                        total: { type: 'number' },
                        totalPages: { type: 'number' },
                        hasNextPage: { type: 'boolean' },
                        hasPreviousPage: { type: 'boolean' },
                    },
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Chưa đăng nhập' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [favorites_query_dto_1.FavoritesQueryDto, Object]),
    __metadata("design:returntype", Promise)
], FavoriteController.prototype, "getFavorites", null);
__decorate([
    (0, common_1.Post)(':id/favorite'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Thêm/bỏ yêu thích sách' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID của sách' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Thành công',
        schema: {
            type: 'object',
            properties: {
                id: { type: 'string', example: 'interaction-uuid-here' },
                userId: { type: 'string', example: 'user-uuid-here' },
                bookId: { type: 'string', example: 'book-uuid-here' },
                createdAt: { type: 'string', example: '2024-01-15T10:30:00.000Z' },
                book: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        title: { type: 'string' },
                        author: { type: 'string' },
                        coverImage: { type: 'string', nullable: true },
                        availableCopies: { type: 'number' },
                        likeCount: { type: 'number' },
                    },
                },
                isFavorite: { type: 'boolean', example: true },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Chưa đăng nhập' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Sách không tồn tại' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FavoriteController.prototype, "toggleFavorite", null);
__decorate([
    (0, common_1.Get)(':id/favorite'),
    (0, swagger_1.ApiOperation)({ summary: 'Kiểm tra user đã yêu thích sách chưa' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID của sách' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Thành công',
        schema: {
            type: 'object',
            properties: {
                bookId: { type: 'string', example: 'book-uuid-here' },
                isFavorite: { type: 'boolean', example: true },
                favoriteId: { type: 'string', nullable: true, example: 'interaction-uuid-here' },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Chưa đăng nhập' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Sách không tồn tại' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FavoriteController.prototype, "checkFavorite", null);
exports.FavoriteController = FavoriteController = __decorate([
    (0, swagger_1.ApiTags)('Favorites'),
    (0, common_1.Controller)('books'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    __metadata("design:paramtypes", [favorite_service_1.FavoriteService])
], FavoriteController);
//# sourceMappingURL=favorite.controller.js.map