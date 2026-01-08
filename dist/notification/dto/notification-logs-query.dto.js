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
exports.NotificationLogsQueryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const client_1 = require("@prisma/client");
class NotificationLogsQueryDto {
    page;
    limit;
    status;
    userId;
    borrowId;
    isRead;
}
exports.NotificationLogsQueryDto = NotificationLogsQueryDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'Số trang',
        required: false,
        default: 1,
    }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)({ message: 'Số trang phải là số nguyên' }),
    (0, class_validator_1.Min)(1, { message: 'Số trang phải lớn hơn 0' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], NotificationLogsQueryDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 10,
        description: 'Số lượng item mỗi trang',
        required: false,
        default: 10,
    }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)({ message: 'Limit phải là số nguyên' }),
    (0, class_validator_1.Min)(1, { message: 'Limit phải lớn hơn 0' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], NotificationLogsQueryDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: client_1.NotificationStatus,
        example: client_1.NotificationStatus.sent,
        description: 'Lọc theo trạng thái',
        required: false,
    }),
    (0, class_validator_1.IsEnum)(client_1.NotificationStatus, { message: 'Trạng thái không hợp lệ' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], NotificationLogsQueryDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'user-uuid-123',
        description: 'Lọc theo user ID',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], NotificationLogsQueryDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'borrow-uuid-456',
        description: 'Lọc theo borrow ID',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], NotificationLogsQueryDto.prototype, "borrowId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: false,
        description: 'Lọc theo trạng thái đã đọc (true: đã đọc, false: chưa đọc)',
        required: false,
    }),
    (0, class_transformer_1.Type)(() => Boolean),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], NotificationLogsQueryDto.prototype, "isRead", void 0);
//# sourceMappingURL=notification-logs-query.dto.js.map