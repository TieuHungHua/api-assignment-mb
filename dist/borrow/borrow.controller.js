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
exports.BorrowController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const borrow_service_1 = require("./borrow.service");
const create_borrow_dto_1 = require("./dto/create-borrow.dto");
const borrows_query_dto_1 = require("./dto/borrows-query.dto");
const borrow_response_dto_1 = require("./dto/borrow-response.dto");
const renew_borrow_dto_1 = require("./dto/renew-borrow.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
let BorrowController = class BorrowController {
    borrowService;
    constructor(borrowService) {
        this.borrowService = borrowService;
    }
    async create(createBorrowDto, user) {
        return this.borrowService.create(user.id, createBorrowDto);
    }
    async findAll(query, user) {
        return this.borrowService.findAll(query, user.id);
    }
    async findOne(id, user) {
        return this.borrowService.findOne(id, user.id);
    }
    async returnBook(id, user) {
        return this.borrowService.returnBook(id, user.id);
    }
    async renew(id, renewDto, user) {
        return this.borrowService.renew(id, user.id, renewDto);
    }
    async remove(id, user) {
        return this.borrowService.remove(id, user.id);
    }
};
exports.BorrowController = BorrowController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Mượn sách' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Mượn sách thành công',
        type: borrow_response_dto_1.BorrowResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Dữ liệu không hợp lệ hoặc sách không còn' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Chưa đăng nhập' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Sách không tồn tại' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_borrow_dto_1.CreateBorrowDto, Object]),
    __metadata("design:returntype", Promise)
], BorrowController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy danh sách lịch sử mượn' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false, enum: ['active', 'returned', 'overdue'] }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false, type: String, description: 'Tìm kiếm theo tên sách hoặc tác giả' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lấy danh sách thành công',
        schema: {
            type: 'object',
            properties: {
                data: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/BorrowResponseDto' },
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
    __param(0, (0, common_1.Query)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [borrows_query_dto_1.BorrowsQueryDto, Object]),
    __metadata("design:returntype", Promise)
], BorrowController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy thông tin lịch sử mượn theo ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID của lịch sử mượn' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lấy thông tin thành công',
        type: borrow_response_dto_1.BorrowResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Không có quyền xem' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Lịch sử mượn không tồn tại' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BorrowController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(':id/return'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Trả sách' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID của lịch sử mượn' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Trả sách thành công',
        type: borrow_response_dto_1.BorrowResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Sách đã được trả rồi' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Không có quyền trả sách này' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Lịch sử mượn không tồn tại' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BorrowController.prototype, "returnBook", null);
__decorate([
    (0, common_1.Post)(':id/renew'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Gia hạn thời gian mượn sách' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID của lịch sử mượn' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Gia hạn thành công',
        type: borrow_response_dto_1.BorrowResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Không thể gia hạn (đã trả, đã gia hạn tối đa, hoặc tổng thời gian vượt quá 30 ngày)' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Không có quyền gia hạn sách này' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Lịch sử mượn không tồn tại' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, renew_borrow_dto_1.RenewBorrowDto, Object]),
    __metadata("design:returntype", Promise)
], BorrowController.prototype, "renew", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Xóa lịch sử mượn (chỉ khi đã trả)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID của lịch sử mượn' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Xóa thành công',
        type: borrow_response_dto_1.BorrowResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Chỉ có thể xóa lịch sử đã trả' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Không có quyền xóa' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Lịch sử mượn không tồn tại' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BorrowController.prototype, "remove", null);
exports.BorrowController = BorrowController = __decorate([
    (0, swagger_1.ApiTags)('borrows'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Controller)('borrows'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [borrow_service_1.BorrowService])
], BorrowController);
//# sourceMappingURL=borrow.controller.js.map