"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Heart, MessageCircle, Share2, MoreHorizontal, Send } from "lucide-react"
import Image from "next/image"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Post {
  id: number
  user: {
    name: string
    image: string
    initials: string
  }
  date: string
  content: string
  media: {
    type: string
    url: string
    title?: string
  } | null
  likes: number
  comments: number
  isLiked: boolean
}

interface FeedPostProps {
  post: Post
  onLike: () => void
}

export default function FeedPost({ post, onLike }: FeedPostProps) {
  const [showComments, setShowComments] = useState(false)
  const [commentText, setCommentText] = useState("")

  // Mock comments data
  const mockComments = [
    {
      id: 1,
      user: {
        name: "Alex Taylor",
        image: "/images/user-1.jpg",
        initials: "AT",
      },
      content: "This looks amazing! Congratulations!",
      date: "1 hour ago",
    },
    {
      id: 2,
      user: {
        name: "Jordan Riley",
        image: "/images/user-2.jpg",
        initials: "JR",
      },
      content: "Beautiful! Where was this venue?",
      date: "2 hours ago",
    },
  ]

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (commentText.trim()) {
      // In a real app, you would add the comment to the database
      // and update the state with the new comment
      setCommentText("")
    }
  }

  // Atualizar o renderMedia para lidar com URLs de objeto
  const renderMedia = () => {
    if (!post.media) return null

    switch (post.media.type) {
      case "image":
        return (
          <div className="relative h-80 w-full mt-4">
            {post.media.url ? (
              // Exibir imagem carregada (URL de objeto ou caminho)
              <img
                src={post.media.url || "/placeholder.svg"}
                alt="Post image"
                className="w-full h-full object-cover rounded-md"
              />
            ) : (
              // Fallback para imagens existentes
              <>
                <div className="absolute inset-0 bg-primary rounded-md flex items-center justify-center text-white font-bold">
                  {post.user.name}'s Photo
                </div>
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Post image"
                  fill
                  className="object-cover rounded-md"
                />
              </>
            )}
          </div>
        )
      case "video":
        return (
          <div className="relative h-80 w-full mt-4 bg-black rounded-md flex items-center justify-center">
            {post.media.url && !post.media.url.startsWith("/") ? (
              // Exibir vídeo carregado (URL de objeto)
              <video src={post.media.url} controls className="w-full h-full object-cover rounded-md" />
            ) : (
              // Fallback para vídeos existentes
              <>
                <div className="absolute inset-0 bg-blue-500 rounded-md flex items-center justify-center text-white font-bold">
                  {post.user.name}'s Video
                </div>
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center">
                    <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6 text-white ml-1"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                {post.media.url && (
                  <Image
                    src={post.media.url || "/placeholder.svg"}
                    alt="Video thumbnail"
                    fill
                    className="object-cover rounded-md opacity-50"
                  />
                )}
              </>
            )}
          </div>
        )
      case "audio":
        return (
          <div className="mt-4 p-4 bg-muted rounded-md flex items-center gap-4">
            {post.media.url && !post.media.url.startsWith("/") ? (
              // Exibir áudio carregado (URL de objeto)
              <audio src={post.media.url} controls className="w-full" />
            ) : (
              // Fallback para áudios existentes
              <>
                <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 text-white"
                  >
                    <path
                      fillRule="evenodd"
                      d="M19.952 1.651a.75.75 0 0 1 .298.599V16.303a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.403-4.909l2.311-.66a1.5 1.5 0 0 0 1.088-1.442V6.994l-9 2.572v9.737a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.402-4.909l2.31-.66a1.5 1.5 0 0 0 1.088-1.442V5.25a.75.75 0 0 1 .544-.721l10.5-3a.75.75 0 0 1 .658.122Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{post.media.title}</p>
                  <div className="h-1.5 bg-secondary rounded-full mt-2">
                    <div className="h-full w-1/3 bg-primary rounded-full"></div>
                  </div>
                </div>
              </>
            )}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <div className="flex gap-3">
            <Avatar>
              <AvatarImage src={post.user.image} alt={post.user.name} />
              <AvatarFallback>{post.user.initials}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{post.user.name}</p>
              <p className="text-sm text-muted-foreground">{post.date}</p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Save Post</DropdownMenuItem>
              <DropdownMenuItem>Report Post</DropdownMenuItem>
              <DropdownMenuItem>Hide Post</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="mt-4">
          <p>{post.content}</p>
          {renderMedia()}
        </div>
      </CardContent>

      <CardFooter className="flex flex-col">
        <div className="flex justify-between w-full pb-2">
          <Button variant="ghost" size="sm" className={post.isLiked ? "text-primary" : ""} onClick={onLike}>
            <Heart className={`h-4 w-4 mr-2 ${post.isLiked ? "fill-primary" : ""}`} />
            <span>{post.likes}</span>
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setShowComments(!showComments)}>
            <MessageCircle className="h-4 w-4 mr-2" />
            <span>{post.comments}</span>
          </Button>
          <Button variant="ghost" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            <span>Share</span>
          </Button>
        </div>

        {showComments && (
          <div className="w-full pt-2 border-t space-y-4">
            {mockComments.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={comment.user.image} alt={comment.user.name} />
                  <AvatarFallback>{comment.user.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="bg-muted p-2 rounded-md">
                    <p className="font-medium text-sm">{comment.user.name}</p>
                    <p className="text-sm">{comment.content}</p>
                  </div>
                  <div className="flex gap-4 mt-1 text-xs text-muted-foreground">
                    <span>{comment.date}</span>
                    <button className="hover:text-primary">Like</button>
                    <button className="hover:text-primary">Reply</button>
                  </div>
                </div>
              </div>
            ))}

            <form onSubmit={handleCommentSubmit} className="flex gap-2 pt-2">
              <Input
                placeholder="Add a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="icon" disabled={!commentText.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}

