import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Share2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const featuredTestimonials = [
  {
    id: 1,
    user: {
      name: "Sarah & Michael",
      image: "/images/couple-1.jpg",
      initials: "SM",
    },
    date: "June 15, 2023",
    content: "Our beach wedding was absolutely magical! The sunset ceremony was everything we dreamed of.",
    image: "/images/beach-wedding.jpg",
    likes: 245,
    comments: 32,
    tags: ["BeachWedding", "SunsetCeremony"],
  },
  {
    id: 2,
    user: {
      name: "David & Emma",
      image: "/images/couple-2.jpg",
      initials: "DE",
    },
    date: "September 3, 2023",
    content: "Our rustic barn wedding was filled with so much love and laughter. Best day ever!",
    image: "/images/barn-wedding.jpg",
    likes: 189,
    comments: 27,
    tags: ["RusticWedding", "BarnVenue"],
  },
  {
    id: 3,
    user: {
      name: "James & Olivia",
      image: "/images/couple-3.jpg",
      initials: "JO",
    },
    date: "October 22, 2023",
    content: "Our intimate garden wedding was perfect. Small gathering, big memories!",
    image: "/images/garden-wedding.jpg",
    likes: 156,
    comments: 19,
    tags: ["GardenWedding", "IntimateWedding"],
  },
]

export default function FeaturedTestimonials() {
  return (
    <section className="my-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Featured Stories</h2>
        <Link href="/testimonials" className="text-primary hover:underline">
          View All
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredTestimonials.map((testimonial) => (
          <Card key={testimonial.id} className="overflow-hidden">
            <div className="relative h-48 w-full">
              <Image
                src={testimonial.image || "/placeholder.svg"}
                alt={`Wedding of ${testimonial.user.name}`}
                fill
                className="object-cover"
              />
            </div>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-3">
                <Avatar>
                  <AvatarImage src={testimonial.user.image} alt={testimonial.user.name} />
                  <AvatarFallback>{testimonial.user.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{testimonial.user.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.date}</p>
                </div>
              </div>
              <p className="mb-3">{testimonial.content}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {testimonial.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 flex justify-between">
              <div className="flex items-center gap-1">
                <button className="flex items-center gap-1 text-muted-foreground hover:text-primary">
                  <Heart className="h-4 w-4" />
                  <span>{testimonial.likes}</span>
                </button>
              </div>
              <div className="flex items-center gap-1">
                <button className="flex items-center gap-1 text-muted-foreground hover:text-primary">
                  <MessageCircle className="h-4 w-4" />
                  <span>{testimonial.comments}</span>
                </button>
              </div>
              <div className="flex items-center gap-1">
                <button className="flex items-center gap-1 text-muted-foreground hover:text-primary">
                  <Share2 className="h-4 w-4" />
                  <span>Share</span>
                </button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}

