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
exports.UpdateMeetingBookingDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UpdateMeetingBookingDto {
    userId;
    tableName;
    startAt;
    endAt;
    purpose;
    attendees;
}
exports.UpdateMeetingBookingDto = UpdateMeetingBookingDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-user-id', description: 'User ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateMeetingBookingDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Table A1',
        description: 'Meeting table name or code',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateMeetingBookingDto.prototype, "tableName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2024-02-01T09:00:00.000Z',
        description: 'Start time',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpdateMeetingBookingDto.prototype, "startAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2024-02-01T10:00:00.000Z',
        description: 'End time',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpdateMeetingBookingDto.prototype, "endAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Weekly sync',
        description: 'Purpose',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateMeetingBookingDto.prototype, "purpose", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 6,
        description: 'Number of attendees',
        required: false,
        minimum: 1,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], UpdateMeetingBookingDto.prototype, "attendees", void 0);
//# sourceMappingURL=update-meeting-booking.dto.js.map