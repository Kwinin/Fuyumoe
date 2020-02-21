import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ArticleService } from './article.service';
import { SessionGuard } from '../auth/session-guard';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
  @Get('list')
  getList() {
    return this.articleService.getList();
  }

  @UseGuards(SessionGuard)
  @Post('add')
  add(@Body() data){
    return this.articleService.add(data)
  }

  @Get('getById')
  getById(@Query() id) {
    return this.articleService.getById(id)
  }

}
