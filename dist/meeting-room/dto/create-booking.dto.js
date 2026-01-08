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
exports.CreateBookingDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class CreateBookingDto {
    room_id;
    start_at;
    end_at;
    purpose;
    attendee_count;
}
exports.CreateBookingDto = CreateBookingDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-room-id', description: 'Meeting room ID' }),
    (0, class_validator_1.IsUUID)('4', { message: 'room_id must be a valid UUID' }),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "room_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2024-01-01T08:00:00+07:00',
        description: 'Slot start time (ISO 8601)',
    }),
    (0, class_validator_1.IsDateString)({}, { message: 'start_at must be a valid ISO date' }),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "start_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2024-01-01T09:00:00+07:00',
        description: 'Slot end time (ISO 8601)',
    }),
    (0, class_validator_1.IsDateString)({}, { message: 'end_at must be a valid ISO date' }),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "end_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Weekly project sync',
        description: 'Purpose of the meeting',
    }),
    (0, class_validator_1.IsString)({ message: 'purpose must be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'purpose is required' }),
    (0, class_validator_1.MaxLength)(500, { message: 'purpose must be at most 500 characters' }),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "purpose", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 4,
        description: 'Number of attendees',
        minimum: 1,
    }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)({ message: 'attendee_count must be an integer' }),
    (0, class_validator_1.Min)(1, { message: 'attendee_count must be at least 1' }),
    __metadata("design:type", Number)
], CreateBookingDto.prototype, "attendee_count", void 0);
//# sourceMappingURL=create-booking.dto.js.map