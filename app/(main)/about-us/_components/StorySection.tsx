import Image from 'next/image';

export default function StorySection() {
  return (
    <section className="py-8 sm:py-12 md:py-16 bg-muted/50 dark:bg-muted/10" aria-labelledby="story-heading">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <figure className="order-2 md:order-1 relative aspect-video w-full">
            <Image
              src="/catering.jpg"
              alt="Ice Cream Land store front showing our welcoming entrance and outdoor seating area"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="rounded-lg shadow-lg object-cover transition-transform duration-300 hover:scale-105 dark:brightness-90"
              priority
              quality={85}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRseHh8dIR0hHh4dISEcHx4eHh8eISEhHiEeHh4eHh4eHh4eHh4eHh4eHh4eHh7/2wBDAR"
            />
            <figcaption className="sr-only">Our flagship store location in Dessert City</figcaption>
          </figure>
          <div className="order-1 md:order-2 space-y-4" aria-labelledby="story-heading">
            <p className="text-muted-foreground dark:text-muted-foreground text-sm sm:text-base" aria-hidden="true">
              The power to do more
            </p>
            <h2 id="story-heading" className="text-2xl sm:text-3xl font-bold text-foreground dark:text-foreground">
              Our Story
            </h2>
            <p
              className="text-muted-foreground dark:text-muted-foreground text-sm sm:text-base leading-relaxed"
              tabIndex={0}
            >
              Ice Cream Land began as a small family-run business with a passion for creating delicious and unique ice
              cream flavors. Founded in 2010 in the heart of Dessert City, we quickly gained a loyal following for our
              artisanal approach to ice cream making. Our journey has been fueled by a love for quality ingredients,
              innovative flavors, and a commitment to bringing joy to every scoop.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
