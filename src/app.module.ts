import appConfig from '@config/app.config';
import jwtConfig from '@config/jwt.config';
import redisConfig from '@config/redis.config';
import swaggerConfig from '@config/swagger.config';
import { LoggingInterceptor } from '@common/interceptors/logging.interceptor';
import { AuthGuard } from '@modules/auth/auth.guard';
import { AuthModule } from '@modules/auth/auth.module';
import HealthModule from '@modules/health/health.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PrismaModule } from '@providers/prisma';
import { PaginationModule } from '@providers/pagination';
import { UserModule } from '@modules/user/user.module';


@Module({
  controllers: [],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, jwtConfig, redisConfig, swaggerConfig],
    }),
    PrismaModule.forRoot({
      isGlobal: true,
    }),
    PaginationModule,
    // RedisModule,
    JwtModule.register({
      global: true,
    }),
    HealthModule,
    AuthModule,
    UserModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}


