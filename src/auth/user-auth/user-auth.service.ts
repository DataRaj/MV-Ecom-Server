import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { userAuth } from '../entities/user-auth.entity';
import { randomUUID } from 'crypto';
import { Response } from 'express';
import { DRIZZLE } from 'src/database/drizzle.constant';
import { DrizzleDatabase } from 'src/database/database.provider';

@Injectable()
export class UserAuthService {
  constructor(
    @Inject(DRIZZLE)
    private readonly db: DrizzleDatabase
    
  ) {}
  private readonly COOKIE_MAX_AGE = 30 * 24 * 60 * 60 * 1000; // 30 days

  async login(userId: string, res: Response) {
    const authKey = randomUUID();
    const expiresAt = new Date(Date.now() + this.COOKIE_MAX_AGE);

    await this.db.insert(userAuth).values({ userId, authKey, expiresAt, isActive: true });

    this.setAuthCookie(res, authKey);
    return { message: 'Logged in successfully' };
  }

  async verifySession(authKey: string, res: Response) {
    const session = await this.db.select().from(userAuth).where((eq(userAuth.authKey, authKey), eq(userAuth.isActive, true))).then((rows) => rows[0]);


    if (!session || new Date() > session.expiresAt) throw new UnauthorizedException('Session expired');

    // **Refresh expiration if less than 3 days remain**
    if (new Date(session.expiresAt).getTime() - Date.now() < 3 * 24 * 60 * 60 * 1000) {
      const newExpiry = new Date(Date.now() + this.COOKIE_MAX_AGE);
      await this.db.update(userAuth).set({ expiresAt: newExpiry }).where(eq(userAuth.authKey, authKey));

      this.setAuthCookie(res, authKey);
    }

    return { message: 'Session verified' };
  }

  async logout(authKey: string, res: Response) {
    await this.db.update(userAuth).set({ isActive: false }).where(eq(userAuth.authKey, authKey));
    res.clearCookie('auth_key');
    return { message: 'Logged out' };
  }

  private setAuthCookie(res: Response, authKey: string) {
    res.cookie('auth_key', authKey, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: this.COOKIE_MAX_AGE,
    });
  }
}
