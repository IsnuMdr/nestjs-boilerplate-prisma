import { Injectable } from '@nestjs/common';
import { UserRepository } from '@modules/user/user.repository';
import { Prisma, User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SearchUserDto } from './dto/search-user.dto';
import { PaginatedResult } from '@providers/pagination';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepository.create(createUserDto);
  }

  /**
   * @desc Find all users with search, filters, sorting, and pagination
   * @param searchDto - DTO containing search parameters
   */
  findAll(
    searchDto: SearchUserDto,
  ): Promise<PaginatedResult<User>> {
    const { search, role, is_active, page, perPage, sortBy, sortOrder } = searchDto;

    const whereConditions: Prisma.UserWhereInput[] = [];

    if (search) {
      whereConditions.push({
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
        ],
      });
    }

    if (role) {
      whereConditions.push({ role });
    }

    if (is_active !== undefined) {
      whereConditions.push({ is_active });
    }

    const where: Prisma.UserWhereInput = whereConditions.length > 0
      ? { AND: whereConditions }
      : {};

    const orderBy: Prisma.UserOrderByWithRelationInput = {
      [sortBy]: sortOrder,
    };

    return this.userRepository.findAll(where, orderBy, { page, perPage });
  }

  findOne(id: string) {
    return this.userRepository.findOne({ id });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.update({
      where: { id },
      data: updateUserDto,
    });
  }

  remove(id: string) {
    return this.userRepository.delete({ id });
  }
}
