import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentsQueryDto } from './dto/comments-query.dto';
export declare class CommentService {
    private prisma;
    constructor(prisma: PrismaService);
    createComment(userId: string, bookId: string, createCommentDto: CreateCommentDto): Promise<{
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
    updateComment(userId: string, commentId: string, updateCommentDto: UpdateCommentDto): Promise<{
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
    deleteComment(userId: string, commentId: string): Promise<{
        message: string;
    }>;
}
