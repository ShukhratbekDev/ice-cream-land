CREATE TABLE IF NOT EXISTS "cartItems" (
	"cart_item_id" serial PRIMARY KEY NOT NULL,
	"cart_id" integer,
	"product_id" integer,
	"quantity" integer DEFAULT 1,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "carts" (
	"cart_id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "discounts_vat" RENAME TO "discounts_vats";--> statement-breakpoint
ALTER TABLE "categories" RENAME COLUMN "id" TO "category_id";--> statement-breakpoint
ALTER TABLE "discounts_vats" RENAME COLUMN "id" TO "discount_vat_id";--> statement-breakpoint
ALTER TABLE "ingredients" RENAME COLUMN "id" TO "ingredient_id";--> statement-breakpoint
ALTER TABLE "product_localizations" RENAME COLUMN "id" TO "product_localization_id";--> statement-breakpoint
ALTER TABLE "products" RENAME COLUMN "id" TO "product_id";--> statement-breakpoint
ALTER TABLE "regions" RENAME COLUMN "id" TO "region_id";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "id" TO "user_id";--> statement-breakpoint
ALTER TABLE "discounts_vats" DROP CONSTRAINT "discounts_vat_region_id_regions_id_fk";
--> statement-breakpoint
ALTER TABLE "product_ingredients" DROP CONSTRAINT "product_ingredients_product_id_products_id_fk";
--> statement-breakpoint
ALTER TABLE "product_ingredients" DROP CONSTRAINT "product_ingredients_ingredient_id_ingredients_id_fk";
--> statement-breakpoint
ALTER TABLE "product_localizations" DROP CONSTRAINT "product_localizations_product_id_products_id_fk";
--> statement-breakpoint
ALTER TABLE "product_localizations" DROP CONSTRAINT "product_localizations_region_id_regions_id_fk";
--> statement-breakpoint
ALTER TABLE "products" DROP CONSTRAINT "products_category_id_categories_id_fk";
--> statement-breakpoint
ALTER TABLE "likes" DROP CONSTRAINT "likes_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "likes" DROP CONSTRAINT "likes_product_id_products_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cartItems" ADD CONSTRAINT "cartItems_cart_id_carts_cart_id_fk" FOREIGN KEY ("cart_id") REFERENCES "public"."carts"("cart_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cartItems" ADD CONSTRAINT "cartItems_product_id_products_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("product_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "carts" ADD CONSTRAINT "carts_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "discounts_vats" ADD CONSTRAINT "discounts_vats_region_id_regions_region_id_fk" FOREIGN KEY ("region_id") REFERENCES "public"."regions"("region_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_ingredients" ADD CONSTRAINT "product_ingredients_product_id_products_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("product_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_ingredients" ADD CONSTRAINT "product_ingredients_ingredient_id_ingredients_ingredient_id_fk" FOREIGN KEY ("ingredient_id") REFERENCES "public"."ingredients"("ingredient_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_localizations" ADD CONSTRAINT "product_localizations_product_id_products_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("product_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_localizations" ADD CONSTRAINT "product_localizations_region_id_regions_region_id_fk" FOREIGN KEY ("region_id") REFERENCES "public"."regions"("region_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "products" ADD CONSTRAINT "products_category_id_categories_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("category_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "likes" ADD CONSTRAINT "likes_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "likes" ADD CONSTRAINT "likes_product_id_products_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("product_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
