import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';
import { AuthController } from './auth.controller';
import { UserRepository } from '@modules/user/user.repository';


@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService, TokenService, UserRepository],
  exports: [AuthService],
})
export class AuthModule {}
