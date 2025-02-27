ALTER TABLE "user_auth" RENAME COLUMN "otp_expires_at" TO "expires_at";--> statement-breakpoint
ALTER TABLE "user_auth" RENAME COLUMN "is_verified" TO "is_active";--> statement-breakpoint
ALTER TABLE "user_auth" ADD COLUMN "auth_key" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "user_auth" DROP COLUMN "otp";