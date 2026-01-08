"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentUser = void 0;
const common_1 = require("@nestjs/common");
exports.CurrentUser = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    if (!request.user) {
        throw new Error('User not found in request. Make sure JwtAuthGuard is applied.');
    }
    return request.user;
});
//# sourceMappingURL=current-user.decorator.js.map