"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Heart, MessageCircle, Share2, Search, Calendar, MapPin, Music, ImageIcon, Film } from "lucide-react"
import Image from "next/image"
import { MediaUpload } from "@/components/media-upload"
import { useAuth } from "@/lib/use-auth"
import { useToast } from "@/hooks/use-toast"

// Testimonial data
const testimonials = [
  {
    id: 1,
    user: {
      name: "Sarah & Michael",
      image: "/images/couple-1.jpg",
      initials: "SM",
    },
    date: "June 15, 2023",
    location: "Malibu Beach, California",
    content:
      "Our beach wedding was absolutely magical! The sunset ceremony was everything we dreamed of. The waves crashing in the background created the perfect soundtrack as we said our vows.",
    image: "/images/beach-wedding.jpg",
    likes: 245,
    comments: 32,
    tags: ["BeachWedding", "SunsetCeremony", "California"],
    type: "photo",
    featured: true,
  },
  {
    id: 2,
    user: {
      name: "David & Emma",
      image: "/images/couple-2.jpg",
      initials: "DE",
    },
    date: "September 3, 2023",
    location: "Rustic Barn, Vermont",
    content:
      "Our rustic barn wedding was filled with so much love and laughter. Best day ever! The fairy lights and wildflower arrangements created the perfect atmosphere for our celebration.",
    image: "/images/barn-wedding.jpg",
    likes: 189,
    comments: 27,
    tags: ["RusticWedding", "BarnVenue", "Vermont"],
    type: "photo",
    featured: true,
  },
  {
    id: 3,
    user: {
      name: "James & Olivia",
      image: "/images/couple-3.jpg",
      initials: "JO",
    },
    date: "October 22, 2023",
    location: "Botanical Gardens, Portland",
    content:
      "Our intimate garden wedding was perfect. Small gathering, big memories! We kept it to just 50 guests, which made the day feel so personal and special.",
    image: "/images/garden-wedding.jpg",
    likes: 156,
    comments: 19,
    tags: ["GardenWedding", "IntimateWedding", "Portland"],
    type: "photo",
    featured: true,
  },
  {
    id: 4,
    user: {
      name: "Jessica & Ryan",
      image: "/images/couple-4.jpg",
      initials: "JR",
    },
    date: "July 8, 2023",
    location: "Grand Hotel, New York",
    content:
      "Just posted our wedding video! Check it out and let us know what you think! Our videographer captured all the special moments perfectly.",
    image: "/images/wedding-video-thumbnail.jpg",
    likes: 210,
    comments: 45,
    tags: ["WeddingVideo", "NewYork", "GrandHotel"],
    type: "video",
    featured: false,
  },
  {
    id: 5,
    user: {
      name: "Sophia & Thomas",
      image: "/images/couple-5.jpg",
      initials: "ST",
    },
    date: "August 12, 2023",
    location: "Mountain View Lodge, Colorado",
    content:
      "Our first dance song was 'Perfect' by Ed Sheeran. What was yours? We practiced for weeks to get it right, and it was such a special moment.",
    image: "/images/first-dance.jpg",
    likes: 178,
    comments: 63,
    tags: ["FirstDance", "WeddingMusic", "Colorado"],
    type: "music",
    featured: false,
  },
  {
    id: 6,
    user: {
      name: "Mia & Noah",
      image: "/images/couple-6.jpg",
      initials: "MN",
    },
    date: "May 20, 2023",
    location: "Vineyard Estate, Napa Valley",
    content:
      "Just added our wedding photo album. So many beautiful memories! Our photographer did an amazing job capturing the essence of our vineyard wedding.",
    image: "/images/vineyard-wedding.jpg",
    likes: 232,
    comments: 29,
    tags: ["VineyardWedding", "NapaValley", "WeddingPhotos"],
    type: "photo",
    featured: false,
  },
  {
    id: 7,
    user: {
      name: "Emily & Daniel",
      image: "/images/couple-7.jpg",
      initials: "ED",
    },
    date: "April 5, 2023",
    location: "Historic Chapel, Charleston",
    content:
      "Our DIY centerpieces were a hit! Sharing the tutorial for anyone interested. We saved so much money by making them ourselves, and they turned out beautifully.",
    image: "/images/diy-centerpieces.jpg",
    likes: 145,
    comments: 38,
    tags: ["DIYWedding", "WeddingDecor", "Charleston"],
    type: "photo",
    featured: false,
  },
  {
    id: 8,
    user: {
      name: "Alex & Taylor",
      image: "/images/couple-8.jpg",
      initials: "AT",
    },
    date: "November 11, 2023",
    location: "Urban Loft, Chicago",
    content:
      "Our modern city wedding was everything we wanted! The skyline views during our rooftop ceremony were breathtaking. Highly recommend winter weddings in the city!",
    image: "/images/city-wedding.jpg",
    likes: 167,
    comments: 22,
    tags: ["CityWedding", "Chicago", "WinterWedding"],
    type: "photo",
    featured: false,
  },
]

