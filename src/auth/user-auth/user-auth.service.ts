import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { eq } from 'drizzle-orm';
import { FastifyReply } from 'fastify';
import { DrizzleDatabase } from 'src/database/database.provider';
import { DRIZZLE } from 'src/database/drizzle.constant';
import { userAuth } from '../entities/user-auth.entity';

@Injectable()
export class UserAuthService {
  private readonly COOKIE_NAME = 'auth_key';
  private readonly COOKIE_MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

  constructor(@Inject(DRIZZLE) private readonly db: DrizzleDatabase) {}

  async login(userId: string, res: FastifyReply) {
    const authKey = randomUUID();
    const expiresAt = new Date(Date.now() + this.COOKIE_MAX_AGE_MS);

    await this.db
      .insert(userAuth)
      .values({ userId, authKey, expiresAt, isActive: true });

    this.setAuthCookie(res, authKey);
    return { message: 'Logged in successfully' };
  }

  async verifySession(authKey: string, res: FastifyReply) {
    const session = await this.findActiveSession(authKey);

    if (!session) {
      throw new UnauthorizedException('Session expired');
    }

    // Refresh cookie if less than 3 days left
    if (session.expiresAt.getTime() - Date.now() < 3 * 24 * 60 * 60 * 1000) {
      await this.refreshSession(authKey, res);
    }

    return { message: 'Session verified' };
  }

  async logout(authKey: string, res: FastifyReply) {
    await this.db
      .update(userAuth)
      .set({ isActive: false })
      .where(eq(userAuth.authKey, authKey));
    this.clearAuthCookie(res);
    return { message: 'Logged out' };
  }

  /** Private Helpers */
  private async findActiveSession(authKey: string) {
    return this.db
      .select()
      .from(userAuth)
      .where(eq(eq(userAuth.authKey, authKey), eq(userAuth.isActive, true)))
      .then((rows) => rows[0] || null);
  }

  private async refreshSession(authKey: string, res: FastifyReply) {
    const newExpiry = new Date(Date.now() + this.COOKIE_MAX_AGE_MS);
    await this.db
      .update(userAuth)
      .set({ expiresAt: newExpiry })
      .where(eq(userAuth.authKey, authKey));
    this.setAuthCookie(res, authKey);
  }

  private setAuthCookie(res: FastifyReply, authKey: string) {
    res.setCookie(this.COOKIE_NAME, authKey, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
      maxAge: this.COOKIE_MAX_AGE_MS / 1000, // Fastify uses seconds
    });
  }

  private clearAuthCookie(res: FastifyReply) {
    res.clearCookie(this.COOKIE_NAME, { path: '/' });
  }
}
