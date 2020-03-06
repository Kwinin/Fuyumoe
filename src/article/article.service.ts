import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Article, EnumEnableType } from './article.entity';
import { ApiException } from '../common/exceptions/api.exception';
import { ApiErrorCode } from '../common/enums/error_code';
import { literal } from 'sequelize';

@Injectable()
export class ArticleService {
  constructor(@Inject('ARTICLE_REPOSITORY') private readonly articleRepository: typeof Article) {}

  async add(data: Partial<Article>): Promise<Partial<Article>>{
    if(data.title) {
      const title = await this.articleRepository.findOne({where: {title: data.title, enableType: EnumEnableType.enable}})
      if(title) {
        throw new ApiException('The current title already exists', ApiErrorCode.ARTICLE_TITLE_EXIST, HttpStatus.BAD_REQUEST);
      }
    }
    return this.articleRepository.create(data)
  }

  async getListByPage(pageSize = 10, pageNumber = 1): Promise<{rows: Article[], count:number}> {
    const article = await this.articleRepository.findAndCountAll({
      order: [['createdAt', 'DESC']],
      offset: Number((pageNumber - 1) * pageSize),
      limit: Number(pageSize),
      where: {
        enableType: EnumEnableType.enable
      }
    })
    return article
  }

  async getById(id): Promise<Article> {
    const article = await this.articleRepository.findByPk(id)
    await this.articleRepository.update({
      clickNum: literal('clickNum+1')
    }, {
      where: {id}
    })
    return article
  }

  async delById(id){
    const  result = await this.articleRepository.update({
      enableType: EnumEnableType.delete
    }, {
      where: {id}
    })
    return !!result
  }

  async updateById(data: Partial<Article>){
    if(data.title){
      const title = await this.articleRepository.findOne({where: {title: data.title, enableType: EnumEnableType.enable}})
      if(title) {
        throw new ApiException('The current title already exists', ApiErrorCode.ARTICLE_TITLE_EXIST, HttpStatus.BAD_REQUEST);
      }
    }
    await this.articleRepository.update({...data}, {where: {id: data.id}})
    return this.articleRepository.findByPk(data.id)
  }
}
