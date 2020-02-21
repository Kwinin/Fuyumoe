import { Body, Controller, Get, Post } from '@nestjs/common';
import { ArticleService } from './article.service';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get('list')
  getList() {
    return this.articleService.getList();
  }

  @Post('add')
  add(@Body() data){
    return this.articleService
  }
}
