import { Inject, Injectable } from '@nestjs/common';
import { Article } from './article.entity';

@Injectable()
export class ArticleService {
  constructor(@Inject('ARTICLE_REPOSITORY') private readonly articleRepository: typeof Article) {}

  async add(data: Partial<Article>): Promise<Partial<Article>>{
    const article = await this.articleRepository.create(data)
    return article
  }

  async getList(): Promise<Article[]> {
    const article = await this.articleRepository.findAll()
    return article
  }

  async getById(id): Promise<Article> {
    const article = await this.articleRepository.findByPk(id)
    return article
  }
}
