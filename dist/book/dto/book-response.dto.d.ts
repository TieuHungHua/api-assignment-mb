export declare class BookResponseDto {
    id: string;
    title: string;
    author: string;
    categories: string[];
    coverImage: string | null;
    description: string | null;
    publisher: string | null;
    publicationYear: number | null;
    pages: number | null;
    availableCopies: number;
    status: string;
    likeCount: number;
    commentCount: number;
    borrowCount: number;
    createdAt: Date;
}
