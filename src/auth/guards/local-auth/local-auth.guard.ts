import {
  BadRequestException,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from '../../dto/login.dto.js';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { type FastifyRequest } from 'fastify';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const body = plainToClass(LoginDto, request.body);
    const errors = await validate(body, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    if (errors.length) {
      const errorMessages = errors
        .flatMap(({ constraints }) => Object.values(constraints!))
        .join(', ');
      throw new BadRequestException(errorMessages);
    }

    const result = (await super.canActivate(context)) as boolean;

    return result;
  }
}
