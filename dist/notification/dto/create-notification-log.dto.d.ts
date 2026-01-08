import { NotificationStatus } from '@prisma/client';
export declare class CreateNotificationLogDto {
    userId: string;
    borrowId?: string;
    title: string;
    body: string;
    status?: NotificationStatus;
}
