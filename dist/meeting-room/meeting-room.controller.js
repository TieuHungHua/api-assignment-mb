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
exports.MeetingRoomController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const meeting_room_service_1 = require("./meeting-room.service");
const rooms_availability_query_dto_1 = require("./dto/rooms-availability.query.dto");
let MeetingRoomController = class MeetingRoomController {
    meetingRoomService;
    constructor(meetingRoomService) {
        this.meetingRoomService = meetingRoomService;
    }
    async getRooms(query) {
        return this.meetingRoomService.getRoomsWithAvailability(query);
    }
};
exports.MeetingRoomController = MeetingRoomController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'List rooms with availability for a time slot' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Rooms with availability' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [rooms_availability_query_dto_1.RoomsAvailabilityQueryDto]),
    __metadata("design:returntype", Promise)
], MeetingRoomController.prototype, "getRooms", null);
exports.MeetingRoomController = MeetingRoomController = __decorate([
    (0, swagger_1.ApiTags)('rooms'),
    (0, common_1.Controller)('api/v1/rooms'),
    __metadata("design:paramtypes", [meeting_room_service_1.MeetingRoomService])
], MeetingRoomController);
//# sourceMappingURL=meeting-room.controller.js.map