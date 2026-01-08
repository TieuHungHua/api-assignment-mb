import { UserRole } from '@prisma/client';
export interface CurrentUserType {
    id: string;
    username: string;
    displayName: string;
    role: UserRole;
    avatar: string | null;
    classMajor: string | null;
}
export declare const CurrentUser: (...dataOrPipes: unknown[]) => ParameterDecorator;
