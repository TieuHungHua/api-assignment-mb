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
exports.CommentController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const comment_service_1 = require("./comment.service");
const create_comment_dto_1 = require("./dto/create-comment.dto");
const update_comment_dto_1 = require("./dto/update-comment.dto");
const comments_query_dto_1 = require("./dto/comments-query.dto");
const comment_response_dto_1 = require("./dto/comment-response.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
let CommentController = class CommentController {
    commentService;
    constructor(commentService) {
        this.commentService = commentService;
    }
    async createComment(bookId, createCommentDto, user) {
        return this.commentService.createComment(user.id, bookId, createCommentDto);
    }
    async getComments(bookId, query) {
        return this.commentService.getComments(bookId, query);
    }
    async updateComment(bookId, commentId, updateCommentDto, user) {
        return this.commentService.updateComment(user.id, commentId, updateCommentDto);
    }
    async deleteComment(bookId, commentId, user) {
        return this.commentService.deleteComment(user.id, commentId);
    }
};
exports.CommentController = CommentController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Thêm bình luận cho sách' }),
    (0, swagger_1.ApiParam)({ name: 'bookId', description: 'ID của sách' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Thêm bình luận thành công',
        type: comment_response_dto_1.CommentResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Dữ liệu không hợp lệ hoặc đã bình luận rồi',
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Chưa đăng nhập' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Sách không tồn tại' }),
    __param(0, (0, common_1.Param)('bookId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_comment_dto_1.CreateCommentDto, Object]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "createComment", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy danh sách bình luận của sách' }),
    (0, swagger_1.ApiParam)({ name: 'bookId', description: 'ID của sách' }),
    (0, swagger_1.ApiQuery)({
        name: 'page',
        required: false,
        type: Number,
        description: 'Số trang',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        required: false,
        type: Number,
        description: 'Số lượng mỗi trang',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lấy danh sách bình luận thành công',
        schema: {
            type: 'object',
            properties: {
                data: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/CommentResponseDto' },
                },
                pagination: {
                    type: 'object',
                    properties: {
                        page: { type: 'number' },
                        limit: { type: 'number' },
                        total: { type: 'number' },
                        totalPages: { type: 'number' },
                    },
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Sách không tồn tại' }),
    __param(0, (0, common_1.Param)('bookId')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, comments_query_dto_1.CommentsQueryDto]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "getComments", null);
__decorate([
    (0, common_1.Put)(':commentId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Cập nhật bình luận' }),
    (0, swagger_1.ApiParam)({ name: 'bookId', description: 'ID của sách' }),
    (0, swagger_1.ApiParam)({ name: 'commentId', description: 'ID của bình luận' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Cập nhật bình luận thành công',
        type: comment_response_dto_1.CommentResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Dữ liệu không hợp lệ' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Chưa đăng nhập' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Không có quyền sửa bình luận này' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Bình luận không tồn tại' }),
    __param(0, (0, common_1.Param)('bookId')),
    __param(1, (0, common_1.Param)('commentId')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_comment_dto_1.UpdateCommentDto, Object]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "updateComment", null);
__decorate([
    (0, common_1.Delete)(':commentId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Xóa bình luận' }),
    (0, swagger_1.ApiParam)({ name: 'bookId', description: 'ID của sách' }),
    (0, swagger_1.ApiParam)({ name: 'commentId', description: 'ID của bình luận' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Xóa bình luận thành công',
        schema: {
            type: 'object',
            properties: {
                message: { type: 'string', example: 'Xóa bình luận thành công' },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Chưa đăng nhập' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Không có quyền xóa bình luận này' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Bình luận không tồn tại' }),
    __param(0, (0, common_1.Param)('bookId')),
    __param(1, (0, common_1.Param)('commentId')),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "deleteComment", null);
exports.CommentController = CommentController = __decorate([
    (0, swagger_1.ApiTags)('comments'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Controller)('books/:bookId/comments'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [comment_service_1.CommentService])
], CommentController);
//# sourceMappingURL=comment.controller.js.map