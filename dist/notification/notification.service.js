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
var NotificationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const prisma_service_1 = require("../prisma/prisma.service");
const email_service_1 = require("./email.service");
const client_1 = require("@prisma/client");
let NotificationService = NotificationService_1 = class NotificationService {
    prisma;
    emailService;
    logger = new common_1.Logger(NotificationService_1.name);
    BATCH_SIZE = 50;
    REMINDER_DAYS = [0, 1, 2, 3];
    constructor(prisma, emailService) {
        this.prisma = prisma;
        this.emailService = emailService;
    }
    async handleDailyOverdueReminder() {
        this.logger.log('🕐 Starting daily overdue reminder job at 8:00 AM');
        try {
            await this.sendOverdueReminders();
            this.logger.log('✅ Daily overdue reminder job completed successfully');
        }
        catch (error) {
            const errorObj = error;
            this.logger.error(`❌ Daily overdue reminder job failed: ${errorObj?.message || 'Unknown error'}`, errorObj?.stack);
        }
    }
    async sendOverdueReminders() {
        const now = new Date();
        const threeDaysLater = new Date(now);
        threeDaysLater.setDate(threeDaysLater.getDate() + 3);
        const overdueBorrows = await this.prisma.borrow.findMany({
            where: {
                status: client_1.BorrowStatus.active,
                returnedAt: null,
                user: {
                    email: {
                        not: null,
                    },
                },
                dueAt: {
                    gte: now,
                    lt: threeDaysLater,
                },
            },
            include: {
                user: {
                    select: {
                        id: true,
                        displayName: true,
                        email: true,
                    },
                },
                book: {
                    select: {
                        id: true,
                        title: true,
                        author: true,
                    },
                },
            },
        });
        if (overdueBorrows.length === 0) {
            this.logger.log('No overdue borrows found. Skipping notifications.');
            return;
        }
        const borrowsToNotify = [];
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        for (const borrow of overdueBorrows) {
            const dueDate = new Date(borrow.dueAt);
            dueDate.setHours(0, 0, 0, 0);
            const daysUntilDue = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
            if (this.REMINDER_DAYS.includes(daysUntilDue)) {
                borrowsToNotify.push({
                    ...borrow,
                    daysUntilDue,
                });
            }
        }
        if (borrowsToNotify.length === 0) {
            this.logger.log(`No borrows match notification criteria (${this.REMINDER_DAYS.join(', ')} days).`);
            return;
        }
        this.logger.log(`Found ${borrowsToNotify.length} borrows to notify. Processing in batches of ${this.BATCH_SIZE}...`);
        for (let i = 0; i < borrowsToNotify.length; i += this.BATCH_SIZE) {
            const batch = borrowsToNotify.slice(i, i + this.BATCH_SIZE);
            await this.processBatch(batch);
            if (i + this.BATCH_SIZE < borrowsToNotify.length) {
                await this.delay(1000);
            }
        }
        this.logger.log('✅ All notifications processed');
    }
    async processBatch(batch) {
        const promises = batch.map((borrow) => this.sendNotificationForBorrow(borrow));
        await Promise.allSettled(promises);
    }
    async sendNotificationForBorrow(borrow) {
        const { title, body } = this.getNotificationContent(borrow);
        const logEntry = await this.prisma.notificationLog.create({
            data: {
                userId: borrow.user.id,
                borrowId: borrow.id,
                title,
                body,
                status: client_1.NotificationStatus.pending,
            },
        });
        if (!borrow.user.email) {
            this.logger.warn(`User ${borrow.user.id} has no email. Skipping email notification.`);
            return;
        }
        if (!this.emailService.isInitialized()) {
            this.logger.warn('Email service not initialized. Skipping email notification.');
            return;
        }
        try {
            this.logger.log(`📧 Attempting to send email to ${borrow.user.email} for borrow ${borrow.id}...`);
            const emailResult = await this.emailService.sendOverdueReminderEmail(borrow.user.email, borrow.user.displayName, borrow.book.title, borrow.daysUntilDue, borrow.id);
            if (emailResult.success) {
                await this.prisma.notificationLog.update({
                    where: { id: logEntry.id },
                    data: {
                        status: client_1.NotificationStatus.sent,
                        sentAt: new Date(),
                    },
                });
                this.logger.log(`✅ Email sent successfully to ${borrow.user.email} for user ${borrow.user.id} (borrow ${borrow.id})`);
            }
            else {
                await this.prisma.notificationLog.update({
                    where: { id: logEntry.id },
                    data: {
                        status: client_1.NotificationStatus.failed,
                        errorMessage: emailResult.error,
                    },
                });
                this.logger.error(`❌ Failed to send email to ${borrow.user.email}: ${emailResult.error}`);
            }
        }
        catch (error) {
            const errorObj = error;
            await this.prisma.notificationLog.update({
                where: { id: logEntry.id },
                data: {
                    status: client_1.NotificationStatus.failed,
                    errorMessage: errorObj?.message || 'Unknown error',
                },
            });
            this.logger.error(`❌ Error sending email to ${borrow.user.email}: ${errorObj?.message || 'Unknown error'}`);
        }
    }
    getNotificationContent(borrow) {
        const bookTitle = borrow.book.title;
        const daysLeft = borrow.daysUntilDue;
        if (daysLeft === 0) {
            return {
                title: '📚 Hạn trả sách hôm nay!',
                body: `Sách "${bookTitle}" của bạn hết hạn trả vào hôm nay. Vui lòng trả sách đúng hạn!`,
            };
        }
        else if (daysLeft === 1) {
            return {
                title: '📚 Nhắc nhở trả sách',
                body: `Sách "${bookTitle}" của bạn sẽ hết hạn vào ngày mai. Vui lòng chuẩn bị trả sách!`,
            };
        }
        else if (daysLeft === 2) {
            return {
                title: '📚 Nhắc nhở trả sách',
                body: `Sách "${bookTitle}" của bạn sẽ hết hạn sau 2 ngày nữa. Vui lòng chuẩn bị trả sách!`,
            };
        }
        else if (daysLeft === 3) {
            return {
                title: '📚 Nhắc nhở trả sách',
                body: `Sách "${bookTitle}" của bạn sẽ hết hạn sau 3 ngày nữa. Vui lòng chuẩn bị trả sách!`,
            };
        }
        return {
            title: '📚 Nhắc nhở trả sách',
            body: `Sách "${bookTitle}" của bạn sắp hết hạn (còn ${daysLeft} ngày). Vui lòng trả sách đúng hạn!`,
        };
    }
    delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    async triggerManualReminder() {
        this.logger.log('🔄 Manual reminder trigger requested');
        await this.sendOverdueReminders();
        return {
            message: 'Manual reminder triggered successfully',
            count: 0,
        };
    }
    async updateFcmToken(userId, fcmToken, isPushEnabled) {
        const updateData = {
            fcmToken,
        };
        if (isPushEnabled !== undefined) {
            updateData.isPushEnabled = isPushEnabled;
        }
        const updatedUser = await this.prisma.user.update({
            where: { id: userId },
            data: updateData,
            select: {
                id: true,
                username: true,
                displayName: true,
                fcmToken: true,
                isPushEnabled: true,
            },
        });
        this.logger.log(`✅ FCM token updated for user ${userId}. Push enabled: ${updatedUser.isPushEnabled}`);
        return {
            message: 'FCM token updated successfully',
            user: updatedUser,
        };
    }
    async testSendNotification(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                displayName: true,
            },
        });
        if (!user) {
            return {
                success: false,
                message: 'User not found',
            };
        }
        const title = '🧪 Test Notification';
        const body = `Xin chào ${user.displayName}! Đây là thông báo test từ hệ thống thư viện BK.`;
        const log = await this.prisma.notificationLog.create({
            data: {
                userId: user.id,
                title,
                body,
                status: client_1.NotificationStatus.pending,
            },
        });
        return {
            success: true,
            message: 'Test notification log created successfully',
            log,
        };
    }
    async testSendEmail(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                displayName: true,
                email: true,
            },
        });
        if (!user) {
            return {
                success: false,
                message: 'User not found',
            };
        }
        if (!user.email) {
            return {
                success: false,
                message: 'User does not have email address',
            };
        }
        if (!this.emailService.isInitialized()) {
            return {
                success: false,
                message: 'Email service not initialized. Please check SMTP configuration.',
            };
        }
        const result = await this.emailService.sendOverdueReminderEmail(user.email, user.displayName, 'Sách Test - Clean Code', 3, 'test-borrow-id');
        if (result.success) {
            return {
                success: true,
                message: `Test email sent successfully to ${user.email}`,
                messageId: result.messageId,
            };
        }
        else {
            return {
                success: false,
                message: 'Failed to send test email',
                error: result.error,
            };
        }
    }
};
exports.NotificationService = NotificationService;
__decorate([
    (0, schedule_1.Cron)('21 19 * * *', {
        name: 'daily-overdue-reminder',
        timeZone: 'Asia/Ho_Chi_Minh',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NotificationService.prototype, "handleDailyOverdueReminder", null);
exports.NotificationService = NotificationService = NotificationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        email_service_1.EmailService])
], NotificationService);
//# sourceMappingURL=notification.service.js.map