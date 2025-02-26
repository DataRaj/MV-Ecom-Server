import { z } from 'zod';

export const sendOtpSchema = z.object({
  mobileNumber: z.number().min(10).max(15),
});

export const verifyOtpSchema = z.object({
  mobileNumber: z.string().min(10).max(15),
  otp: z.string().length(6),
});

export type SendOtpDto = z.infer<typeof sendOtpSchema>;
export type VerifyOtpDto = z.infer<typeof verifyOtpSchema>;
