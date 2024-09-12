import 'reflect-metadata';
import { DataSource } from 'typeorm';
import {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASS,
  DB_DB,
} from '../utils/env';
import { UZUM_MARKET_SOURCE } from '../constants';
import { UploadEntity } from '../entity/upload.entity';

export const databaseProviders = [
  {
    provide: UZUM_MARKET_SOURCE,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: DB_HOST,
        port: DB_PORT,
        username: DB_USER,
        password: DB_PASS,
        database: DB_DB,
        synchronize: true,
        logging: false,
        schema: 'public',
        entities: [UploadEntity],
      });
      await dataSource.initialize();
      return dataSource;
    },
  },
];
