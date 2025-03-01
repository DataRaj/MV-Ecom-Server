import {
    ConflictException,
    Inject,
     
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
import { TwilioService } from 'src/common/twilio/twilio.service';
import { DrizzleDatabase } from 'src/database/database.provider';
import { DRIZZLE } from 'src/database/drizzle.constant';
import { SignUpDto, VerifyDto } from './dtos/user-auth.dto';
import { userAuth } from './entities/user-auth.entity';
@Injectable()
export class AuthService {
  constructor(
    @Inject(DRIZZLE)
    private readonly db: DrizzleDatabase,
    private readonly twilioService: TwilioService,
  ) {}

  async signUp(dto: SignUpDto) {
    const existingUser = await this.db
      .select()
      .from(userAuth)
      .where(
        and(
          eq(userAuth.phoneNumber, dto.phoneNumber),
          eq(userAuth.userType, dto.userType),
        ),
      );

    if (existingUser.length > 0) {
      throw new ConflictException(
        'Phone number already registered for this role.',
      );
    }

    const userId = `user_${Math.random().toString(36).substr(2, 9)}`;
    await this.db.insert(userAuth).values({
      id: userId,
      phoneNumber: dto.phoneNumber,
      provider: dto.provider,
      userType: dto.userType,
    });
    const client = this.twilioService.getClient();
    const from = this.twilioService.getTwilioPhoneNumber();
    // Send OTP using Twilio
    await client.messages.create({
      body: `Your verification code is ${''}`, // Replace with actual OTP logic
      from,
      to: dto.phoneNumber,
    });

    return { message: 'User registered successfully! OTP sent.', userId };
  }

  async verifyUser(dto: VerifyDto) {
    const user = await this.db
      .select()
      .from(userAuth)
      .where(
        and(
          eq(userAuth.phoneNumber, dto.phoneNumber),
          eq(userAuth.userType, dto.userType),
        ),
      );

    if (user.length === 0) {
      throw new UnauthorizedException('User not found.');
    }

    // Simulate OTP verification (Replace with actual verification logic)
    if (dto.verificationCode !== '123456') {
      throw new UnauthorizedException('Invalid verification code.');
    }

    await this.db
      .update(userAuth)
      .set({ verifiedAt: new Date() })
      .where(
        and(
          eq(userAuth.phoneNumber, dto.phoneNumber),
          eq(userAuth.userType, dto.userType),
        ),
      );

    return { message: 'User verified successfully!' };
  }
}
