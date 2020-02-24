import { Body, Controller, Get, Post, Query, UseGuards, Request} from '@nestjs/common';
import { ArticleService } from './article.service';
import { SessionGuard } from '../auth/session-guard';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
  @Get('list')
  getList(@Query('pageSize') pageSize, @Query('pageNumber') pageNumber) {
    return this.articleService.getListByPage(pageSize, pageNumber);
  }

  @UseGuards(SessionGuard)
  @Post('add')
  add(@Request() req){
    return this.articleService.add({...req.body, adminId: req.session.admin.id})
  }

  @Get('getById')
  getById(@Query('id') id) {
    return this.articleService.getById(id)
  }

}
