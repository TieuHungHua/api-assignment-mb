import { OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
export declare class EmailService implements OnModuleInit {
    private readonly configService;
    private readonly logger;
    private transporter?;
    constructor(configService: ConfigService);
    onModuleInit(): Promise<void>;
    sendOverdueReminderEmail(to: string, displayName: string, bookTitle: string, daysUntilDue: number, _borrowId: string): Promise<{
        success: boolean;
        messageId?: string;
        error?: string;
    }>;
    private getEmailContent;
    private getDueDateText;
    isInitialized(): boolean;
}
