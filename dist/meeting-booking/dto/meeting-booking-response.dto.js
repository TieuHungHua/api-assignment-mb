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
exports.MeetingBookingResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class MeetingBookingUserDto {
    id;
    username;
    displayName;
    role;
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-user-id', description: 'User ID' }),
    __metadata("design:type", String)
], MeetingBookingUserDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'jdoe', description: 'Username' }),
    __metadata("design:type", String)
], MeetingBookingUserDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'John Doe', description: 'Display name' }),
    __metadata("design:type", String)
], MeetingBookingUserDto.prototype, "displayName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'student',
        description: 'User role',
        enum: ['student', 'admin', 'lecturer'],
    }),
    __metadata("design:type", String)
], MeetingBookingUserDto.prototype, "role", void 0);
class MeetingBookingResponseDto {
    id;
    user;
    tableName;
    startAt;
    endAt;
    purpose;
    attendees;
    createdAt;
}
exports.MeetingBookingResponseDto = MeetingBookingResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'uuid-booking-id',
        description: 'Meeting booking ID',
    }),
    __metadata("design:type", String)
], MeetingBookingResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: MeetingBookingUserDto, description: 'User info' }),
    __metadata("design:type", MeetingBookingUserDto)
], MeetingBookingResponseDto.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Table A1',
        description: 'Meeting table name or code',
    }),
    __metadata("design:type", String)
], MeetingBookingResponseDto.prototype, "tableName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2024-02-01T09:00:00.000Z',
        description: 'Start time',
    }),
    __metadata("design:type", Date)
], MeetingBookingResponseDto.prototype, "startAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2024-02-01T10:00:00.000Z',
        description: 'End time',
    }),
    __metadata("design:type", Date)
], MeetingBookingResponseDto.prototype, "endAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Weekly sync',
        description: 'Purpose',
        nullable: true,
    }),
    __metadata("design:type", Object)
], MeetingBookingResponseDto.prototype, "purpose", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 6,
        description: 'Number of attendees',
        nullable: true,
    }),
    __metadata("design:type", Object)
], MeetingBookingResponseDto.prototype, "attendees", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2024-02-01T08:30:00.000Z',
        description: 'Created time',
    }),
    __metadata("design:type", Date)
], MeetingBookingResponseDto.prototype, "createdAt", void 0);
//# sourceMappingURL=meeting-booking-response.dto.js.map