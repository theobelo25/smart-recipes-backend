import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { User } from '../../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { PaginationDto } from '../../common/dto/pagination.dto.js';
import { DEFAULT_PAGE_SIZE } from '../../common/util/common.constants.js';
import { genSalt, hash } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User | null> {
    const { password } = createUserDto;
    const hashedPassword = await this.hashPassword(password);
    const user = await this.prisma.user.create({
      data: { ...createUserDto, password: hashedPassword },
    });

    return user;
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit, offset } = paginationDto;

    return await this.prisma.user.findMany({
      skip: offset,
      take: limit ?? DEFAULT_PAGE_SIZE.USERS,
    });
  }

  async findOne(id: number) {
    return await this.prisma.user.findUniqueOrThrow({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { password } = updateUserDto;
    const hashedPassword = password && (await this.hashPassword(password));

    const user = await this.prisma.user.update({
      where: { id },
      data: { ...updateUserDto, password: hashedPassword },
    });
    if (!user) throw new NotFoundException('User not found!');

    return user;
  }

  async remove(id: number) {
    return await this.prisma.user.delete({ where: { id } });
  }

  private async hashPassword(password: string) {
    const salt = await genSalt(12);
    return hash(password, salt);
  }
}
