CREATE TABLE "address" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user-id" uuid,
	"address" varchar(100),
	"city" varchar(50),
	"state" varchar(50),
	"country" varchar(50),
	"pincode" integer,
	"created-at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "customer" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"firstname" varchar(50),
	"lastname" varchar(50),
	"mobile-number" integer NOT NULL,
	"created-at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"address-id" uuid,
	"email" varchar(50),
	"email_verified" boolean DEFAULT false NOT NULL,
	"profile-is-complete" boolean DEFAULT false
);
--> statement-breakpoint
ALTER TABLE "address" ADD CONSTRAINT "address_user-id_customer_id_fk" FOREIGN KEY ("user-id") REFERENCES "public"."customer"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "customer" ADD CONSTRAINT "customer_address-id_address_id_fk" FOREIGN KEY ("address-id") REFERENCES "public"."address"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "customer-id_idx" ON "customer" USING btree ("id");--> statement-breakpoint
CREATE INDEX "customer-mobile-number_idx" ON "customer" USING btree ("mobile-number");