import {
  Body,
  Controller,
  FileTypeValidator,
  HttpCode,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import {
  PaginateFindAllDto,
  ParamIdDto,
  SingleResponse,
} from '../../utils/dto/paginate.dto';
import { PaginationResponse } from '../../utils/pagination.response';
import { UploadEntity } from '../../entity/upload.entity';
import { DeleteResult } from 'typeorm';

@Controller('/dashboard/upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg|svg|webp)' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 10 }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    if (!file) {
      throw new Error('File is missing.');
    }
    const imagePath = await this.uploadService.uploadImage(file);
    return imagePath;
  }

  @Post('/findAll')
  @HttpCode(200)
  async findAll(
    @Body() payload: PaginateFindAllDto,
  ): Promise<PaginationResponse<UploadEntity[]>> {
    return await this.uploadService.findAll(payload);
  }

  @Post('/findOne')
  @HttpCode(200)
  async findOne(
    @Body() payload: ParamIdDto,
  ): Promise<SingleResponse<UploadEntity>> {
    return await this.uploadService.findOne(payload);
  }

  @Post('/delete')
  @HttpCode(204)
  async delete(@Body() payload: ParamIdDto): Promise<DeleteResult> {
    return await this.uploadService.delete(payload);
  }
}
