
import { Sequelize } from 'sequelize-typescript';
import { Article } from '../article/article.entity';
import { AdminModel } from '../admin/admin.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '123456',
        database: 'community',
      });
      sequelize.addModels([Article, AdminModel]);
      await sequelize.sync({
        alter: true,
        force: false,
        logging: true,
      })
        .then(() => {
          console.log('database sync success')
        })
        .catch((err) => {
          console.error(err)
          process.exit(1)
        });
      return sequelize;
    },
  },
];
