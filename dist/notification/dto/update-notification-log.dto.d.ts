import { NotificationStatus } from '@prisma/client';
export declare class UpdateNotificationLogDto {
    title?: string;
    body?: string;
    status?: NotificationStatus;
    errorMessage?: string;
    isRead?: boolean;
}
