import { IsOptional } from 'class-validator';
import { IsCardinal } from '../decorators/validators/is-cardinal.decorator.js';

export class PaginationDto {
  @IsOptional()
  @IsCardinal()
  readonly limit: number;

  @IsOptional()
  @IsCardinal()
  readonly offset: number;
}
