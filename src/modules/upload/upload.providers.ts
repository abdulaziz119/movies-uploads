import { DataSource } from 'typeorm';
import { MODELS, UZUM_MARKET_SOURCE } from '../../constants';
import { UploadEntity } from '../../entity/upload.entity';

export const uploadProviders = [
  {
    provide: MODELS.UPLOADS,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UploadEntity),
    inject: [UZUM_MARKET_SOURCE],
  },
];
