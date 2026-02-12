import { IsCardinal } from '../decorators/validators/is-cardinal.decorator.js';

export class IdDto {
  @IsCardinal()
  readonly id: number;
}
