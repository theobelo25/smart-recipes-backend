import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UsersModule } from './domain/users/users.module.js';
import { CommonModule } from './common/common.module.js';
import { EnvModule } from './env/env.module.js';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UsersModule, CommonModule, EnvModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
