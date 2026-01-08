import { BorrowService } from './borrow.service';
import { CreateBorrowDto } from './dto/create-borrow.dto';
import { BorrowsQueryDto } from './dto/borrows-query.dto';
import { RenewBorrowDto } from './dto/renew-borrow.dto';
import type { CurrentUserType } from '../auth/decorators/current-user.decorator';
export declare class BorrowController {
    private readonly borrowService;
    constructor(borrowService: BorrowService);
    create(createBorrowDto: CreateBorrowDto, user: CurrentUserType): Promise<{
        user: {
            username: string;
            id: string;
            displayName: string;
        };
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
    }>;
    findAll(query: BorrowsQueryDto, user: CurrentUserType): Promise<{
        data: {
            daysLeft: number;
            isExpired: boolean;
            user: {
                username: string;
                id: string;
                displayName: string;
            };
            book: {
                title: string;
                id: string;
                author: string;
                coverImage: string | null;
                availableCopies: number;
            };
            id: string;
            userId: string;
            bookId: string;
            status: import("@prisma/client").$Enums.BorrowStatus;
            borrowedAt: Date;
            dueAt: Date;
            returnedAt: Date | null;
            renewCount: number;
            maxRenewCount: number;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    findOne(id: string, user: CurrentUserType): Promise<{
        user: {
            username: string;
            id: string;
            displayName: string;
        };
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
    }>;
    returnBook(id: string, user: CurrentUserType): Promise<{
        user: {
            username: string;
            id: string;
            displayName: string;
        };
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
    }>;
    renew(id: string, renewDto: RenewBorrowDto, user: CurrentUserType): Promise<{
        user: {
            username: string;
            id: string;
            displayName: string;
        };
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
    }>;
    remove(id: string, user: CurrentUserType): Promise<{
        id: string;
        userId: string;
        bookId: string;
        status: import("@prisma/client").$Enums.BorrowStatus;
        borrowedAt: Date;
        dueAt: Date;
        returnedAt: Date | null;
        renewCount: number;
        maxRenewCount: number;
    }>;
}