// Popular tags
const popularTags = [
  "BeachWedding",
  "RusticWedding",
  "GardenWedding",
  "DIYWedding",
  "WeddingPhotography",
  "FirstDance",
  "WeddingDress",
  "VowRenewal",
  "WeddingPlanning",
  "DestinationWedding",
]

export default function TestimonialsPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false)
  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const [testimonialForm, setTestimonialForm] = useState({
    content: "",
    location: "",
    tags: "",
  })
  const [likedTestimonials, setLikedTestimonials] = useState<number[]>([])
  const [allTestimonials, setAllTestimonials] = useState(testimonials)

  // Filter testimonials based on search, tab, and tag
  const filteredTestimonials = allTestimonials.filter((testimonial) => {
    const matchesSearch =
      testimonial.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      testimonial.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      testimonial.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      testimonial.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesTab =
      activeTab === "all" || (activeTab === "featured" && testimonial.featured) || testimonial.type === activeTab

    const matchesTag = !activeTag || testimonial.tags.includes(activeTag)

    return matchesSearch && matchesTab && matchesTag
  })

  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setTestimonialForm((prev) => ({ ...prev, [name]: value }))
  }

  // Handle testimonial submission
  const handleSubmitTestimonial = () => {
    if (!testimonialForm.content.trim()) {
      toast({
        title: "Error",
        description: "Please enter your testimonial content.",
        variant: "destructive",
      })
      return
    }

    // Create new testimonial
    const newTestimonial = {
      id: allTestimonials.length + 1,
      user: {
        name: user?.name || "Anonymous",
        image: "/images/user-avatar.jpg",
        initials: user?.name?.charAt(0) || "A",
      },
      date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      location: testimonialForm.location || "Unknown Location",
      content: testimonialForm.content,
      image: "/images/new-testimonial.jpg", // Default image
      likes: 0,
      comments: 0,
      tags: testimonialForm.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag),
      type: "photo",
      featured: false,
    }

    setAllTestimonials([newTestimonial, ...allTestimonials])

    // Reset form
    setTestimonialForm({
      content: "",
      location: "",
      tags: "",
    })

    setIsSubmitDialogOpen(false)

    toast({
      title: "Success",
      description: "Your testimonial has been submitted for review.",
    })
  }

  // Handle media upload
  const handleMediaUpload = (data: any) => {
    // Criar novo testimonial com a mídia carregada
    const newTestimonial = {
      id: Date.now(), // Usar timestamp como ID para garantir unicidade
      user: {
        name: user?.name || "Anonymous",
        image: "/images/user-avatar.jpg",
        initials: user?.name?.charAt(0) || "A",
      },
      date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      location: "Adicionado via upload",
      content: data.caption || "Compartilhei um momento do casamento",
      // Usar a URL do objeto diretamente
      image:
        data.fileUrls && data.fileUrls.length > 0
          ? data.fileUrls[0]
          : data.type === "photo"
            ? "/images/new-upload.jpg"
            : data.type === "video"
              ? "/images/video-upload.jpg"
              : "/images/music-upload.jpg",
      likes: 0,
      comments: 0,
      tags: ["NovoUpload"],
      type: data.type === "photo" ? "photo" : data.type === "video" ? "video" : "music",
      featured: false,
    }

    setAllTestimonials([newTestimonial, ...allTestimonials])

    // Não vamos mais usar localStorage para armazenar os testimonials

    toast({
      title: "Sucesso",
      description: "Sua mídia foi carregada e compartilhada.",
    })
  }

  // Toggle like on testimonial
  const toggleLike = (id: number) => {
    if (likedTestimonials.includes(id)) {
      setLikedTestimonials(likedTestimonials.filter((itemId) => itemId !== id))
      setAllTestimonials(
        allTestimonials.map((testimonial) =>
          testimonial.id === id ? { ...testimonial, likes: testimonial.likes - 1 } : testimonial,
        ),
      )
    } else {
      setLikedTestimonials([...likedTestimonials, id])
      setAllTestimonials(
        allTestimonials.map((testimonial) =>
          testimonial.id === id ? { ...testimonial, likes: testimonial.likes + 1 } : testimonial,
        ),
      )
    }
  }

  // Share testimonial
  const shareTestimonial = (id: number) => {
    toast({
      title: "Shared",
      description: "Testimonial has been shared to your timeline.",
    })
  }

  // Adicionar useEffect para carregar testimonials salvos do localStorage
  useEffect(() => {
    // Nada a fazer aqui, já que não estamos mais usando localStorage
    // Mantemos apenas os testimonials iniciais
  }, [])

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Wedding Testimonials</h1>
            <p className="text-muted-foreground">Discover and share wedding experiences</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search testimonials..."
                className="w-full md:w-[200px] pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Dialog open={isSubmitDialogOpen} onOpenChange={setIsSubmitDialogOpen}>
              <DialogTrigger asChild>
                <Button>Share Your Story</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Share Your Wedding Story</DialogTitle>
                  <DialogDescription>Tell us about your special day and inspire other couples.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label htmlFor="content" className="text-sm font-medium">
                      Your Testimonial
                    </label>
                    <Textarea
                      id="content"
                      name="content"
                      placeholder="Share your wedding experience..."
                      rows={5}
                      value={testimonialForm.content}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="location" className="text-sm font-medium">
                      Wedding Location
                    </label>
                    <Input
                      id="location"
                      name="location"
                      placeholder="e.g., Beach Resort, Hawaii"
                      value={testimonialForm.location}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="tags" className="text-sm font-medium">
                      Tags (comma separated)
                    </label>
                    <Input
                      id="tags"
                      name="tags"
                      placeholder="e.g., BeachWedding, SunsetCeremony"
                      value={testimonialForm.tags}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <Button variant="outline" onClick={() => setIsUploadOpen(true)}>
                      Add Media
                    </Button>
                    <span className="text-sm text-muted-foreground">Add photos or videos to your testimonial</span>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsSubmitDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSubmitTestimonial}>Submit Testimonial</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-4">Filter By</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Media Type</h4>
                    <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                      <TabsList className="grid grid-cols-2 mb-2">
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="featured">Featured</TabsTrigger>
                      </TabsList>
                      <TabsList className="grid grid-cols-3">
                        <TabsTrigger value="photo" className="flex items-center gap-1">
                          <ImageIcon className="h-3 w-3" />
                          <span>Photos</span>
                        </TabsTrigger>
                        <TabsTrigger value="video" className="flex items-center gap-1">
                          <Film className="h-3 w-3" />
                          <span>Videos</span>
                        </TabsTrigger>
                        <TabsTrigger value="music" className="flex items-center gap-1">
                          <Music className="h-3 w-3" />
                          <span>Music</span>
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Popular Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {popularTags.map((tag) => (
                        <Badge
                          key={tag}
                          variant={activeTag === tag ? "default" : "secondary"}
                          className="cursor-pointer"
                          onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                        >
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-4">Submit Your Story</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Share your wedding experience and inspire other couples planning their special day.
                </p>
                <div className="space-y-2">
                  <Button className="w-full" onClick={() => setIsSubmitDialogOpen(true)}>
                    Share Your Story
                  </Button>
                  <Button variant="outline" className="w-full" onClick={() => setIsUploadOpen(true)}>
                    Upload Media
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Testimonials Grid */}
          <div className="md:col-span-3">
            {filteredTestimonials.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTestimonials.map((testimonial) => (
                  <Card key={testimonial.id} className="overflow-hidden">
                    <div className="relative h-48 w-full">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={`Wedding of ${testimonial.user.name}`}
                        fill
                        className="object-cover"
                      />
                      {testimonial.type === "video" && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="h-12 w-12 rounded-full bg-black/50 flex items-center justify-center">
                            <Film className="h-6 w-6 text-white" />
                          </div>
                        </div>
                      )}
                      {testimonial.type === "music" && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="h-12 w-12 rounded-full bg-black/50 flex items-center justify-center">
                            <Music className="h-6 w-6 text-white" />
                          </div>
                        </div>
                      )}
                      {testimonial.featured && <Badge className="absolute top-2 left-2">Featured</Badge>}
                    </div>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3 mb-3">
                        <Avatar>
                          <AvatarImage src={testimonial.user.image} alt={testimonial.user.name} />
                          <AvatarFallback>{testimonial.user.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{testimonial.user.name}</p>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            <span>{testimonial.date}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            <span>{testimonial.location}</span>
                          </div>
                        </div>
                      </div>
                      <p className="mb-3 line-clamp-3">{testimonial.content}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {testimonial.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="cursor-pointer"
                            onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                          >
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-4 flex justify-between">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={likedTestimonials.includes(testimonial.id) ? "text-primary" : ""}
                        onClick={() => toggleLike(testimonial.id)}
                      >
                        <Heart
                          className={`h-4 w-4 mr-2 ${likedTestimonials.includes(testimonial.id) ? "fill-primary" : ""}`}
                        />
                        <span>{testimonial.likes}</span>
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        <span>{testimonial.comments}</span>
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => shareTestimonial(testimonial.id)}>
                        <Share2 className="h-4 w-4 mr-2" />
                        <span>Share</span>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Search className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No testimonials found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your search or filter criteria</p>
                <Button
                  onClick={() => {
                    setSearchQuery("")
                    setActiveTab("all")
                    setActiveTag(null)
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Media Upload Dialog */}
      <MediaUpload
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUpload={handleMediaUpload}
        type="post"
      />
    </div>
  )
}

