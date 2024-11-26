ALTER TABLE "discounts_vats" RENAME TO "discount_vats";--> statement-breakpoint
ALTER TABLE "discount_vats" DROP CONSTRAINT "discounts_vats_region_id_regions_region_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "discount_vats" ADD CONSTRAINT "discount_vats_region_id_regions_region_id_fk" FOREIGN KEY ("region_id") REFERENCES "public"."regions"("region_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
