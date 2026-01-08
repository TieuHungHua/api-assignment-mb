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
exports.RoomsAvailabilityQueryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class RoomsAvailabilityQueryDto {
    start_at;
    end_at;
    page = 1;
    pageSize = 20;
    sortBy;
    sortDir;
}
exports.RoomsAvailabilityQueryDto = RoomsAvailabilityQueryDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2024-01-01T08:00:00+07:00',
        description: 'Slot start time (ISO 8601)',
    }),
    (0, class_validator_1.IsDateString)({}, { message: 'start_at must be a valid ISO date' }),
    __metadata("design:type", String)
], RoomsAvailabilityQueryDto.prototype, "start_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2024-01-01T09:00:00+07:00',
        description: 'Slot end time (ISO 8601)',
    }),
    (0, class_validator_1.IsDateString)({}, { message: 'end_at must be a valid ISO date' }),
    __metadata("design:type", String)
], RoomsAvailabilityQueryDto.prototype, "end_at", void 0);
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
], RoomsAvailabilityQueryDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 20,
        description: 'Items per page',
        required: false,
        default: 20,
        minimum: 1,
        maximum: 100,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)({ message: 'pageSize must be an integer' }),
    (0, class_validator_1.Min)(1, { message: 'pageSize must be at least 1' }),
    (0, class_validator_1.Max)(100, { message: 'pageSize must be at most 100' }),
    __metadata("design:type", Number)
], RoomsAvailabilityQueryDto.prototype, "pageSize", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'name',
        description: 'Sort field (name, capacity, created_at)',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], RoomsAvailabilityQueryDto.prototype, "sortBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'asc',
        description: 'Sort direction',
        required: false,
        enum: ['asc', 'desc'],
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], RoomsAvailabilityQueryDto.prototype, "sortDir", void 0);
//# sourceMappingURL=rooms-availability.query.dto.js.map