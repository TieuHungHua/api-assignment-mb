import { Strategy } from 'passport-jwt';
import { UserRole } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private prisma;
    constructor(prisma: PrismaService);
    validate(payload: {
        sub: string;
        username: string;
        role: UserRole;
    }): Promise<{
        username: string;
        role: import("@prisma/client").$Enums.UserRole;
        id: string;
        displayName: string;
        avatar: string | null;
        classMajor: string | null;
    }>;
}
export {};
