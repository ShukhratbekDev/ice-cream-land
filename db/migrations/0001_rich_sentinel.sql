ALTER TABLE "orders" ADD COLUMN "currency" char(3) NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "discount_percentage" numeric(5, 2) NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "tax_percentage" numeric(5, 2) NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "discount_amount" numeric(10, 2) NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "discounted_amount" numeric(10, 2) NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "tax_amount" numeric(10, 2) NOT NULL;