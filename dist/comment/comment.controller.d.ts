import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentsQueryDto } from './dto/comments-query.dto';
import type { CurrentUserType } from '../auth/decorators/current-user.decorator';
export declare class CommentController {
    private readonly commentService;
    constructor(commentService: CommentService);
    createComment(bookId: string, createCommentDto: CreateCommentDto, user: CurrentUserType): Promise<{
        id: string;
        content: string;
        user: {
            username: string;
            id: string;
            displayName: string;
            avatar: string | null;
        };
        createdAt: Date;
        updatedAt: Date;
    }>;
    getComments(bookId: string, query: CommentsQueryDto): Promise<{
        data: {
            id: string;
            content: string;
            user: {
                username: string;
                id: string;
                displayName: string;
                avatar: string | null;
            };
            createdAt: Date;
            updatedAt: Date;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    updateComment(bookId: string, commentId: string, updateCommentDto: UpdateCommentDto, user: CurrentUserType): Promise<{
        id: string;
        content: string;
        user: {
            username: string;
            id: string;
            displayName: string;
            avatar: string | null;
        };
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteComment(bookId: string, commentId: string, user: CurrentUserType): Promise<{
        message: string;
    }>;
}
