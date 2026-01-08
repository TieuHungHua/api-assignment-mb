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
exports.UpdateBookDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UpdateBookDto {
    title;
    author;
    categories;
    coverImage;
    availableCopies;
    description;
    publisher;
    publicationYear;
    pages;
}
exports.UpdateBookDto = UpdateBookDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Clean Code',
        description: 'Tên sách',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateBookDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Robert C. Martin',
        description: 'Tác giả',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateBookDto.prototype, "author", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: ['Programming', 'Software Engineering'],
        description: 'Danh mục sách',
        type: [String],
        required: false,
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateBookDto.prototype, "categories", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'https://res.cloudinary.com/...',
        description: 'URL ảnh bìa từ Cloudinary',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsUrl)({}, { message: 'URL ảnh bìa không hợp lệ' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateBookDto.prototype, "coverImage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 5,
        description: 'Số lượng bản sao có sẵn',
        minimum: 0,
        required: false,
    }),
    (0, class_validator_1.IsInt)({ message: 'Số lượng bản sao phải là số nguyên' }),
    (0, class_validator_1.Min)(0, { message: 'Số lượng bản sao không được âm' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateBookDto.prototype, "availableCopies", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Một cuốn sách về lập trình sạch và best practices trong phát triển phần mềm.',
        description: 'Mô tả sách',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateBookDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Scribner',
        description: 'Nhà xuất bản',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateBookDto.prototype, "publisher", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 2014,
        description: 'Năm xuất bản',
        minimum: 1000,
        maximum: 9999,
        required: false,
    }),
    (0, class_validator_1.IsInt)({ message: 'Năm xuất bản phải là số nguyên' }),
    (0, class_validator_1.Min)(1000, { message: 'Năm xuất bản phải từ 1000 trở lên' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateBookDto.prototype, "publicationYear", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 531,
        description: 'Số trang',
        minimum: 1,
        required: false,
    }),
    (0, class_validator_1.IsInt)({ message: 'Số trang phải là số nguyên' }),
    (0, class_validator_1.Min)(1, { message: 'Số trang phải lớn hơn 0' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateBookDto.prototype, "pages", void 0);
//# sourceMappingURL=update-book.dto.js.map