"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const logger = new common_1.Logger('Bootstrap');
    logger.log('Starting application...');
    try {
        const app = await core_1.NestFactory.create(app_module_1.AppModule);
        await app.listen(3000);
        logger.log(`Application is running on: ${await app.getUrl()}`);
    }
    catch (error) {
        logger.error('Failed to start application:', error);
    }
}
bootstrap();
//# sourceMappingURL=main.js.map