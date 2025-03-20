import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function HeroSection() {
  return (
    <section className="py-16 flex flex-col md:flex-row items-center gap-8">
      <div className="flex-1">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Share Your Wedding Journey</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Connect with other couples, share your special moments, and inspire others with your wedding story.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button asChild size="lg">
            <Link href="/register">Join Now</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/testimonials">Explore Stories</Link>
          </Button>
        </div>
      </div>
      <div className="flex-1 relative h-[400px] w-full rounded-lg overflow-hidden">
        <Image src="/images/wedding-hero.jpg" alt="Wedding couple" fill className="object-cover" priority />
      </div>
    </section>
  )
}

