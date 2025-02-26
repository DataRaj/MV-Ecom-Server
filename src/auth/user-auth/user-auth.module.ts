import { Module } from '@nestjs/common';
import { UserAuthController } from './user-auth.controller';
import { UserAuthService } from './user-auth.service';

@Module({
    imports: [],
    controllers: [UserAuthController],
    providers: [UserAuthService],
    exports: [UserAuthController, UserAuthService],
})
export class UserAuthModule {}
