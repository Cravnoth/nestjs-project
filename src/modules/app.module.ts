import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@modules/env/config.module';
import { DatabaseModule } from '@modules/database/database.module';
import { UserModule } from './entities/user.module';
import { LoggingMiddleware } from '@shared/middlewares/logging.middleware';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ErrorInterceptor } from '@shared/interceptors/error.interceptor';
import { HealthCheckModule } from './healthCheck/user.module';

@Module({
  imports: [ConfigModule, DatabaseModule, UserModule, HealthCheckModule],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
