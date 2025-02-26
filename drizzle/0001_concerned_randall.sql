CREATE TABLE "user_auth" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"otp" varchar(6) NOT NULL,
	"otp_expires_at" timestamp NOT NULL,
	"is_verified" boolean DEFAULT false
);
--> statement-breakpoint
ALTER TABLE "user_auth" ADD CONSTRAINT "user_auth_user_id_customer_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."customer"("id") ON DELETE cascade ON UPDATE no action;