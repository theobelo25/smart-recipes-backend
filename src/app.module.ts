import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UsersModule } from './domain/users/users.module.js';
import { CommonModule } from './common/common.module.js';
import { PrismaModule } from './prisma/prisma.module.js';

@Module({
  imports: [UsersModule, CommonModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
