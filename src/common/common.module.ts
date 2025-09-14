import { Module, RequestMethod } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ApiKeyGuard } from './guards/api-key/api-key.guard';
import { ConfigModule } from '@nestjs/config';
import { MiddlewareConfigProxy, MiddlewareConsumer } from '@nestjs/common/interfaces';
import { LoggingMiddleware } from './middleware/logging/logging.middleware';
import { NestModule } from '@nestjs/common/interfaces';

@Module({
    imports: [ConfigModule],
    providers:[{ provide: APP_GUARD, useClass: ApiKeyGuard}],
})
export class CommonModule implements NestModule{
    configure(consumer: MiddlewareConsumer){
        consumer.apply(LoggingMiddleware).forRoutes('*');
    }
} 