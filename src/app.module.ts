import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserAuthModule } from './auth/auth.module';
import { TwilioModule } from './common/twilio/twilio.module';
import { TwilioService } from './common/twilio/twilio.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserAuthModule,
    TwilioModule,
  ],
  controllers: [AppController],
  providers: [AppService, TwilioService],
})
export class AppModule {}
