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
exports.RenewBorrowDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class RenewBorrowDto {
    days;
}
exports.RenewBorrowDto = RenewBorrowDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 7,
        description: 'Số ngày gia hạn thêm (tối đa 30 ngày tính từ ngày hết hạn hiện tại)',
        minimum: 1,
        maximum: 30,
    }),
    (0, class_validator_1.IsInt)({ message: 'Số ngày gia hạn phải là số nguyên' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Số ngày gia hạn không được để trống' }),
    (0, class_validator_1.Min)(1, { message: 'Số ngày gia hạn phải lớn hơn 0' }),
    (0, class_validator_1.Max)(30, { message: 'Số ngày gia hạn không được vượt quá 30 ngày' }),
    __metadata("design:type", Number)
], RenewBorrowDto.prototype, "days", void 0);
//# sourceMappingURL=renew-borrow.dto.js.map