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
exports.BookingSearchCriteriaDto = exports.BookingSortDto = exports.BookingFilterDto = exports.SortDirection = exports.FilterOperator = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
var FilterOperator;
(function (FilterOperator) {
    FilterOperator["EQ"] = "EQ";
    FilterOperator["NE"] = "NE";
    FilterOperator["IN"] = "IN";
    FilterOperator["GTE"] = ">=";
    FilterOperator["LTE"] = "<=";
    FilterOperator["GT"] = ">";
    FilterOperator["LT"] = "<";
    FilterOperator["CONTAINS"] = "CONTAINS";
})(FilterOperator || (exports.FilterOperator = FilterOperator = {}));
var SortDirection;
(function (SortDirection) {
    SortDirection["ASC"] = "ASC";
    SortDirection["DESC"] = "DESC";
})(SortDirection || (exports.SortDirection = SortDirection = {}));
class BookingFilterDto {
    field;
    op;
    value;
}
exports.BookingFilterDto = BookingFilterDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'status', description: 'Field name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BookingFilterDto.prototype, "field", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'IN',
        description: 'Operator',
        enum: FilterOperator,
    }),
    (0, class_validator_1.IsEnum)(FilterOperator, { message: 'op must be a valid operator' }),
    __metadata("design:type", String)
], BookingFilterDto.prototype, "op", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: ['pending', 'approved'],
        description: 'Filter value',
    }),
    (0, class_validator_1.IsDefined)({ message: 'value is required' }),
    __metadata("design:type", Object)
], BookingFilterDto.prototype, "value", void 0);
class BookingSortDto {
    field;
    dir;
}
exports.BookingSortDto = BookingSortDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'start_at', description: 'Field name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BookingSortDto.prototype, "field", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'DESC',
        description: 'Sort direction',
        enum: SortDirection,
    }),
    (0, class_validator_1.IsEnum)(SortDirection, { message: 'dir must be ASC or DESC' }),
    __metadata("design:type", String)
], BookingSortDto.prototype, "dir", void 0);
class BookingSearchCriteriaDto {
    page = 1;
    pageSize = 20;
    filters;
    sorts;
}
exports.BookingSearchCriteriaDto = BookingSearchCriteriaDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'Page number (1-based)',
        required: false,
        default: 1,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)({ message: 'page must be an integer' }),
    (0, class_validator_1.Min)(1, { message: 'page must be at least 1' }),
    __metadata("design:type", Number)
], BookingSearchCriteriaDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 20,
        description: 'Items per page',
        required: false,
        default: 20,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)({ message: 'pageSize must be an integer' }),
    (0, class_validator_1.Min)(1, { message: 'pageSize must be at least 1' }),
    __metadata("design:type", Number)
], BookingSearchCriteriaDto.prototype, "pageSize", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [BookingFilterDto],
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => BookingFilterDto),
    __metadata("design:type", Array)
], BookingSearchCriteriaDto.prototype, "filters", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [BookingSortDto],
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => BookingSortDto),
    __metadata("design:type", Array)
], BookingSearchCriteriaDto.prototype, "sorts", void 0);
//# sourceMappingURL=booking-search.dto.js.map