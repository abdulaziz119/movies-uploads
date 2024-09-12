import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { UploadService } from './upload.service';
import { PaginateFindAllDto, ParamIdDto, SingleResponse } from '../../utils/dto/paginate.dto';
import { PaginationResponse } from '../../utils/pagination.response';
import { UploadEntity } from '../../entity/upload.entity';

@Controller('/frontend/upload')
export class UploadFrontendController {
  constructor(private readonly uploadService: UploadService) {}

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
}
