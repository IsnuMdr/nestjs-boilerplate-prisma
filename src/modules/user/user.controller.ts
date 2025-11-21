import {
  Controller,
  Get,
  Query,
  UseGuards,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import UserEntity from '@modules/user/entities/user.entity';
import Serialize from '@decorators/serialize.decorator';
import { User } from '@prisma/client';
import ApiOkBaseResponse from '@decorators/api-ok-base-response.decorator';
import ApiBaseResponses from '@decorators/api-base-response.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SearchUserDto } from './dto/search-user.dto';
import { PaginatedResult } from '@providers/pagination';

@ApiTags('Users')
@ApiBearerAuth()
@ApiBaseResponses()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOkBaseResponse({ dto: UserEntity })
  @Serialize(UserEntity)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOkBaseResponse({ dto: UserEntity, isArray: true, meta: true })
  @Serialize(UserEntity)
  async findAll(
    @Query() searchDto: SearchUserDto,
  ): Promise<PaginatedResult<User>> {
    return this.userService.findAll(searchDto);
  }

  @Get(':id')
  @ApiOkBaseResponse({ dto: UserEntity })
  @Serialize(UserEntity)
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiOkBaseResponse({ dto: UserEntity })
  @Serialize(UserEntity)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOkBaseResponse({ dto: UserEntity })
  @Serialize(UserEntity)
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
