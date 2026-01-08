"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsStrongPasswordConstraint = void 0;
exports.IsStrongPassword = IsStrongPassword;
const class_validator_1 = require("class-validator");
let IsStrongPasswordConstraint = class IsStrongPasswordConstraint {
    validate(password) {
        if (!password || typeof password !== 'string') {
            return false;
        }
        const hasUpperCase = /[A-Z]/.test(password);
        const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
        const digitCount = (password.match(/\d/g) || []).length;
        const hasAtLeastTwoDigits = digitCount >= 2;
        return hasUpperCase && hasSpecialChar && hasAtLeastTwoDigits;
    }
    defaultMessage() {
        return 'Mật khẩu phải chứa ít nhất 1 chữ in hoa, 1 ký tự đặc biệt và ít nhất 2 số';
    }
};
exports.IsStrongPasswordConstraint = IsStrongPasswordConstraint;
exports.IsStrongPasswordConstraint = IsStrongPasswordConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'isStrongPassword', async: false })
], IsStrongPasswordConstraint);
function IsStrongPassword(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsStrongPasswordConstraint,
        });
    };
}
//# sourceMappingURL=password.validator.js.map