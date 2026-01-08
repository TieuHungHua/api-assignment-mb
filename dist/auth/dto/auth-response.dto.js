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
exports.AuthResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class UserDto {
    id;
    username;
    displayName;
    avatar;
    role;
    email;
    studentId;
    classMajor;
    dateOfBirth;
    gender;
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-here', description: 'User ID' }),
    __metadata("design:type", String)
], UserDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'testuser', description: 'Tên đăng nhập' }),
    __metadata("design:type", String)
], UserDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Test User', description: 'Tên hiển thị' }),
    __metadata("design:type", String)
], UserDto.prototype, "displayName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'https://cloudinary.com/avatar.jpg',
        description: 'URL avatar',
        nullable: true,
    }),
    __metadata("design:type", Object)
], UserDto.prototype, "avatar", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'student',
        description: 'Vai trò (student, lecturer, admin)',
    }),
    __metadata("design:type", String)
], UserDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'user@example.com',
        description: 'Email',
        nullable: true,
    }),
    __metadata("design:type", Object)
], UserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'SV001',
        description: 'Mã sinh viên',
        nullable: true,
    }),
    __metadata("design:type", Object)
], UserDto.prototype, "studentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'CNTT',
        description: 'Lớp chuyên ngành',
        nullable: true,
    }),
    __metadata("design:type", Object)
], UserDto.prototype, "classMajor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2000-01-15T00:00:00.000Z',
        description: 'Ngày tháng năm sinh',
        nullable: true,
    }),
    __metadata("design:type", Object)
], UserDto.prototype, "dateOfBirth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'male',
        description: 'Giới tính (male, female, other)',
        nullable: true,
    }),
    __metadata("design:type", Object)
], UserDto.prototype, "gender", void 0);
class AuthResponseDto {
    access_token;
    refresh_token;
    user;
}
exports.AuthResponseDto = AuthResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        description: 'JWT Access Token',
    }),
    __metadata("design:type", String)
], AuthResponseDto.prototype, "access_token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        description: 'JWT Refresh Token',
    }),
    __metadata("design:type", String)
], AuthResponseDto.prototype, "refresh_token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: UserDto, description: 'Thông tin user' }),
    __metadata("design:type", UserDto)
], AuthResponseDto.prototype, "user", void 0);
//# sourceMappingURL=auth-response.dto.js.map