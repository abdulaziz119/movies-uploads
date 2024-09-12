import {
  Injectable,
  HttpException,
  HttpStatus,
  Inject,
  NotFoundException,
} from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs/promises';
import * as process from 'process';
import { MODELS } from '../../constants';
import { DeleteResult, Repository } from 'typeorm';
import { ErrorService } from '../../utils/error.service';
import { UploadEntity } from '../../entity/upload.entity';
import {
  PaginateFindAllDto,
  ParamIdDto,
  SingleResponse,
} from '../../utils/dto/paginate.dto';
import { PaginationResponse } from '../../utils/pagination.response';
import { getPaginationResponse } from '../../utils/pagination.builder';

@Injectable()
export class UploadService {
  constructor(
    @Inject(MODELS.UPLOADS)
    private readonly uploadRepo: Repository<UploadEntity>,
    readonly errorService: ErrorService,
  ) {}

  async uploadImage(file: Express.Multer.File) {
    try {
      const fileName = `${Date.now()}.jpg`;
      const uploadPath = path.join('uploads', 'images', fileName);
      const fullPath = path.resolve(process.cwd(), uploadPath);
      await fs.mkdir(path.dirname(fullPath), { recursive: true });
      await fs.writeFile(fullPath, file.buffer);
      const result = await this.uploadRepo.save({ url: uploadPath });
      `${process.env.BASE_URL}/${fileName}`;
      return { result: result };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Rasmni yuklashda xatolik yuz berdi',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(
    payload: PaginateFindAllDto,
  ): Promise<PaginationResponse<UploadEntity[]>> {
    const page: number = payload.page || 1;
    const limit: number = payload.limit || 10;
    const count: number = await this.uploadRepo.count();
    if (!count) return getPaginationResponse([], page, limit, count);
    const serverKeys: UploadEntity[] = await this.uploadRepo.find({
      where: {},
      skip: (page - 1) * limit,
      take: limit,
    });
    const convertedServerKeys = serverKeys.map((key) => ({
      ...key,
      id: Number(key.id),
    }));

    if (limit && !isNaN(page))
      return getPaginationResponse<UploadEntity>(
        convertedServerKeys,
        page,
        limit,
        count,
      );
  }

  async findOne(body: ParamIdDto): Promise<SingleResponse<UploadEntity>> {
    const { id } = body;
    try {
      const serverKeys = await this.uploadRepo.findOne({
        where: { id: id },
      });
      if (!serverKeys) {
        new NotFoundException(`Upload with ID ${id} not found`);
      }
      serverKeys.id = Number(serverKeys.id);
      return { result: serverKeys };
    } catch (error) {
      throw new HttpException(
        { message: `Failed get with ID ${id}`, error: error.detail },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(payload: ParamIdDto): Promise<DeleteResult> {
    const { id } = payload;
    return await this.uploadRepo.delete(id);
  }
}
