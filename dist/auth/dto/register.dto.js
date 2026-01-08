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
exports.RegisterDto = exports.RegisterRole = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const password_validator_1 = require("../validators/password.validator");
var RegisterRole;
(function (RegisterRole) {
    RegisterRole["student"] = "student";
    RegisterRole["lecturer"] = "lecturer";
    RegisterRole["admin"] = "admin";
})(RegisterRole || (exports.RegisterRole = RegisterRole = {}));
class RegisterDto {
    username;
    email;
    phone;
    role;
    studentId;
    password;
    confirmPassword;
}
exports.RegisterDto = RegisterDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'newuser', description: 'Tên đăng nhập' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Tên đăng nhập không được để trống' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'user@example.com', description: 'Email' }),
    (0, class_validator_1.IsEmail)({}, { message: 'Email không hợp lệ' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Email không được để trống' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '0123456789',
        description: 'Số điện thoại (10-11 chữ số)',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Số điện thoại không được để trống' }),
    (0, class_validator_1.Matches)(/^[0-9]{10,11}$/, {
        message: 'Số điện thoại phải có 10-11 chữ số',
    }),
    __metadata("design:type", String)
], RegisterDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: RegisterRole,
        example: RegisterRole.student,
        description: 'Loại tài khoản',
    }),
    (0, class_validator_1.IsEnum)(RegisterRole, { message: 'Loại tài khoản không hợp lệ' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Loại tài khoản không được để trống' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'SV001',
        description: 'Mã sinh viên (bắt buộc nếu role là student)',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "studentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Password123!@#',
        description: 'Mật khẩu (ít nhất 1 chữ in hoa, 1 ký tự đặc biệt, 2 số, tối thiểu 6 ký tự)',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Mật khẩu không được để trống' }),
    (0, class_validator_1.MinLength)(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' }),
    (0, password_validator_1.IsStrongPassword)({
        message: 'Mật khẩu phải chứa ít nhất 1 chữ in hoa, 1 ký tự đặc biệt và ít nhất 2 số',
    }),
    __metadata("design:type", String)
], RegisterDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Password123!@#',
        description: 'Xác nhận mật khẩu (phải khớp với password)',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Xác nhận mật khẩu không được để trống' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "confirmPassword", void 0);
//# sourceMappingURL=register.dto.js.map