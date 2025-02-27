import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { UserAuthService } from './user-auth.service';

@Controller('auth')
export class UserAuthController {
  constructor(private readonly userAuthService: UserAuthService) {}

  @Post('login')
  async login(
    @Body() body: { userId: string },
    @Res({ passthrough: true }) res: FastifyReply,
  ) {
    return this.userAuthService.login(body.userId, res);
  }

  @Post('verify-session')
  async verifySession(
    @Req() req: FastifyRequest,
    @Res({ passthrough: true }) res: FastifyReply,
  ) {
    const authKey = req.cookies.auth_key; // ✅ Correct way to get cookies in Fastify
    return this.userAuthService.verifySession(authKey!, res);
  }

  @Post('logout')
  async logout(
    @Req() req: FastifyRequest,
    @Res({ passthrough: true }) res: FastifyReply,
  ) {
    const authKey = req.cookies.auth_key;
    return this.userAuthService.logout(authKey!, res);
  }
}
