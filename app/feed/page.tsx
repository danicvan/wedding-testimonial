"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ImageIcon, Film, Music, PlusCircle } from "lucide-react"
import FeedPost from "@/components/feed-post"
import { MediaUpload } from "@/components/media-upload"
import { StoryViewer } from "@/components/story-viewer"
import { useAuth } from "@/lib/use-auth"
import { useToast } from "@/hooks/use-toast"

// Mock data for feed posts
const feedPosts = [
  {
    id: 1,
    user: {
      name: "Sarah & Michael",
      image: "/images/couple-1.jpg",
      initials: "SM",
    },
    date: "2 hours ago",
    content: "Just posted our wedding video! Check it out and let us know what you think!",
    media: {
      type: "video",
      url: "/images/wedding-video-thumbnail.jpg",
    },
    likes: 24,
    comments: 5,
    isLiked: false,
  },
  {
    id: 2,
    user: {
      name: "David & Emma",
      image: "/images/couple-2.jpg",
      initials: "DE",
    },
    date: "5 hours ago",
    content: "Our rustic barn wedding was filled with so much love and laughter. Best day ever!",
    media: {
      type: "image",
      url: "/images/barn-wedding.jpg",
    },
    likes: 42,
    comments: 18,
    isLiked: true,
  },
  {
    id: 3,
    user: {
      name: "James & Olivia",
      image: "/images/couple-3.jpg",
      initials: "JO",
    },
    date: "Yesterday",
    content: "Our first dance song was 'Perfect' by Ed Sheeran. What was yours?",
    media: {
      type: "music",
      url: "#",
      title: "Perfect - Ed Sheeran",
    },
    likes: 87,
    comments: 32,
    isLiked: false,
  },
  {
    id: 4,
    user: {
      name: "Jessica & Ryan",
      image: "/images/couple-4.jpg",
      initials: "JR",
    },
    date: "2 days ago",
    content: "Our DIY centerpieces were a hit! Sharing the tutorial for anyone interested.",
    media: {
      type: "image",
      url: "/images/diy-centerpieces.jpg",
    },
    likes: 56,
    comments: 9,
    isLiked: false,
  },
]

// Mock data for stories
const stories = [
  {
    id: 1,
    user: {
      name: "Alex & Taylor",
      image: "/images/couple-5.jpg",
    },
    isViewed: false,
    content: {
      type: "image" as const,
      url: "/images/beach-wedding.jpg",
    },
  },
  {
    id: 2,
    user: {
      name: "Chris & Morgan",
      image: "/images/couple-6.jpg",
    },
    isViewed: false,
    content: {
      type: "image" as const,
      url: "/images/barn-wedding.jpg",
    },
  },
  {
    id: 3,
    user: {
      name: "Jordan & Riley",
      image: "/images/couple-7.jpg",
    },
    isViewed: true,
    content: {
      type: "image" as const,
      url: "/images/garden-wedding.jpg",
    },
  },
  {
    id: 4,
    user: {
      name: "Casey & Jamie",
      image: "/images/couple-8.jpg",
    },
    isViewed: true,
    content: {
      type: "image" as const,
      url: "/images/city-wedding.jpg",
    },
  },
  {
    id: 5,
    user: {
      name: "Sam & Pat",
      image: "/images/couple-9.jpg",
    },
    isViewed: false,
    content: {
      type: "image" as const,
      url: "/images/vineyard-wedding.jpg",
    },
  },
]

