import { OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';
export declare class FirebaseAdminService implements OnModuleInit {
    private configService;
    private readonly logger;
    private app;
    constructor(configService: ConfigService);
    onModuleInit(): Promise<void>;
    sendNotification(token: string, title: string, body: string, data?: Record<string, string>): Promise<{
        success: boolean;
        messageId?: string;
        error?: string;
    }>;
    sendMulticast(tokens: string[], title: string, body: string, data?: Record<string, string>): Promise<admin.messaging.BatchResponse>;
    isInitialized(): boolean;
}
