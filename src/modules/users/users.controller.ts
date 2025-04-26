import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  HttpStatus,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserEntity } from "./entities/user.entity";

@ApiTags("users")
@Controller("users")
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: "Create a new user" })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "User successfully created",
    type: UserEntity,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: "User with this email already exists",
  })
  create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all users" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Returns all users",
    type: [UserEntity],
  })
  findAll(): Promise<UserEntity[]> {
    return this.usersService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a user by id" })
  @ApiParam({ name: "id", description: "User ID" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Returns a user by id",
    type: UserEntity,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "User not found",
  })
  findOne(@Param("id") id: string): Promise<UserEntity> {
    return this.usersService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a user" })
  @ApiParam({ name: "id", description: "User ID" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "User successfully updated",
    type: UserEntity,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "User not found",
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: "Email already in use",
  })
  update(
    @Param("id") id: string,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<UserEntity> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a user" })
  @ApiParam({ name: "id", description: "User ID" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "User successfully deleted",
    type: UserEntity,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "User not found",
  })
  remove(@Param("id") id: string): Promise<UserEntity> {
    return this.usersService.remove(id);
  }
}
