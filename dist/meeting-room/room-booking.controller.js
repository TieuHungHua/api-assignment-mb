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
exports.RoomBookingController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const optional_jwt_auth_guard_1 = require("../auth/optional-jwt-auth.guard");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const create_booking_dto_1 = require("./dto/create-booking.dto");
const booking_search_dto_1 = require("./dto/booking-search.dto");
const cancel_booking_dto_1 = require("./dto/cancel-booking.dto");
const room_booking_service_1 = require("./room-booking.service");
let RoomBookingController = class RoomBookingController {
    roomBookingService;
    constructor(roomBookingService) {
        this.roomBookingService = roomBookingService;
    }
    async createBooking(dto, currentUser) {
        return this.roomBookingService.createBooking(currentUser, dto);
    }
    async searchBookings(criteria, req) {
        return this.roomBookingService.searchBookings(criteria, req.user ?? null);
    }
    async getBooking(id, req) {
        return this.roomBookingService.getBookingById(id, req.user ?? null);
    }
    async cancelBooking(id, dto, currentUser) {
        return this.roomBookingService.cancelBooking(id, currentUser, dto);
    }
};
exports.RoomBookingController = RoomBookingController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Create a meeting room booking' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Booking created' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid input' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Room conflict' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_booking_dto_1.CreateBookingDto, Object]),
    __metadata("design:returntype", Promise)
], RoomBookingController.prototype, "createBooking", null);
__decorate([
    (0, common_1.Post)('search'),
    (0, common_1.UseGuards)(optional_jwt_auth_guard_1.OptionalJwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Search bookings (Criteria-based pagination)' }),
    (0, swagger_1.ApiBody)({ type: booking_search_dto_1.BookingSearchCriteriaDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Bookings list' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [booking_search_dto_1.BookingSearchCriteriaDto, Object]),
    __metadata("design:returntype", Promise)
], RoomBookingController.prototype, "searchBookings", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(optional_jwt_auth_guard_1.OptionalJwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get booking detail' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Booking detail' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Booking not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RoomBookingController.prototype, "getBooking", null);
__decorate([
    (0, common_1.Patch)(':id/cancel'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Cancel a booking' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Booking cancelled' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Booking cannot be cancelled' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, cancel_booking_dto_1.CancelBookingDto, Object]),
    __metadata("design:returntype", Promise)
], RoomBookingController.prototype, "cancelBooking", null);
exports.RoomBookingController = RoomBookingController = __decorate([
    (0, swagger_1.ApiTags)('bookings'),
    (0, common_1.Controller)('api/v1/bookings'),
    __metadata("design:paramtypes", [room_booking_service_1.RoomBookingService])
], RoomBookingController);
//# sourceMappingURL=room-booking.controller.js.map