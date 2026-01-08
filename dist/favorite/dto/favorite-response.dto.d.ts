export declare class FavoriteResponseDto {
    id: string;
    userId: string;
    bookId: string;
    createdAt: Date;
    book?: {
        id: string;
        title: string;
        author: string;
        coverImage?: string;
        availableCopies: number;
        likeCount: number;
    };
}
