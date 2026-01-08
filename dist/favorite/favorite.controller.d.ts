import { FavoriteService } from './favorite.service';
import type { CurrentUserType } from '../auth/decorators/current-user.decorator';
import { FavoritesQueryDto } from './dto/favorites-query.dto';
export declare class FavoriteController {
    private readonly favoriteService;
    constructor(favoriteService: FavoriteService);
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
    toggleFavorite(bookId: string, currentUser: CurrentUserType): Promise<{
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
    checkFavorite(bookId: string, currentUser: CurrentUserType): Promise<{
        bookId: string;
        isFavorite: boolean;
        favoriteId: string | null;
    }>;
}
