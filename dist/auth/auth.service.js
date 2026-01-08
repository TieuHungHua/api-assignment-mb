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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = __importStar(require("bcrypt"));
const register_dto_1 = require("./dto/register.dto");
let AuthService = class AuthService {
    prisma;
    jwtService;
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async register(registerDto) {
        if (registerDto.password !== registerDto.confirmPassword) {
            throw new common_1.BadRequestException('Mật khẩu và xác nhận mật khẩu không khớp');
        }
        if (registerDto.role === register_dto_1.RegisterRole.student && !registerDto.studentId) {
            throw new common_1.BadRequestException('Mã sinh viên là bắt buộc cho tài khoản sinh viên');
        }
        const existingUsername = await this.prisma.user.findUnique({
            where: { username: registerDto.username },
        });
        if (existingUsername) {
            throw new common_1.ConflictException('Tên đăng nhập đã tồn tại');
        }
        const existingEmail = await this.prisma.user.findUnique({
            where: { email: registerDto.email },
        });
        if (existingEmail) {
            throw new common_1.ConflictException('Email đã được sử dụng');
        }
        const existingPhone = await this.prisma.user.findUnique({
            where: { phone: registerDto.phone },
        });
        if (existingPhone) {
            throw new common_1.ConflictException('Số điện thoại đã được sử dụng');
        }
        const hashedPassword = await bcrypt.hash(registerDto.password, 10);
        const user = await this.prisma.user.create({
            data: {
                username: registerDto.username,
                email: registerDto.email,
                phone: registerDto.phone,
                password: hashedPassword,
                role: registerDto.role,
                studentId: registerDto.studentId || null,
                displayName: registerDto.username,
            },
        });
        const payload = { sub: user.id, username: user.username, role: user.role };
        const access_token = await this.jwtService.signAsync(payload, {
            expiresIn: '7d',
        });
        const refresh_token = await this.jwtService.signAsync(payload, {
            expiresIn: '30d',
        });
        return {
            access_token,
            refresh_token,
            user: {
                id: user.id,
                username: user.username,
                displayName: user.displayName,
                avatar: user.avatar,
                role: user.role,
                email: user.email,
                studentId: user.studentId,
                classMajor: user.classMajor,
                dateOfBirth: user.dateOfBirth,
                gender: user.gender,
            },
        };
    }
    async login(loginDto) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { username: loginDto.username },
            });
            if (!user) {
                throw new common_1.UnauthorizedException('Tài khoản hoặc mật khẩu không đúng');
            }
            const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
            if (!isPasswordValid) {
                throw new common_1.UnauthorizedException('Tài khoản hoặc mật khẩu không đúng');
            }
            const payload = {
                sub: user.id,
                username: user.username,
                role: user.role,
            };
            const access_token = await this.jwtService.signAsync(payload, {
                expiresIn: '7d',
            });
            const refresh_token = await this.jwtService.signAsync(payload, {
                expiresIn: '30d',
            });
            return {
                access_token,
                refresh_token,
                user: {
                    id: user.id,
                    username: user.username,
                    displayName: user.displayName,
                    avatar: user.avatar,
                    role: user.role,
                    email: user.email,
                    studentId: user.studentId,
                    classMajor: user.classMajor,
                    dateOfBirth: user.dateOfBirth,
                    gender: user.gender,
                },
            };
        }
        catch (error) {
            if (error &&
                typeof error === 'object' &&
                'code' in error &&
                error.code === 'P1001') {
                const errorMessage = 'message' in error && typeof error.message === 'string'
                    ? error.message
                    : 'Unknown error';
                console.error('❌ Database connection error:', errorMessage);
                throw new common_1.BadRequestException('Không thể kết nối đến database. Vui lòng thử lại sau hoặc liên hệ quản trị viên.');
            }
            throw error;
        }
    }
    async validateUser(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                username: true,
                displayName: true,
                role: true,
                avatar: true,
                classMajor: true,
            },
        });
        return user;
    }
    async refreshToken(refreshToken) {
        try {
            const payload = await this.jwtService.verifyAsync(refreshToken);
            if (!payload || !payload.sub) {
                throw new common_1.UnauthorizedException('Refresh token không hợp lệ');
            }
            const user = await this.prisma.user.findUnique({
                where: { id: payload.sub },
            });
            if (!user) {
                throw new common_1.UnauthorizedException('User không tồn tại');
            }
            const newPayload = {
                sub: user.id,
                username: user.username,
                role: user.role,
            };
            const access_token = await this.jwtService.signAsync(newPayload, {
                expiresIn: '7d',
            });
            const new_refresh_token = await this.jwtService.signAsync(newPayload, {
                expiresIn: '30d',
            });
            return {
                access_token,
                refresh_token: new_refresh_token,
            };
        }
        catch (error) {
            if (error instanceof common_1.UnauthorizedException) {
                throw error;
            }
            throw new common_1.UnauthorizedException('Refresh token không hợp lệ hoặc đã hết hạn');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map