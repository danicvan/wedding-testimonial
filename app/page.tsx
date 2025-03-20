import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import FeaturedTestimonials from "@/components/featured-testimonials"
import HeroSection from "@/components/hero-section"
import RecentStories from "@/components/recent-stories"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <HeroSection />

      <section className="my-16">
        <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-2">Create Your Profile</h3>
              <p className="text-muted-foreground">
                Sign up and create your personal profile to start sharing your wedding journey.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-2">Share Your Story</h3>
              <p className="text-muted-foreground">
                Post photos, videos, and stories about your special day for others to see.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-2">Connect & Inspire</h3>
              <p className="text-muted-foreground">
                Engage with other couples, like and comment on their stories, and get inspired.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <FeaturedTestimonials />
      <RecentStories />

      <section className="my-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Share Your Story?</h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join our community of newlyweds and engaged couples sharing their wedding journeys.
        </p>
        <Button asChild size="lg">
          <Link href="/register">Get Started</Link>
        </Button>
      </section>
    </div>
  )
}

