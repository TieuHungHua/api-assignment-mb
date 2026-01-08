import { PrismaService } from '../prisma/prisma.service';
import { CreateNotificationLogDto } from './dto/create-notification-log.dto';
import { UpdateNotificationLogDto } from './dto/update-notification-log.dto';
import { NotificationLogsQueryDto } from './dto/notification-logs-query.dto';
export declare class NotificationLogService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createDto: CreateNotificationLogDto): Promise<{
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
    findAll(query: NotificationLogsQueryDto, userId?: string): Promise<{
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
    findOne(id: string, userId?: string): Promise<{
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
    update(id: string, updateDto: UpdateNotificationLogDto, userId?: string): Promise<{
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
    remove(id: string, userId?: string): Promise<{
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
    markAsRead(id: string, userId?: string): Promise<({
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
    markAllAsRead(userId: string): Promise<{
        message: string;
        count: number;
    }>;
}
