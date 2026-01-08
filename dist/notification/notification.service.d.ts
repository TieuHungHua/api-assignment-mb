import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from './email.service';
export declare class NotificationService {
    private prisma;
    private emailService;
    private readonly logger;
    private readonly BATCH_SIZE;
    private readonly REMINDER_DAYS;
    constructor(prisma: PrismaService, emailService: EmailService);
    handleDailyOverdueReminder(): Promise<void>;
    sendOverdueReminders(): Promise<void>;
    private processBatch;
    private sendNotificationForBorrow;
    private getNotificationContent;
    private delay;
    triggerManualReminder(): Promise<{
        message: string;
        count: number;
    }>;
    updateFcmToken(userId: string, fcmToken: string, isPushEnabled?: boolean): Promise<{
        message: string;
        user: {
            username: string;
            id: string;
            displayName: string;
            fcmToken: string | null;
            isPushEnabled: boolean;
        };
    }>;
    testSendNotification(userId: string): Promise<{
        success: boolean;
        message: string;
        log?: undefined;
    } | {
        success: boolean;
        message: string;
        log: {
            title: string;
            id: string;
            fcmToken: string | null;
            createdAt: Date;
            userId: string;
            status: import("@prisma/client").$Enums.NotificationStatus;
            borrowId: string | null;
            body: string;
            errorMessage: string | null;
            retryCount: number;
            sentAt: Date | null;
            isRead: boolean;
            readAt: Date | null;
        };
    }>;
    testSendEmail(userId: string): Promise<{
        success: boolean;
        message: string;
        messageId?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        messageId: string | undefined;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: string | undefined;
        messageId?: undefined;
    }>;
}
