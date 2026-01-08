import { NotificationStatus } from '@prisma/client';
export declare class NotificationLogsQueryDto {
    page?: number;
    limit?: number;
    status?: NotificationStatus;
    userId?: string;
    borrowId?: string;
    isRead?: boolean;
}
