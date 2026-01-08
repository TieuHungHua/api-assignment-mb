"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var EmailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nodemailer = __importStar(require("nodemailer"));
let EmailService = EmailService_1 = class EmailService {
    configService;
    logger = new common_1.Logger(EmailService_1.name);
    transporter;
    constructor(configService) {
        this.configService = configService;
    }
    async onModuleInit() {
        try {
            const host = this.configService.get('SMTP_HOST') ?? 'smtp.gmail.com';
            const port = Number(this.configService.get('SMTP_PORT')) || 587;
            const secure = this.configService.get('SMTP_SECURE') === 'true';
            const user = this.configService.get('SMTP_USER');
            const pass = this.configService.get('SMTP_PASS');
            if (!user || !pass) {
                this.logger.warn('SMTP credentials not found. Email service will be disabled.');
                return;
            }
            this.transporter = nodemailer.createTransport({
                host,
                port,
                secure,
                auth: { user, pass },
            });
            try {
                await this.transporter.verify();
                this.logger.log('✅ Email service initialized successfully');
                this.logger.log(`📧 Email will be sent from: ${user}`);
            }
            catch {
                this.logger.warn('SMTP verify failed, but email service will try to send anyway');
            }
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            this.logger.error(`Failed to initialize email service: ${message}`);
        }
    }
    async sendOverdueReminderEmail(to, displayName, bookTitle, daysUntilDue, _borrowId) {
        if (!this.transporter) {
            return {
                success: false,
                error: 'Email service not initialized',
            };
        }
        const { subject, html } = this.getEmailContent(displayName, bookTitle, daysUntilDue);
        try {
            const smtpUser = this.configService.get('SMTP_USER') ?? '';
            const result = (await this.transporter.sendMail({
                from: `"Thư Viện BK" <${smtpUser}>`,
                to,
                subject,
                html,
            }));
            let messageId;
            if (result && typeof result === 'object' && 'messageId' in result) {
                const msgId = result.messageId;
                if (typeof msgId === 'string') {
                    messageId = msgId;
                }
                else if (typeof msgId === 'number') {
                    messageId = String(msgId);
                }
            }
            this.logger.log(`✅ Email sent successfully: ${messageId || 'N/A'}`);
            return {
                success: true,
                messageId,
            };
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            this.logger.error(`❌ Failed to send email: ${errorMessage}`);
            return {
                success: false,
                error: errorMessage,
            };
        }
    }
    getEmailContent(displayName, bookTitle, daysUntilDue) {
        let urgencyText = '';
        let urgencyColor = '#2196F3';
        if (daysUntilDue < 0) {
            urgencyText = `ĐÃ QUÁ HẠN ${Math.abs(daysUntilDue)} NGÀY`;
            urgencyColor = '#D32F2F';
        }
        else if (daysUntilDue === 0) {
            urgencyText = 'HẠN TRẢ SÁCH HÔM NAY';
            urgencyColor = '#F44336';
        }
        else if (daysUntilDue === 1) {
            urgencyText = 'HẾT HẠN VÀO NGÀY MAI';
            urgencyColor = '#FF9800';
        }
        else if (daysUntilDue === 2) {
            urgencyText = 'CÒN 2 NGÀY NỮA';
            urgencyColor = '#FFC107';
        }
        else if (daysUntilDue === 3) {
            urgencyText = 'CÒN 3 NGÀY NỮA';
            urgencyColor = '#4CAF50';
        }
        const subject = `📚 Nhắc nhở trả sách - ${bookTitle}`;
        const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 30px;
      text-align: center;
      border-radius: 10px 10px 0 0;
    }
    .content {
      background: #f9f9f9;
      padding: 30px;
      border-radius: 0 0 10px 10px;
    }
    .urgency-badge {
      display: inline-block;
      background: ${urgencyColor};
      color: white;
      padding: 10px 20px;
      border-radius: 5px;
      font-weight: bold;
      margin: 20px 0;
    }
    .book-info {
      background: white;
      padding: 20px;
      border-radius: 5px;
      margin: 20px 0;
      border-left: 4px solid ${urgencyColor};
    }
    .footer {
      text-align: center;
      margin-top: 30px;
      color: #666;
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>📚 Thư Viện BK</h1>
    <p>Hệ thống quản lý thư viện</p>
  </div>

  <div class="content">
    <h2>Xin chào ${displayName},</h2>

    <div class="urgency-badge">${urgencyText}</div>

    <p>Chúng tôi muốn nhắc nhở bạn về việc trả sách:</p>

    <div class="book-info">
      <h3>📖 ${bookTitle}</h3>
      <p><strong>Thời hạn trả:</strong> ${this.getDueDateText(daysUntilDue)}</p>
    </div>

    <p>
      Vui lòng trả sách đúng hạn để tránh bị phạt và ảnh hưởng đến quyền
      mượn sách của bạn.
    </p>

    <p>
      Trân trọng,<br />
      <strong>Đội ngũ Thư Viện BK</strong>
    </p>
  </div>

  <div class="footer">
    <p>Email này được gửi tự động từ hệ thống thư viện BK.</p>
    <p>Vui lòng không trả lời email này.</p>
  </div>
</body>
</html>`;
        return { subject, html };
    }
    getDueDateText(daysUntilDue) {
        if (daysUntilDue < 0) {
            return `Quá hạn ${Math.abs(daysUntilDue)} ngày`;
        }
        if (daysUntilDue === 0) {
            return 'Hôm nay';
        }
        if (daysUntilDue === 1) {
            return 'Ngày mai';
        }
        return `Sau ${daysUntilDue} ngày nữa`;
    }
    isInitialized() {
        return Boolean(this.transporter);
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = EmailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], EmailService);
//# sourceMappingURL=email.service.js.map