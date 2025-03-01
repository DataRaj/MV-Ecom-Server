import { Module } from '@nestjs/common';
import { TwilioService } from 'src/common/twilio/twilio.service';
import { DatabaseModule } from 'src/database/database.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [DatabaseModule], // ✅ Ensure TwilioModule is imported
  controllers: [AuthController],
  providers: [AuthService, TwilioService],
  exports: [AuthService],
})
export class UserAuthModule {}
