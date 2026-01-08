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
exports.UpdateNotificationLogDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const client_1 = require("@prisma/client");
class UpdateNotificationLogDto {
    title;
    body;
    status;
    errorMessage;
    isRead;
}
exports.UpdateNotificationLogDto = UpdateNotificationLogDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '📚 Nhắc nhở trả sách',
        description: 'Tiêu đề thông báo',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateNotificationLogDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Sách "Clean Code" của bạn sẽ hết hạn sau 3 ngày nữa.',
        description: 'Nội dung thông báo',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateNotificationLogDto.prototype, "body", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: client_1.NotificationStatus,
        example: client_1.NotificationStatus.sent,
        description: 'Trạng thái thông báo',
        required: false,
    }),
    (0, class_validator_1.IsEnum)(client_1.NotificationStatus, { message: 'Trạng thái không hợp lệ' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateNotificationLogDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Error message if failed',
        description: 'Thông báo lỗi (nếu có)',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateNotificationLogDto.prototype, "errorMessage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        description: 'Đánh dấu đã đọc',
        required: false,
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateNotificationLogDto.prototype, "isRead", void 0);
//# sourceMappingURL=update-notification-log.dto.js.map