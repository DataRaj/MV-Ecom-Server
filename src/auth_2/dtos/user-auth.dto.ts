import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  userType: 'customer' | 'reseller' | 'retailer';

  @IsString()
  @IsOptional()
  provider: 'phone' | 'google' | 'facebook';
}

export class VerifyDto {
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  userType: 'customer' | 'reseller' | 'retailer';

  @IsString()
  @IsNotEmpty()
  verificationCode: string;
}
