import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { base64decode } from '@common/utilities/base64encryption';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { AccessRefreshTokens } from './types/auth.types';
import UserEntity from '@modules/user/entities/user.entity';
import { UserRepository } from '@modules/user/user.repository';
import { INVALID_CREDENTIALS, USER_EXISTS, USER_NOT_FOUND } from '@constants/error.constant';
import { TokenService } from './token.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenService: TokenService,
  ) {}

  /**
   * @desc Sign up a user
   * @returns UserEntity - The created user
   * @throws ConflictException - User already exists
   * @param signUpDto - User credentials
   */
  async signUp(signUpDto: SignUpDto): Promise<User> {
    if (signUpDto.password !== signUpDto.password_confirmation) {
      throw new ForbiddenException('Passwords do not match');
    }

    const existingUser = await this.userRepository.findOne({
      email: signUpDto.email,
    });

    if (existingUser) {
      throw new ConflictException(USER_EXISTS);
    }

    const hashedPassword = await bcrypt.hash(signUpDto.password, 10);

    const newUser = await this.userRepository.create({
      name: signUpDto.name,
      email: signUpDto.email,
      password: hashedPassword,
      role: 'admin',
    });

    return newUser;
  }

  /**
   * @desc Sign in a user
   * @returns AccessRefreshTokens - Access and refresh tokens
   * @throws NotFoundException - User not found
   * @throws UnauthorizedException - Invalid credentials
   * @param signInDto - User credentials
   */
  async signIn(signInDto: SignInDto, userAgent: string): Promise<AccessRefreshTokens> {
    const testUser: User = await this.userRepository.findOne({
      email: signInDto.email,
    });

    if (!testUser) throw new NotFoundException(USER_NOT_FOUND);

    if (!(await this.tokenService.isPasswordCorrect(signInDto.password, testUser.password))) {
      // 401001: Invalid credentials
      throw new UnauthorizedException(INVALID_CREDENTIALS);
    }

    return this.tokenService.sign({
      id: testUser.id,
      name: testUser.name,
      email: testUser.email,
      role: testUser.role,
    });
  }

  async getAccessTokenClientAuth(token: string): Promise<boolean> {
    const clientSecret = base64decode(token);
    const username = clientSecret.split(':')[0];
    const password = clientSecret.split(':')[1];

    if (
      username === process.env.BASIC_AUTH_USERNAME &&
      password === process.env.BASIC_AUTH_PASSWORD
    ) {
      return true;
    }

    return false;
  }
}
