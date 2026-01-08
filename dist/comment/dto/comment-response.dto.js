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
exports.CommentResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class CommentUserDto {
    id;
    username;
    displayName;
    avatar;
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-here', description: 'User ID' }),
    __metadata("design:type", String)
], CommentUserDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'testuser', description: 'Username' }),
    __metadata("design:type", String)
], CommentUserDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Test User', description: 'Tên hiển thị' }),
    __metadata("design:type", String)
], CommentUserDto.prototype, "displayName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'https://cloudinary.com/avatar.jpg',
        description: 'URL avatar',
        nullable: true,
    }),
    __metadata("design:type", Object)
], CommentUserDto.prototype, "avatar", void 0);
class CommentResponseDto {
    id;
    content;
    user;
    createdAt;
    updatedAt;
}
exports.CommentResponseDto = CommentResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-here', description: 'Comment ID' }),
    __metadata("design:type", String)
], CommentResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Sách rất hay và bổ ích!',
        description: 'Nội dung bình luận',
    }),
    __metadata("design:type", String)
], CommentResponseDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: CommentUserDto,
        description: 'Thông tin người bình luận',
    }),
    __metadata("design:type", CommentUserDto)
], CommentResponseDto.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2024-01-01T00:00:00.000Z',
        description: 'Thời gian tạo',
    }),
    __metadata("design:type", Date)
], CommentResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2024-01-01T00:00:00.000Z',
        description: 'Thời gian cập nhật',
    }),
    __metadata("design:type", Date)
], CommentResponseDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=comment-response.dto.js.map