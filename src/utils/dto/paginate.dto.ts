import { IsDefined, IsString } from 'class-validator';
export class NameDto {
  @IsDefined()
  @IsString()
  ru: string;
  @IsDefined()
  @IsString()
  en: string;
  @IsDefined()
  @IsString()
  uz: string;
}
export class PaginateParamsDto {
  @IsDefined()
  page: number;
  @IsDefined()
  limit: number;
  @IsDefined()
  user_id: number;
}

export class PaginateFindAllDto {
  @IsDefined()
  page: number;
  @IsDefined()
  limit: number;
}

export class ParamIdDto {
  @IsDefined()
  id: number;
}

export class ParamEmailDto {
  @IsDefined()
  email: number;
}

export interface SingleResponse<T> {
  result: T;
}
