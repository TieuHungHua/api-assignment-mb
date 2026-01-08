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
exports.NotificationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const notification_service_1 = require("./notification.service");
const notification_log_service_1 = require("./notification-log.service");
const update_fcm_token_dto_1 = require("./dto/update-fcm-token.dto");
const create_notification_log_dto_1 = require("./dto/create-notification-log.dto");
const update_notification_log_dto_1 = require("./dto/update-notification-log.dto");
const notification_logs_query_dto_1 = require("./dto/notification-logs-query.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let NotificationController = class NotificationController {
    notificationService;
    notificationLogService;
    constructor(notificationService, notificationLogService) {
        this.notificationService = notificationService;
        this.notificationLogService = notificationLogService;
    }
    async updateFcmToken(req, updateFcmTokenDto) {
        const userId = req.user.id;
        return this.notificationService.updateFcmToken(userId, updateFcmTokenDto.fcmToken, updateFcmTokenDto.isPushEnabled);
    }
    async triggerManualReminder() {
        return this.notificationService.triggerManualReminder();
    }
    async testSendNotification(req) {
        return this.notificationService.testSendNotification(req.user.id);
    }
    async testSendEmail(req) {
        return this.notificationService.testSendEmail(req.user.id);
    }
    async createNotificationLog(createDto) {
        return this.notificationLogService.create(createDto);
    }
    async getNotificationLogs(query, req) {
        const userId = req.user.role === 'admin' ? undefined : req.user.id;
        return this.notificationLogService.findAll(query, userId);
    }
    async getNotificationLog(id, req) {
        const userId = req.user.role === 'admin' ? undefined : req.user.id;
        return this.notificationLogService.findOne(id, userId);
    }
    async updateNotificationLog(id, updateDto, req) {
        const userId = req.user.role === 'admin' ? undefined : req.user.id;
        return this.notificationLogService.update(id, updateDto, userId);
    }
    async deleteNotificationLog(id, req) {
        const userId = req.user.role === 'admin' ? undefined : req.user.id;
        return this.notificationLogService.remove(id, userId);
    }
    async markAsRead(id, req) {
        const userId = req.user.role === 'admin' ? undefined : req.user.id;
        return this.notificationLogService.markAsRead(id, userId);
    }
    async markAllAsRead(req) {
        const userId = req.user.id;
        return this.notificationLogService.markAllAsRead(userId);
    }
};
exports.NotificationController = NotificationController;
__decorate([
    (0, common_1.Put)('fcm-token'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Cập nhật FCM token cho user' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'FCM token updated successfully',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized',
    }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_fcm_token_dto_1.UpdateFcmTokenDto]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "updateFcmToken", null);
__decorate([
    (0, common_1.Post)('trigger-reminder'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Trigger manual reminder (for testing - includes email)',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Manual reminder triggered',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "triggerManualReminder", null);
__decorate([
    (0, common_1.Post)('test-send'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Test tạo notification log (for testing)',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Test notification log created',
    }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "testSendNotification", null);
__decorate([
    (0, common_1.Post)('test-email'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Test gửi email nhắc trả hạn (for testing)',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Test email sent',
    }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "testSendEmail", null);
__decorate([
    (0, common_1.Post)('logs'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Tạo thông báo mới' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Thông báo đã được tạo' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_notification_log_dto_1.CreateNotificationLogDto]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "createNotificationLog", null);
__decorate([
    (0, common_1.Get)('logs'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy danh sách thông báo (có phân trang và filter)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Danh sách thông báo' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [notification_logs_query_dto_1.NotificationLogsQueryDto, Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "getNotificationLogs", null);
__decorate([
    (0, common_1.Get)('logs/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy chi tiết thông báo' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Chi tiết thông báo' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Thông báo không tồn tại' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "getNotificationLog", null);
__decorate([
    (0, common_1.Patch)('logs/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Cập nhật thông báo' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Thông báo đã được cập nhật' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Thông báo không tồn tại' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_notification_log_dto_1.UpdateNotificationLogDto, Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "updateNotificationLog", null);
__decorate([
    (0, common_1.Delete)('logs/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Xóa thông báo' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Thông báo đã được xóa' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Thông báo không tồn tại' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "deleteNotificationLog", null);
__decorate([
    (0, common_1.Patch)('logs/:id/read'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Đánh dấu thông báo đã đọc' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Thông báo đã được đánh dấu đã đọc' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Thông báo không tồn tại' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "markAsRead", null);
__decorate([
    (0, common_1.Patch)('logs/read-all'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Đánh dấu tất cả thông báo đã đọc' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Tất cả thông báo đã được đánh dấu đã đọc' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "markAllAsRead", null);
exports.NotificationController = NotificationController = __decorate([
    (0, swagger_1.ApiTags)('notifications'),
    (0, common_1.Controller)('notifications'),
    __metadata("design:paramtypes", [notification_service_1.NotificationService,
        notification_log_service_1.NotificationLogService])
], NotificationController);
//# sourceMappingURL=notification.controller.js.map