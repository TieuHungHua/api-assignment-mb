"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationModule = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const notification_controller_1 = require("./notification.controller");
const notification_service_1 = require("./notification.service");
const notification_log_service_1 = require("./notification-log.service");
const email_service_1 = require("./email.service");
const firebase_admin_service_1 = require("./firebase-admin.service");
const prisma_module_1 = require("../prisma/prisma.module");
let NotificationModule = class NotificationModule {
};
exports.NotificationModule = NotificationModule;
exports.NotificationModule = NotificationModule = __decorate([
    (0, common_1.Module)({
        imports: [schedule_1.ScheduleModule.forRoot(), prisma_module_1.PrismaModule],
        controllers: [notification_controller_1.NotificationController],
        providers: [notification_service_1.NotificationService, notification_log_service_1.NotificationLogService, email_service_1.EmailService, firebase_admin_service_1.FirebaseAdminService],
        exports: [notification_service_1.NotificationService, notification_log_service_1.NotificationLogService, email_service_1.EmailService, firebase_admin_service_1.FirebaseAdminService],
    })
], NotificationModule);
//# sourceMappingURL=notification.module.js.map