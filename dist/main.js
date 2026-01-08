"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const path_1 = require("path");
const fs_1 = require("fs");
const possiblePaths = [
    (0, path_1.join)(process.cwd(), '.env'),
    (0, path_1.join)(__dirname, '..', '..', '.env'),
    (0, path_1.join)(__dirname, '..', '.env'),
];
let envLoaded = false;
for (const envPath of possiblePaths) {
    if ((0, fs_1.existsSync)(envPath)) {
        (0, dotenv_1.config)({ path: envPath });
        console.log('✅ Loaded .env from:', envPath);
        envLoaded = true;
        break;
    }
}
if (!envLoaded) {
    console.warn('⚠️  Không tìm thấy file .env ở các vị trí sau:');
    possiblePaths.forEach((path) => console.warn('  -', path));
    console.warn('Đang thử load từ process.env (có thể đã được set từ hệ thống)');
    (0, dotenv_1.config)();
}
console.log('🔍 Checking Cloudinary env vars:');
console.log('  CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME ? '✅ Found' : '❌ Missing');
console.log('  CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY ? '✅ Found' : '❌ Missing');
console.log('  CLOUDINARY_API_SECRET:', process.env.CLOUDINARY_API_SECRET ? '✅ Found' : '❌ Missing');
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: [
            'http://localhost:8081',
            'http://localhost:19006',
            'http://localhost:19000',
            'http://10.0.2.2:3000',
            'http://localhost:3000',
        ],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Library Management System API')
        .setDescription('API documentation for Library Management System')
        .setVersion('1.0')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
    }, 'JWT-auth')
        .addTag('auth', 'Authentication endpoints')
        .addTag('upload', 'File upload endpoints')
        .addTag('comments', 'Book comments endpoints')
        .addTag('books', 'Book management endpoints')
        .addTag('borrows', 'Borrow management endpoints')
        .addTag('rewards', 'Reward management endpoints')
        .addTag('users', 'User management endpoints')
        .addTag('rooms', 'Meeting room endpoints')
        .addTag('bookings', 'Meeting room booking endpoints')
        .addTag('admin-bookings', 'Admin booking endpoints')
        .addTag('notifications', 'Push notification endpoints')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(process.env.PORT ?? 3000);
    console.log(`Application is running on: http://localhost:${process.env.PORT ?? 3000}`);
    console.log(`Swagger documentation: http://localhost:${process.env.PORT ?? 3000}/api`);
}
bootstrap().catch((error) => {
    console.error('Failed to start application:', error);
    process.exit(1);
});
//# sourceMappingURL=main.js.map