import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleController } from './article/article.controller';
import { ArticleService } from './article/article.service';
import { DatabaseModule } from './database/database.module';
import { AdminController } from './admin/admin.controller';
import { AdminService } from './admin/admin.service';
import { AdminModule } from './admin/admin.module';
import { ArticleModule } from './article/article.module';
import { SessionAuthGuard } from './auth/session-auth-guard';
import { CookieSerializer } from './auth/cookie-serializer';
import { SessionGuard } from './auth/session-guard';
import { SessionStore } from './auth/session-store';
import { LocalStrategy } from './auth/local-strategy';
import { AuthService } from './auth/auth-service';

@Module({
  imports: [DatabaseModule, AdminModule, ArticleModule],
  controllers: [AppController, ArticleController, AdminController],
  providers: [AppService, ArticleService, AdminService,
    SessionAuthGuard,
    AuthService,
    CookieSerializer,
    SessionGuard,
    LocalStrategy,
    SessionStore,
  ],
})
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
export class AppModule {}
