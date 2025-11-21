import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AccessRefreshTokens, UserPayload } from './types/auth.types';
import { JwtConfig } from '@config/types/config.type';

@Injectable()
export class TokenService {
  jwtConfig: JwtConfig;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtConfig = this.configService.get('jwt');
  }

  /**
   * Sign and create JWT tokens (stateless - no Redis whitelist)
   */
  async sign(payload: UserPayload): Promise<AccessRefreshTokens> {
    const accessToken = this.createJwtAccessToken(payload);
    const refreshToken = this.createJwtRefreshToken(payload);

    return {
      accessToken,
      refreshToken,
    };
  }

  async login(payload: UserPayload): Promise<AccessRefreshTokens> {
    return this.sign(payload);
  }

  /**
   * Refresh tokens (stateless)
   */
  async refreshTokens(refreshToken: string): Promise<AccessRefreshTokens> {
    const payload: UserPayload = await this.jwtService.verifyAsync(refreshToken, {
      secret: this.jwtConfig.refreshToken,
    });

    const userId = payload.id;
    if (!userId) throw new UnauthorizedException('User id is missing');

    const _payload: UserPayload = {
      id: payload.id,
      name: payload.name,
      email: payload.email,
      role: payload.role,
    };

    const _accessToken = this.createJwtAccessToken(_payload);
    const _refreshToken = this.createJwtRefreshToken(_payload);

    return {
      accessToken: _accessToken,
      refreshToken: _refreshToken,
    };
  }

  /**
   * Logout (with stateless JWT, this is client-side only)
   * The token remains valid until expiration
   */
  async logout(accessToken: string): Promise<void> {
    // In stateless JWT, logout is handled client-side by removing the token
    // If you need server-side logout, you would need to implement a token blacklist
    console.log('Logout called - client should remove token');
  }

  async isPasswordCorrect(dtoPassword: string, password: string): Promise<boolean> {
    const adjustHash = (hash: string) => hash.replace(/^\$2y\$/, '$2b$');
    const hashedPassword = adjustHash(password);
    return bcrypt.compare(dtoPassword, hashedPassword);
  }

  createJwtAccessToken(payload: UserPayload): string {
    return this.jwtService.sign(payload, {
      expiresIn: this.jwtConfig.jwtExpAccessToken,
      secret: this.jwtConfig.accessToken,
    });
  }

  createJwtRefreshToken(payload: UserPayload): string {
    return this.jwtService.sign(payload, {
      expiresIn: this.jwtConfig.jwtExpRefreshToken,
      secret: this.jwtConfig.refreshToken,
    });
  }

  createJwtAccessTokenPhone(payload: UserPayload): string {
    return this.jwtService.sign(payload, {
      expiresIn: this.jwtConfig.jwtExpAccessToken,
      secret: this.jwtConfig.accessToken,
    });
  }

  createJwtRefreshTokenPhone(payload: UserPayload): string {
    return this.jwtService.sign(payload, {
      expiresIn: this.jwtConfig.jwtExpRefreshToken,
      secret: this.jwtConfig.refreshToken,
    });
  }
}
