import { PrismaService } from '../prisma/prisma.service';
import { CreateBorrowDto } from './dto/create-borrow.dto';
import { BorrowsQueryDto } from './dto/borrows-query.dto';
import { RenewBorrowDto } from './dto/renew-borrow.dto';
export declare class BorrowService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, createBorrowDto: CreateBorrowDto): Promise<{
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
    findAll(query: BorrowsQueryDto, userId?: string): Promise<{
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
    findOne(id: string, userId?: string): Promise<{
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
    returnBook(id: string, userId: string): Promise<{
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
    renew(id: string, userId: string, renewDto: RenewBorrowDto): Promise<{
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
    remove(id: string, userId: string): Promise<{
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
