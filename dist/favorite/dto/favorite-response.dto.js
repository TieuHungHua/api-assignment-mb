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
exports.FavoriteResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class FavoriteResponseDto {
    id;
    userId;
    bookId;
    createdAt;
    book;
}
exports.FavoriteResponseDto = FavoriteResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'interaction-uuid-here', description: 'ID của interaction' }),
    __metadata("design:type", String)
], FavoriteResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'user-uuid-here', description: 'ID của user' }),
    __metadata("design:type", String)
], FavoriteResponseDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'book-uuid-here', description: 'ID của sách' }),
    __metadata("design:type", String)
], FavoriteResponseDto.prototype, "bookId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-15T10:30:00.000Z', description: 'Thời gian yêu thích' }),
    __metadata("design:type", Date)
], FavoriteResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Thông tin sách' }),
    __metadata("design:type", Object)
], FavoriteResponseDto.prototype, "book", void 0);
//# sourceMappingURL=favorite-response.dto.js.map