export default function FeedPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [postContent, setPostContent] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [posts, setPosts] = useState(feedPosts)
  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const [uploadType, setUploadType] = useState<"post" | "story" | "reel">("post")
  const [userStories, setUserStories] = useState(stories)
  const [storyViewerOpen, setStoryViewerOpen] = useState(false)
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0)

  const handlePostSubmit = () => {
    if (!postContent.trim()) return

    const newPost = {
      id: posts.length + 1,
      user: {
        name: user?.name || "Anonymous",
        image: "/images/user-avatar.jpg",
        initials: user?.name?.charAt(0) || "A",
      },
      date: "Just now",
      content: postContent,
      media: null,
      likes: 0,
      comments: 0,
      isLiked: false,
    }

    setPosts([newPost, ...posts])
    setPostContent("")

    toast({
      title: "Post created",
      description: "Your post has been published successfully.",
    })
  }

  const handleLike = (postId: number) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            isLiked: !post.isLiked,
          }
        }
        return post
      }),
    )
  }

  // Modificar a função handleUpload para garantir que os stories do usuário sejam exibidos corretamente
  const handleUpload = (data: any) => {
    console.log("Upload data:", data)

    if (uploadType === "story") {
      // Criar um novo story
      const newStory = {
        id: Date.now(),
        user: {
          name: user?.name || "Anonymous",
          image: "/images/user-avatar.jpg",
        },
        isViewed: false,
        content: {
          type: data.type === "photo" ? ("image" as const) : ("video" as const),
          url: data.fileUrls && data.fileUrls.length > 0 ? data.fileUrls[0] : "/images/new-upload.jpg",
        },
      }

      // Adicionar o novo story ao início da lista
      const updatedStories = [newStory, ...userStories]
      setUserStories(updatedStories)

      // Abrir o visualizador para mostrar o story recém-criado
      setCurrentStoryIndex(0)
      setStoryViewerOpen(true)

      toast({
        title: "Story adicionado",
        description: "Seu story foi publicado com sucesso.",
      })
    } else {
      // Criar um novo post com a mídia carregada
      const newPost = {
        id: Date.now(), // Usar timestamp como ID para garantir unicidade
        user: {
          name: user?.name || "Anonymous",
          image: "/images/user-avatar.jpg",
          initials: user?.name?.charAt(0) || "A",
        },
        date: "Agora mesmo",
        content: data.caption || "Compartilhei um momento do casamento",
        media: {
          type: data.type === "photo" ? "image" : data.type,
          // Usar a URL do objeto diretamente
          url: data.fileUrls && data.fileUrls.length > 0 ? data.fileUrls[0] : null,
          title: data.type === "audio" ? "Nova Música" : undefined,
        },
        likes: 0,
        comments: 0,
        isLiked: false,
      }

      // Adicionar o novo post ao estado
      setPosts([newPost, ...posts])

      toast({
        title: `${uploadType.charAt(0).toUpperCase() + uploadType.slice(1)} criado`,
        description: `Seu ${uploadType} foi publicado com sucesso.`,
      })
    }
  }

  // Função para abrir o visualizador de stories
  const openStoryViewer = (index: number) => {
    setCurrentStoryIndex(index)
    setStoryViewerOpen(true)
  }

  // Modificar a função handleStoryViewed para evitar atualizações desnecessárias
  // Substitua a função handleStoryViewed existente com o seguinte código:

  // Função para marcar um story como visualizado
  const handleStoryViewed = (storyId: number) => {
    // Atualizar o status do story para visualizado
    setUserStories((prevStories) =>
      prevStories.map((story) => (story.id === storyId ? { ...story, isViewed: true } : story)),
    )
  }

  const openUpload = (type: "post" | "story" | "reel") => {
    setUploadType(type)
    setIsUploadOpen(true)
  }

  const filteredPosts =
    activeTab === "all"
      ? posts
      : posts.filter((post) => {
          if (activeTab === "image" && post.media?.type === "image") return true
          if (activeTab === "video" && post.media?.type === "video") return true
          if (activeTab === "music" && post.media?.type === "music") return true
          return false
        })

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          {/* Create Post */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <Avatar>
                  <AvatarImage src="/images/user-avatar.jpg" alt={user?.name} />
                  <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                <Textarea
                  placeholder="Share your wedding story..."
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  className="resize-none"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => openUpload("post")}>
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Photo
                </Button>
                <Button variant="ghost" size="sm" onClick={() => openUpload("post")}>
                  <Film className="h-4 w-4 mr-2" />
                  Video
                </Button>
                <Button variant="ghost" size="sm" onClick={() => openUpload("post")}>
                  <Music className="h-4 w-4 mr-2" />
                  Music
                </Button>
              </div>
              <Button onClick={handlePostSubmit} disabled={!postContent.trim()}>
                Post
              </Button>
            </CardFooter>
          </Card>

          {/* Stories */}
          <div className="overflow-x-auto pb-2">
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div
                  className="relative h-16 w-16 rounded-full border-2 border-primary p-1 cursor-pointer"
                  onClick={() => openUpload("story")}
                >
                  <Avatar className="h-full w-full">
                    <AvatarImage src="/images/user-avatar.jpg" alt={user?.name} />
                    <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                  <div className="absolute bottom-0 right-0 h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                    +
                  </div>
                </div>
                <span className="text-xs mt-1">Add Story</span>
              </div>

              {userStories.map((story, index) => (
                <div key={story.id} className="flex flex-col items-center">
                  <div
                    className={`relative h-16 w-16 rounded-full ${story.isViewed ? "border-2 border-muted" : "border-2 border-primary"} p-1 cursor-pointer`}
                    onClick={() => openStoryViewer(index)}
                  >
                    <Avatar className="h-full w-full">
                      <AvatarImage src={story.user.image} alt={story.user.name} />
                      <AvatarFallback>{story.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </div>
                  <span className="text-xs mt-1 truncate w-16 text-center">{story.user.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Feed Tabs */}
          <Tabs defaultValue="all" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="image">Photos</TabsTrigger>
              <TabsTrigger value="video">Videos</TabsTrigger>
              <TabsTrigger value="music">Music</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-4 mt-0">
              {filteredPosts.map((post) => (
                <FeedPost key={post.id} post={post} onLike={() => handleLike(post.id)} />
              ))}
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Create Buttons */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4">Create</h3>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="flex flex-col h-auto py-4" onClick={() => openUpload("post")}>
                  <ImageIcon className="h-6 w-6 mb-1" />
                  <span>Post</span>
                </Button>
                <Button variant="outline" className="flex flex-col h-auto py-4" onClick={() => openUpload("story")}>
                  <PlusCircle className="h-6 w-6 mb-1" />
                  <span>Story</span>
                </Button>
                <Button variant="outline" className="flex flex-col h-auto py-4" onClick={() => openUpload("reel")}>
                  <Film className="h-6 w-6 mb-1" />
                  <span>Reel</span>
                </Button>
                <Button variant="outline" className="flex flex-col h-auto py-4" onClick={() => openUpload("post")}>
                  <Music className="h-6 w-6 mb-1" />
                  <span>Audio</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Trending Tags */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4">Trending Tags</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">#BeachWedding</Badge>
                <Badge variant="secondary">#RusticWedding</Badge>
                <Badge variant="secondary">#DIYWedding</Badge>
                <Badge variant="secondary">#WeddingPhotography</Badge>
                <Badge variant="secondary">#FirstDance</Badge>
                <Badge variant="secondary">#WeddingDress</Badge>
                <Badge variant="secondary">#VowRenewal</Badge>
                <Badge variant="secondary">#WeddingPlanning</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Suggested Accounts */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4">Suggested Accounts</h3>
              <div className="space-y-4">
                {[
                  { name: "Taylor & Jordan", image: "/images/couple-10.jpg", date: "Married June 2023" },
                  { name: "Alex & Jamie", image: "/images/couple-11.jpg", date: "Married August 2023" },
                  { name: "Morgan & Casey", image: "/images/couple-12.jpg", date: "Married October 2023" },
                  { name: "Riley & Sam", image: "/images/couple-13.jpg", date: "Married December 2023" },
                ].map((account, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={account.image} />
                        <AvatarFallback>{account.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{account.name}</p>
                        <p className="text-xs text-muted-foreground">{account.date}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Follow
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4">Upcoming Events</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-medium">Wedding Expo 2025</p>
                  <p className="text-sm text-muted-foreground">April 15-17, 2025</p>
                  <p className="text-sm">New York Convention Center</p>
                </div>
                <div>
                  <p className="font-medium">Photography Workshop</p>
                  <p className="text-sm text-muted-foreground">May 8, 2025</p>
                  <p className="text-sm">Online Event</p>
                </div>
                <div>
                  <p className="font-medium">Wedding Planning Seminar</p>
                  <p className="text-sm text-muted-foreground">June 12, 2025</p>
                  <p className="text-sm">Chicago Marriott</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Media Upload Dialog */}
      <MediaUpload
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUpload={handleUpload}
        type={uploadType}
      />

      {/* Story Viewer */}
      <StoryViewer
        stories={userStories}
        initialStoryIndex={currentStoryIndex}
        isOpen={storyViewerOpen}
        onClose={() => setStoryViewerOpen(false)}
        onStoryViewed={handleStoryViewed}
      />
    </div>
  )
}

