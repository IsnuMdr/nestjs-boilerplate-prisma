import {
  Injectable,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserEntity } from "./entities/user.entity";

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    // Check if user with email already exists
    const existingUser = await this.usersRepository.findByEmail(
      createUserDto.email
    );
    if (existingUser) {
      throw new ConflictException(
        `User with email ${createUserDto.email} already exists`
      );
    }

    // In a real application, you would hash the password here
    // const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = await this.usersRepository.create({
      ...createUserDto,
      password: createUserDto.password, // Replace with hashedPassword in real application
    });

    return new UserEntity(user);
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.usersRepository.findAll();
    return users.map((user) => new UserEntity(user));
  }

  async findOne(id: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return new UserEntity(user);
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return new UserEntity(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    // Check if user exists
    await this.findOne(id);

    // If updating email, check if new email is already taken
    if (updateUserDto.email) {
      const userWithEmail = await this.usersRepository.findByEmail(
        updateUserDto.email
      );
      if (userWithEmail && userWithEmail.id !== id) {
        throw new ConflictException(
          `User with email ${updateUserDto.email} already exists`
        );
      }
    }

    // In a real application, if password is provided, you would hash it before updating
    // if (updateUserDto.password) {
    //   updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    // }

    const updatedUser = await this.usersRepository.update(id, updateUserDto);
    return new UserEntity(updatedUser);
  }

  async remove(id: string): Promise<UserEntity> {
    // Check if user exists
    await this.findOne(id);

    const deletedUser = await this.usersRepository.remove(id);
    return new UserEntity(deletedUser);
  }
}
