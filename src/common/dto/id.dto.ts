import { IsCardinal } from '../decorators/is-cardinal.decorator.js';

export class IdDto {
  @IsCardinal()
  readonly id: number;
}
