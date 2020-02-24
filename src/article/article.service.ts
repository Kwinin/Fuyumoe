import { Inject, Injectable, Query } from '@nestjs/common';
import { Article } from './article.entity';

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
    })
    return article
  }

  async getById(id): Promise<Article> {
    const article = await this.articleRepository.findByPk(id)
    return article
  }
}
