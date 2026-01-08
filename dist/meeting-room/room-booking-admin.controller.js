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
exports.RoomBookingAdminController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const room_booking_service_1 = require("./room-booking.service");
const booking_search_dto_1 = require("./dto/booking-search.dto");
const cancel_booking_dto_1 = require("./dto/cancel-booking.dto");
let RoomBookingAdminController = class RoomBookingAdminController {
    roomBookingService;
    constructor(roomBookingService) {
        this.roomBookingService = roomBookingService;
    }
    async searchBookings(criteria, currentUser) {
        this.assertStaff(currentUser);
        return this.roomBookingService.searchBookings(criteria, currentUser);
    }
    async approve(id, currentUser) {
        this.assertStaff(currentUser);
        return this.roomBookingService.approveBooking(id, currentUser);
    }
    async reject(id, dto, currentUser) {
        this.assertStaff(currentUser);
        return this.roomBookingService.rejectBooking(id, currentUser, dto);
    }
    assertStaff(currentUser) {
        if (currentUser.role !== client_1.UserRole.admin &&
            currentUser.role !== client_1.UserRole.lecturer) {
            throw new common_1.ForbiddenException('Admin or staff role required');
        }
    }
};
exports.RoomBookingAdminController = RoomBookingAdminController;
__decorate([
    (0, common_1.Post)('search'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Admin search bookings' }),
    (0, swagger_1.ApiBody)({ type: booking_search_dto_1.BookingSearchCriteriaDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Bookings list' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [booking_search_dto_1.BookingSearchCriteriaDto, Object]),
    __metadata("design:returntype", Promise)
], RoomBookingAdminController.prototype, "searchBookings", null);
__decorate([
    (0, common_1.Patch)(':id/approve'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Approve a booking' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Booking approved' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Booking not found' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Room conflict' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RoomBookingAdminController.prototype, "approve", null);
__decorate([
    (0, common_1.Patch)(':id/reject'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Reject a booking' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Booking rejected' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Booking not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, cancel_booking_dto_1.CancelBookingDto, Object]),
    __metadata("design:returntype", Promise)
], RoomBookingAdminController.prototype, "reject", null);
exports.RoomBookingAdminController = RoomBookingAdminController = __decorate([
    (0, swagger_1.ApiTags)('admin-bookings'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('api/v1/admin/bookings'),
    __metadata("design:paramtypes", [room_booking_service_1.RoomBookingService])
], RoomBookingAdminController);
//# sourceMappingURL=room-booking-admin.controller.js.map