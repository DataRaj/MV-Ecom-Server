// import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
// import { AuthService } from './user-auth.service';

// @Injectable()
// export class UserAuthMiddleware implements NestMiddleware {
//   constructor(private readonly authService: AuthService) {}

//   async use(req, res, next) {
//     const authKey = req.cookies?.auth_key;
//     if (!authKey) throw new UnauthorizedException('Not authenticated');

//     try {
//       await this.authService.verifySession(authKey, res);
//       next();
//     } catch (err) {
//       throw new UnauthorizedException('Invalid or expired session');
//     }
//   }
// }
