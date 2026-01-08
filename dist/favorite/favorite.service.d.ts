import { PrismaService } from '../prisma/prisma.service';
import { FavoritesQueryDto } from './dto/favorites-query.dto';
export declare class FavoriteService {
    private prisma;
    constructor(prisma: PrismaService);
    toggleFavorite(userId: string, bookId: string): Promise<{
        bookId: string;
        book: {
            title: string;
            id: string;
            author: string;
            coverImage: string | null;
            availableCopies: number;
            likeCount: number;
        } | null;
        isFavorite: boolean;
    }>;
    private addFavorite;
    private removeFavorite;
    getFavorites(userId: string, query: FavoritesQueryDto): Promise<{
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
    checkFavorite(userId: string, bookId: string): Promise<{
        bookId: string;
        isFavorite: boolean;
        favoriteId: string | null;
    }>;
}
