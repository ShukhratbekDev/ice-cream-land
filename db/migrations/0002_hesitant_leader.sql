ALTER TABLE "product_ingredients" ALTER COLUMN "product_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "product_ingredients" ALTER COLUMN "ingredient_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "image_url" SET NOT NULL;