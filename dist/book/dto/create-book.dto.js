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
exports.CreateBookDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class CreateBookDto {
    title;
    author;
    categories;
    coverImageUrl;
    availableCopies;
    description;
    publisher;
    publicationYear;
    pages;
}
exports.CreateBookDto = CreateBookDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Clean Code', description: 'Tên sách' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Tên sách không được để trống' }),
    __metadata("design:type", String)
], CreateBookDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Robert C. Martin', description: 'Tác giả' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Tác giả không được để trống' }),
    __metadata("design:type", String)
], CreateBookDto.prototype, "author", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: ['Programming', 'Software Engineering'],
        description: 'Danh mục sách (có thể gửi dạng array hoặc string comma-separated)',
        type: [String],
        required: false,
    }),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (!value)
            return [];
        if (Array.isArray(value)) {
            return value.filter((item) => typeof item === 'string');
        }
        if (typeof value === 'string') {
            return value
                .split(',')
                .map((item) => item.trim())
                .filter(Boolean);
        }
        return [];
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateBookDto.prototype, "categories", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'https://res.cloudinary.com/...',
        description: 'URL ảnh bìa từ Cloudinary (nếu không upload file)',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsUrl)({}, { message: 'URL ảnh bìa không hợp lệ' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateBookDto.prototype, "coverImageUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 5,
        description: 'Số lượng bản sao có sẵn',
        minimum: 0,
        default: 0,
    }),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === undefined || value === null || value === '')
            return undefined;
        const num = typeof value === 'string' ? parseInt(value, 10) : Number(value);
        return isNaN(num) ? undefined : num;
    }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)({ message: 'Số lượng bản sao phải là số nguyên' }),
    (0, class_validator_1.Min)(0, { message: 'Số lượng bản sao không được âm' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateBookDto.prototype, "availableCopies", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Một cuốn sách về lập trình sạch và best practices trong phát triển phần mềm.',
        description: 'Mô tả sách',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateBookDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Scribner',
        description: 'Nhà xuất bản',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateBookDto.prototype, "publisher", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 2014,
        description: 'Năm xuất bản',
        minimum: 1000,
        maximum: 9999,
        required: false,
    }),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === undefined || value === null || value === '')
            return undefined;
        const num = typeof value === 'string' ? parseInt(value, 10) : Number(value);
        return isNaN(num) ? undefined : num;
    }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)({ message: 'Năm xuất bản phải là số nguyên' }),
    (0, class_validator_1.Min)(1000, { message: 'Năm xuất bản phải từ 1000 trở lên' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateBookDto.prototype, "publicationYear", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 531,
        description: 'Số trang',
        minimum: 1,
        required: false,
    }),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === undefined || value === null || value === '')
            return undefined;
        const num = typeof value === 'string' ? parseInt(value, 10) : Number(value);
        return isNaN(num) ? undefined : num;
    }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)({ message: 'Số trang phải là số nguyên' }),
    (0, class_validator_1.Min)(1, { message: 'Số trang phải lớn hơn 0' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateBookDto.prototype, "pages", void 0);
//# sourceMappingURL=create-book.dto.js.map