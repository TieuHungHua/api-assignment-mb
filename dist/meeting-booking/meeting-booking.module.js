"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeetingBookingModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("../prisma/prisma.module");
const meeting_booking_controller_1 = require("./meeting-booking.controller");
const meeting_booking_service_1 = require("./meeting-booking.service");
let MeetingBookingModule = class MeetingBookingModule {
};
exports.MeetingBookingModule = MeetingBookingModule;
exports.MeetingBookingModule = MeetingBookingModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [meeting_booking_controller_1.MeetingBookingController],
        providers: [meeting_booking_service_1.MeetingBookingService],
        exports: [meeting_booking_service_1.MeetingBookingService],
    })
], MeetingBookingModule);
//# sourceMappingURL=meeting-booking.module.js.map