declare class BorrowUserDto {
    id: string;
    username: string;
    displayName: string;
}
declare class BorrowBookDto {
    id: string;
    title: string;
    author: string;
}
export declare class BorrowResponseDto {
    id: string;
    user: BorrowUserDto;
    book: BorrowBookDto;
    borrowedAt: Date;
    dueAt: Date;
    returnedAt: Date | null;
    status: string;
}
export {};
