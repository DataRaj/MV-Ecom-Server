import { Module } from '@nestjs/common';
import { UserAuthModule } from './user-auth/user-auth.module';
import { UserAuthController } from './user-auth/user-auth.controller';

@Module({

  imports: [UserAuthModule],
  exports: [UserAuthModule],
})
export class AuthModule {}
