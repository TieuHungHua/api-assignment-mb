import { NotificationService } from './notification.service';
import { NotificationLogService } from './notification-log.service';
import { UpdateFcmTokenDto } from './dto/update-fcm-token.dto';
import { CreateNotificationLogDto } from './dto/create-notification-log.dto';
import { UpdateNotificationLogDto } from './dto/update-notification-log.dto';
import { NotificationLogsQueryDto } from './dto/notification-logs-query.dto';
interface RequestWithUser extends Request {
    user: {
        id: string;
        username: string;
        displayName: string;
        role: string;
    };
}
export declare class NotificationController {
    private readonly notificationService;
    private readonly notificationLogService;
    constructor(notificationService: NotificationService, notificationLogService: NotificationLogService);
    updateFcmToken(req: RequestWithUser, updateFcmTokenDto: UpdateFcmTokenDto): Promise<{
        message: string;
        user: {
            username: string;
            id: string;
            displayName: string;
            fcmToken: string | null;
            isPushEnabled: boolean;
        };
    }>;
    triggerManualReminder(): Promise<{
        message: string;
        count: number;
    }>;
    testSendNotification(req: RequestWithUser): Promise<{
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
    testSendEmail(req: RequestWithUser): Promise<{
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
    createNotificationLog(createDto: CreateNotificationLogDto): Promise<{
        user: {
            username: string;
            id: string;
            displayName: string;
        };
        borrow: ({
            book: {
                title: string;
                id: string;
                author: string;
            };
        } & {
            id: string;
            userId: string;
            bookId: string;
            status: import("@prisma/client").$Enums.BorrowStatus;
            borrowedAt: Date;
            dueAt: Date;
            returnedAt: Date | null;
            renewCount: number;
            maxRenewCount: number;
        }) | null;
    } & {
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
    }>;
    getNotificationLogs(query: NotificationLogsQueryDto, req: RequestWithUser): Promise<{
        data: ({
            user: {
                username: string;
                id: string;
                displayName: string;
            };
            borrow: ({
                book: {
                    title: string;
                    id: string;
                    author: string;
                };
            } & {
                id: string;
                userId: string;
                bookId: string;
                status: import("@prisma/client").$Enums.BorrowStatus;
                borrowedAt: Date;
                dueAt: Date;
                returnedAt: Date | null;
                renewCount: number;
                maxRenewCount: number;
            }) | null;
        } & {
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
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    getNotificationLog(id: string, req: RequestWithUser): Promise<{
        user: {
            username: string;
            id: string;
            displayName: string;
        };
        borrow: ({
            book: {
                title: string;
                id: string;
                author: string;
            };
        } & {
            id: string;
            userId: string;
            bookId: string;
            status: import("@prisma/client").$Enums.BorrowStatus;
            borrowedAt: Date;
            dueAt: Date;
            returnedAt: Date | null;
            renewCount: number;
            maxRenewCount: number;
        }) | null;
    } & {
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
    }>;
    updateNotificationLog(id: string, updateDto: UpdateNotificationLogDto, req: RequestWithUser): Promise<{
        user: {
            username: string;
            id: string;
            displayName: string;
        };
        borrow: ({
            book: {
                title: string;
                id: string;
                author: string;
            };
        } & {
            id: string;
            userId: string;
            bookId: string;
            status: import("@prisma/client").$Enums.BorrowStatus;
            borrowedAt: Date;
            dueAt: Date;
            returnedAt: Date | null;
            renewCount: number;
            maxRenewCount: number;
        }) | null;
    } & {
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
    }>;
    deleteNotificationLog(id: string, req: RequestWithUser): Promise<{
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
    }>;
    markAsRead(id: string, req: RequestWithUser): Promise<({
        user: {
            username: string;
            id: string;
            displayName: string;
        };
        borrow: ({
            book: {
                title: string;
                id: string;
                author: string;
            };
        } & {
            id: string;
            userId: string;
            bookId: string;
            status: import("@prisma/client").$Enums.BorrowStatus;
            borrowedAt: Date;
            dueAt: Date;
            returnedAt: Date | null;
            renewCount: number;
            maxRenewCount: number;
        }) | null;
    } & {
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
    }) | null>;
    markAllAsRead(req: RequestWithUser): Promise<{
        message: string;
        count: number;
    }>;
}
export {};
