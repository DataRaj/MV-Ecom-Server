import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UserAuthController } from './user-auth.controller';
import { UserAuthService } from './user-auth.service';
// import { DRIZZLE } from 'src/database/drizzle.constant';

@Module({
  imports: [DatabaseModule],
  controllers: [UserAuthController],
  providers: [UserAuthService],
  exports: [UserAuthService],
})
export class UserAuthModule {}
