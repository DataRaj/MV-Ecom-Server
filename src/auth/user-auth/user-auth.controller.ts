import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { UserAuthService } from './user-auth.service';
import { Request, Response } from 'express';

@Controller('auth')
export class UserAuthController {
  constructor(private readonly userAuthService: UserAuthService) {}

  @Post('login')
  async login(@Req() req: Request, @Res() res: Response) {
    const { userId } = req.body; // Assume you verify OTP before this
    return this.userAuthService.login(userId, res);
  }

  @Post('verify-session')
  async verifySession(@Req() req: Request, @Res() res: Response) {
    const authKey = req.cookies.auth_key;
    return this.userAuthService.verifySession(authKey, res);
  }

  @Post('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    const authKey = req.cookies.auth_key;
    return this.userAuthService.logout(authKey, res);
  }
}
