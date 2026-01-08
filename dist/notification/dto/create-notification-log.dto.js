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
exports.CreateNotificationLogDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const client_1 = require("@prisma/client");
class CreateNotificationLogDto {
    userId;
    borrowId;
    title;
    body;
    status;
}
exports.CreateNotificationLogDto = CreateNotificationLogDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'user-uuid-123',
        description: 'ID của user nhận thông báo',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'User ID không được để trống' }),
    __metadata("design:type", String)
], CreateNotificationLogDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'borrow-uuid-456',
        description: 'ID của khoản mượn (nếu có)',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateNotificationLogDto.prototype, "borrowId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '📚 Nhắc nhở trả sách',
        description: 'Tiêu đề thông báo',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Tiêu đề không được để trống' }),
    __metadata("design:type", String)
], CreateNotificationLogDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Sách "Clean Code" của bạn sẽ hết hạn sau 3 ngày nữa.',
        description: 'Nội dung thông báo',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Nội dung không được để trống' }),
    __metadata("design:type", String)
], CreateNotificationLogDto.prototype, "body", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: client_1.NotificationStatus,
        example: client_1.NotificationStatus.pending,
        description: 'Trạng thái thông báo',
        default: client_1.NotificationStatus.pending,
        required: false,
    }),
    (0, class_validator_1.IsEnum)(client_1.NotificationStatus, { message: 'Trạng thái không hợp lệ' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateNotificationLogDto.prototype, "status", void 0);
//# sourceMappingURL=create-notification-log.dto.js.map