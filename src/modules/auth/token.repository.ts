import { Injectable } from '@nestjs/common';
import {
  SaveAccessTokenPayload,
  SaveRefreshTokenPayload,
} from './types/token.types';

@Injectable()
export class TokenRepository {
  private accessTokenWhitelist: Map<string, string> = new Map();
  private refreshTokenWhitelist: Map<string, string> = new Map();

  constructor() {}

  async getAccessTokenFromWhitelist(userId: string): Promise<string | null> {
    return this.accessTokenWhitelist.get(userId) || null;
  }

  async deleteAccessTokenFromWhitelist(userId: string): Promise<boolean> {
    this.accessTokenWhitelist.delete(userId);
    return true;
  }

  async deleteRefreshTokenFromWhitelist(userId: string): Promise<boolean> {
    this.refreshTokenWhitelist.delete(userId);
    return true;
  }

  async getRefreshTokenFromWhitelist(userId: string): Promise<string | null> {
    return this.refreshTokenWhitelist.get(userId) || null;
  }

  async saveAccessTokenToWhitelist(
    payload: SaveAccessTokenPayload,
  ): Promise<boolean> {
    const { userId, accessToken } = payload;
    this.accessTokenWhitelist.set(userId, accessToken);
    return true;
  }

  async saveRefreshTokenToWhitelist(
    payload: SaveRefreshTokenPayload,
  ): Promise<boolean> {
    const { userId, refreshToken } = payload;
    this.refreshTokenWhitelist.set(userId, refreshToken);
    return true;
  }
}
