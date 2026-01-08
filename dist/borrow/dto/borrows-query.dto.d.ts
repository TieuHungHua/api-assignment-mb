import { BorrowStatus } from '@prisma/client';
export declare class BorrowsQueryDto {
    page?: number;
    limit?: number;
    status?: BorrowStatus;
    search?: string;
}
