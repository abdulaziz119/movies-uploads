import { Module } from '@nestjs/common';
import { ErrorService } from '../../utils/error.service';
import { DatabaseModule } from '../../database/database.module';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { uploadProviders } from './upload.providers';
import { UploadFrontendController } from './upload.frontend.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [UploadController, UploadFrontendController],
  providers: [...uploadProviders, ErrorService, UploadService],
  exports: [UploadService],
})
export class UploadModule {}
