import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  Request,
  UseFilters,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { SessionGuard } from '../auth/session-guard';
import { Article } from './article.entity';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('article')
@ApiTags('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
  @Get('list')
  @ApiQuery({ name: 'pageSize', required: false})
  @ApiQuery({ name: 'pageNumber', required: false})
  getList(@Query('pageSize') pageSize, @Query('pageNumber') pageNumber) {
    return this.articleService.getListByPage(pageSize, pageNumber);
  }

  @UseGuards(SessionGuard)
  @Post('add')
  add(@Request() req){
    return this.articleService.add({...req.body, adminId: req.session.admin.id})
  }

  @Get('getById')
  @ApiQuery({ name: 'id'})
  getById(@Query('id') id): Promise<Article> {
    return this.articleService.getById(id)
  }

  @UseGuards(SessionGuard)
  @Delete('del')
  remove(@Query('id') id){
    return this.articleService.delById(id)
  }

  @UseGuards(SessionGuard)
  @Patch('update')
  update(@Body() data){
    return this.articleService.updateById(data)
  }
}
