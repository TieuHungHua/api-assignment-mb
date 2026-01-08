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
exports.BookResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class BookResponseDto {
    id;
    title;
    author;
    categories;
    coverImage;
    description;
    publisher;
    publicationYear;
    pages;
    availableCopies;
    status;
    likeCount;
    commentCount;
    borrowCount;
    createdAt;
}
exports.BookResponseDto = BookResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-here', description: 'Book ID' }),
    __metadata("design:type", String)
], BookResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Clean Code', description: 'Tên sách' }),
    __metadata("design:type", String)
], BookResponseDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Robert C. Martin', description: 'Tác giả' }),
    __metadata("design:type", String)
], BookResponseDto.prototype, "author", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: ['Programming', 'Software Engineering'],
        description: 'Danh mục sách',
        type: [String],
    }),
    __metadata("design:type", Array)
], BookResponseDto.prototype, "categories", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'https://res.cloudinary.com/...',
        description: 'URL ảnh bìa',
        nullable: true,
    }),
    __metadata("design:type", Object)
], BookResponseDto.prototype, "coverImage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Một cuốn sách về lập trình sạch và best practices trong phát triển phần mềm.',
        description: 'Mô tả sách',
        nullable: true,
    }),
    __metadata("design:type", Object)
], BookResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Scribner',
        description: 'Nhà xuất bản',
        nullable: true,
    }),
    __metadata("design:type", Object)
], BookResponseDto.prototype, "publisher", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 2014,
        description: 'Năm xuất bản',
        nullable: true,
    }),
    __metadata("design:type", Object)
], BookResponseDto.prototype, "publicationYear", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 531,
        description: 'Số trang',
        nullable: true,
    }),
    __metadata("design:type", Object)
], BookResponseDto.prototype, "pages", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5, description: 'Số lượng bản sao có sẵn' }),
    __metadata("design:type", Number)
], BookResponseDto.prototype, "availableCopies", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'có sẵn',
        description: 'Trạng thái sách (có sẵn nếu availableCopies > 0, không có sẵn nếu = 0)',
        enum: ['có sẵn', 'không có sẵn'],
    }),
    __metadata("design:type", String)
], BookResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10, description: 'Số lượt thích' }),
    __metadata("design:type", Number)
], BookResponseDto.prototype, "likeCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5, description: 'Số bình luận' }),
    __metadata("design:type", Number)
], BookResponseDto.prototype, "commentCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 20, description: 'Số lượt mượn' }),
    __metadata("design:type", Number)
], BookResponseDto.prototype, "borrowCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2024-01-01T00:00:00.000Z',
        description: 'Thời gian tạo',
    }),
    __metadata("design:type", Date)
], BookResponseDto.prototype, "createdAt", void 0);
//# sourceMappingURL=book-response.dto.js.map