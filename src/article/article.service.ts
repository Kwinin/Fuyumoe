import { Injectable } from '@nestjs/common';

@Injectable()
export class ArticleService {
  getList(): string {
    return 'Hello getList!';
  }
}
