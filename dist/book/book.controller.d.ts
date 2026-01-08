import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BooksQueryDto } from './dto/books-query.dto';
import type { Request } from 'express';
import type { CurrentUserType } from '../auth/decorators/current-user.decorator';
import { FavoriteService } from '../favorite/favorite.service';
import { FavoritesQueryDto } from '../favorite/dto/favorites-query.dto';
export declare class BookController {
    private readonly bookService;
    private readonly favoriteService;
    constructor(bookService: BookService, favoriteService: FavoriteService);
    create(createBookDto: CreateBookDto, coverImageFile?: Express.Multer.File): Promise<{
        status: string;
        description: string | null;
        title: string;
        id: string;
        createdAt: Date;
        author: string;
        categories: string[];
        coverImage: string | null;
        pages: number | null;
        publicationYear: number | null;
        publisher: string | null;
        availableCopies: number;
        likeCount: number;
        commentCount: number;
        borrowCount: number;
    }>;
    getFavorites(query: FavoritesQueryDto, currentUser: CurrentUserType): Promise<{
        data: {
            id: string;
            userId: string;
            bookId: string;
            favoritedAt: Date;
            book: {
                status: string;
                isBorrowed: boolean;
                borrowDue: Date | null;
                isFavorite: boolean;
                description: string | null;
                title: string;
                id: string;
                author: string;
                categories: string[];
                coverImage: string | null;
                availableCopies: number;
                likeCount: number;
                commentCount: number;
                borrowCount: number;
            };
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNextPage: boolean;
            hasPreviousPage: boolean;
        };
    }>;
    findAll(query: BooksQueryDto, req: Request & {
        user?: CurrentUserType;
    }): Promise<{
        data: {
            description: string | null;
            title: string;
            id: string;
            createdAt: Date;
            author: string;
            categories: string[];
            coverImage: string | null;
            pages: number | null;
            publicationYear: number | null;
            publisher: string | null;
            availableCopies: number;
            likeCount: number;
            commentCount: number;
            borrowCount: number;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNextPage: boolean;
            hasPreviousPage: boolean;
        };
    }>;
    findOne(id: string, req: Request & {
        user?: CurrentUserType;
    }): Promise<{
        status: string;
        isBorrowed: boolean;
        borrowDue: Date | null;
        isFavorite: boolean;
        _count: {
            borrows: number;
            interactions: number;
            comments: number;
        };
        description: string | null;
        title: string;
        id: string;
        createdAt: Date;
        author: string;
        categories: string[];
        coverImage: string | null;
        pages: number | null;
        publicationYear: number | null;
        publisher: string | null;
        availableCopies: number;
        likeCount: number;
        commentCount: number;
        borrowCount: number;
    }>;
    update(id: string, updateBookDto: UpdateBookDto): Promise<{
        status: string;
        description: string | null;
        title: string;
        id: string;
        createdAt: Date;
        author: string;
        categories: string[];
        coverImage: string | null;
        pages: number | null;
        publicationYear: number | null;
        publisher: string | null;
        availableCopies: number;
        likeCount: number;
        commentCount: number;
        borrowCount: number;
    }>;
    remove(id: string): Promise<{
        description: string | null;
        title: string;
        id: string;
        createdAt: Date;
        author: string;
        categories: string[];
        coverImage: string | null;
        pages: number | null;
        publicationYear: number | null;
        publisher: string | null;
        availableCopies: number;
        likeCount: number;
        commentCount: number;
        borrowCount: number;
    }>;
}
