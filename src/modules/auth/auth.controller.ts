import { Controller, Post, Body, HttpCode, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { SignInDto } from '@modules/auth/dto/sign-in.dto';
import { SignUpDto } from '@modules/auth/dto/sign-up.dto';
import { SkipAuth } from '@modules/auth/skip-auth.guard';
import { AccessRefreshTokens } from './types/auth.types';
import ApiBaseResponses from '@decorators/api-base-response.decorator';
import UserEntity from '@modules/user/entities/user.entity';
import { User } from '@prisma/client';

@ApiTags('Auth')
@ApiBaseResponses()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: SignInDto })
  @SkipAuth()
  @HttpCode(200)
  @Post('signin')
  signIn(
    @Headers('user-agent') userAgent: string,
    @Body() signInDto: SignInDto,
  ): Promise<AccessRefreshTokens> {
    return this.authService.signIn(signInDto, userAgent);
  }

  @ApiBody({ type: SignUpDto })
  @SkipAuth()
  @HttpCode(201)
  @Post('signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<User> {
    return this.authService.signUp(signUpDto);
  }

  @Post('check')
  checkAuth(): string {
    return 'OK';
  }
}
