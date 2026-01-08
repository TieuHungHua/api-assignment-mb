export declare class BooksQueryDto {
    page?: number;
    limit?: number;
    search?: string;
    author?: string;
    category?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    status?: 'available';
}
