import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleController } from './article/article.controller';
import { ArticleService } from './article/article.service';
import { DatabaseModule } from './database/database.module';
import { AdminController } from './admin/admin.controller';
import { AdminService } from './admin/admin.service';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [DatabaseModule, AdminModule],
  controllers: [AppController, ArticleController, AdminController],
  providers: [AppService, ArticleService, AdminService],
})
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
export class AppModule {}
