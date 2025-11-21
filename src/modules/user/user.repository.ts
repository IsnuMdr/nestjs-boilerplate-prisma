import { PrismaService } from '@providers/prisma';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import UserEntity from './entities/user.entity';
import { PaginatedResult, PaginationService } from '@providers/pagination';

@Injectable()
export class UserRepository {
  constructor(
    private prisma: PrismaService,
    private paginationService: PaginationService,
  ) {}

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async findOne(where: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return this.prisma.user.findUnique({ where });
  }

  async findAll(
    where: Prisma.UserWhereInput,
    orderBy: Prisma.UserOrderByWithRelationInput,
    optionsPage: { page: number; perPage: number },
  ): Promise<PaginatedResult<User>> {
    return this.paginationService.paginate<User>(this.prisma.user, {
      where,
      orderBy,
      page: optionsPage.page,
      perPage: optionsPage.perPage,
    });
  }

  async update(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }
}
