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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeetingBookingController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const meeting_booking_service_1 = require("./meeting-booking.service");
const create_meeting_booking_dto_1 = require("./dto/create-meeting-booking.dto");
const meeting_bookings_criteria_dto_1 = require("./dto/meeting-bookings-criteria.dto");
const meeting_booking_response_dto_1 = require("./dto/meeting-booking-response.dto");
const update_meeting_booking_dto_1 = require("./dto/update-meeting-booking.dto");
let MeetingBookingController = class MeetingBookingController {
    meetingBookingService;
    constructor(meetingBookingService) {
        this.meetingBookingService = meetingBookingService;
    }
    async create(createMeetingBookingDto) {
        return this.meetingBookingService.create(createMeetingBookingDto);
    }
    async findAll(criteria) {
        return this.meetingBookingService.findAll(criteria);
    }
    async findOne(id) {
        return this.meetingBookingService.findOne(id);
    }
    async update(id, updateMeetingBookingDto) {
        return this.meetingBookingService.update(id, updateMeetingBookingDto);
    }
    async remove(id, userId) {
        return this.meetingBookingService.remove(id, userId);
    }
};
exports.MeetingBookingController = MeetingBookingController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Create a meeting table booking' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Meeting booking created',
        type: meeting_booking_response_dto_1.MeetingBookingResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Invalid data or time slot conflict',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_meeting_booking_dto_1.CreateMeetingBookingDto]),
    __metadata("design:returntype", Promise)
], MeetingBookingController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'List meeting table bookings' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Meeting booking list',
        schema: {
            type: 'object',
            properties: {
                data: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/MeetingBookingResponseDto' },
                },
                criteria: {
                    type: 'object',
                    properties: {
                        page: { type: 'number' },
                        limit: { type: 'number' },
                        total: { type: 'number' },
                        totalPages: { type: 'number' },
                    },
                },
            },
        },
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [meeting_bookings_criteria_dto_1.MeetingBookingsCriteriaDto]),
    __metadata("design:returntype", Promise)
], MeetingBookingController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get meeting table booking by id' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Meeting booking ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Meeting booking detail',
        type: meeting_booking_response_dto_1.MeetingBookingResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Meeting booking not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MeetingBookingController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Update meeting table booking' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Meeting booking ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Meeting booking updated',
        type: meeting_booking_response_dto_1.MeetingBookingResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Invalid data or time slot conflict',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Meeting booking or user not found',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_meeting_booking_dto_1.UpdateMeetingBookingDto]),
    __metadata("design:returntype", Promise)
], MeetingBookingController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Cancel meeting table booking' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Meeting booking ID' }),
    (0, swagger_1.ApiQuery)({ name: 'userId', required: true, type: String }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Meeting booking deleted',
        type: meeting_booking_response_dto_1.MeetingBookingResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Meeting booking or user not found',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], MeetingBookingController.prototype, "remove", null);
exports.MeetingBookingController = MeetingBookingController = __decorate([
    (0, swagger_1.ApiTags)('meeting-bookings'),
    (0, common_1.Controller)('meeting-bookings'),
    __metadata("design:paramtypes", [meeting_booking_service_1.MeetingBookingService])
], MeetingBookingController);
//# sourceMappingURL=meeting-booking.controller.js.map