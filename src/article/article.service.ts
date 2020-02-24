import { Inject, Injectable, Query } from '@nestjs/common';
import { Article, EnumEnableType } from './article.entity';

@Injectable()
export class ArticleService {
  constructor(@Inject('ARTICLE_REPOSITORY') private readonly articleRepository: typeof Article) {}

  async add(data: Partial<Article>): Promise<Partial<Article>>{
    const article = await this.articleRepository.create(data)
    return article
  }

  async getListByPage(pageSize = 10, pageNumber = 1): Promise<{rows: Article[], count:number}> {
    const article = await this.articleRepository.findAndCountAll({
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
    await this.articleRepository.update({...data}, {where: {id: data.id}})
    return this.articleRepository.findByPk(data.id)
  }
}
