import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
@Module({
  imports: [AuthModule, DatabaseModule, ConfigModule.forRoot({
    envFilePath: ['.env', '.env.development'],
  }), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {
  
}
