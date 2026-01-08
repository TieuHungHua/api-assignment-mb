declare class CommentUserDto {
    id: string;
    username: string;
    displayName: string;
    avatar: string | null;
}
export declare class CommentResponseDto {
    id: string;
    content: string;
    user: CommentUserDto;
    createdAt: Date;
    updatedAt: Date;
}
export {};
