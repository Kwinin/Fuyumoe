import { Sequelize } from 'sequelize-typescript';
import { Article } from '../article/article.entity';
import { AdminModel } from '../admin/admin.entity';
import * as config from 'config'

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize(config.get('mysql'));
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
