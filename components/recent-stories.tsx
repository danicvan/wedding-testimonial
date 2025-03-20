import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle } from "lucide-react"
import Link from "next/link"

const recentStories = [
  {
    id: 1,
    user: {
      name: "Jessica & Ryan",
      image: "/images/couple-4.jpg",
      initials: "JR",
    },
    date: "2 hours ago",
    content: "Just posted our wedding video! Check it out and let us know what you think!",
    likes: 24,
    comments: 5,
    type: "video",
  },
  {
    id: 2,
    user: {
      name: "Sophia & Thomas",
      image: "/images/couple-5.jpg",
      initials: "ST",
    },
    date: "5 hours ago",
    content: "Our first dance song was 'Perfect' by Ed Sheeran. What was yours?",
    likes: 42,
    comments: 18,
    type: "question",
  },
  {
    id: 3,
    user: {
      name: "Mia & Noah",
      image: "/images/couple-6.jpg",
      initials: "MN",
    },
    date: "Yesterday",
    content: "Just added our wedding photo album. So many beautiful memories!",
    likes: 87,
    comments: 12,
    type: "photos",
  },
  {
    id: 4,
    user: {
      name: "Emily & Daniel",
      image: "/images/couple-7.jpg",
      initials: "ED",
    },
    date: "2 days ago",
    content: "Our DIY centerpieces were a hit! Sharing the tutorial for anyone interested.",
    likes: 56,
    comments: 9,
    type: "tutorial",
  },
]

export default function RecentStories() {
  return (
    <section className="my-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Recent Activity</h2>
        <Link href="/feed" className="text-primary hover:underline">
          View Feed
        </Link>
      </div>

      <div className="space-y-4">
        {recentStories.map((story) => (
          <Card key={story.id}>
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Avatar>
                  <AvatarImage src={story.user.image} alt={story.user.name} />
                  <AvatarFallback>{story.user.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{story.user.name}</p>
                      <p className="text-sm text-muted-foreground">{story.date}</p>
                    </div>
                    <Badge variant="outline">{story.type}</Badge>
                  </div>
                  <p className="my-3">{story.content}</p>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <button className="flex items-center gap-1 hover:text-primary">
                      <Heart className="h-4 w-4" />
                      <span>{story.likes}</span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-primary">
                      <MessageCircle className="h-4 w-4" />
                      <span>{story.comments}</span>
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

