import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { articleProviders } from './article.provide';

@Module({
  imports: [DatabaseModule],
  controllers: [ArticleController],
  providers: [
    ArticleService,
    ...articleProviders,
  ],
  exports: [...articleProviders]
})
export class ArticleModule {}
