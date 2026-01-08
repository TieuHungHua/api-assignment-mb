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
exports.BorrowResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class BorrowUserDto {
    id;
    username;
    displayName;
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-here', description: 'User ID' }),
    __metadata("design:type", String)
], BorrowUserDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'testuser', description: 'Username' }),
    __metadata("design:type", String)
], BorrowUserDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Test User', description: 'Tên hiển thị' }),
    __metadata("design:type", String)
], BorrowUserDto.prototype, "displayName", void 0);
class BorrowBookDto {
    id;
    title;
    author;
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-here', description: 'Book ID' }),
    __metadata("design:type", String)
], BorrowBookDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Clean Code', description: 'Tên sách' }),
    __metadata("design:type", String)
], BorrowBookDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Robert C. Martin', description: 'Tác giả' }),
    __metadata("design:type", String)
], BorrowBookDto.prototype, "author", void 0);
class BorrowResponseDto {
    id;
    user;
    book;
    borrowedAt;
    dueAt;
    returnedAt;
    status;
}
exports.BorrowResponseDto = BorrowResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-here', description: 'Borrow ID' }),
    __metadata("design:type", String)
], BorrowResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: BorrowUserDto, description: 'Thông tin người mượn' }),
    __metadata("design:type", BorrowUserDto)
], BorrowResponseDto.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: BorrowBookDto, description: 'Thông tin sách' }),
    __metadata("design:type", BorrowBookDto)
], BorrowResponseDto.prototype, "book", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-01T00:00:00.000Z', description: 'Thời gian mượn' }),
    __metadata("design:type", Date)
], BorrowResponseDto.prototype, "borrowedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-15T00:00:00.000Z', description: 'Ngày hết hạn' }),
    __metadata("design:type", Date)
], BorrowResponseDto.prototype, "dueAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2024-01-10T00:00:00.000Z',
        description: 'Thời gian trả',
        nullable: true,
    }),
    __metadata("design:type", Object)
], BorrowResponseDto.prototype, "returnedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'active',
        description: 'Trạng thái (active, returned, overdue)',
        enum: ['active', 'returned', 'overdue'],
    }),
    __metadata("design:type", String)
], BorrowResponseDto.prototype, "status", void 0);
//# sourceMappingURL=borrow-response.dto.js.map