"use client"

import { useState, useEffect, useRef } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { X, ChevronLeft, ChevronRight, Heart, MessageCircle, Send } from "lucide-react"

interface StoryUser {
  name: string
  image: string
}

interface Story {
  id: number
  user: StoryUser
  isViewed: boolean
  content?: {
    type: "image" | "video"
    url: string
  }
}

interface StoryViewerProps {
  stories: Story[]
  initialStoryIndex: number
  isOpen: boolean
  onClose: () => void
  onStoryViewed: (storyId: number) => void
}

export function StoryViewer({ stories, initialStoryIndex, isOpen, onClose, onStoryViewed }: StoryViewerProps) {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(initialStoryIndex)
  const [progress, setProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const progressInterval = useRef<NodeJS.Timeout | null>(null)
  const viewedStoriesRef = useRef<Set<number>>(new Set())

  const currentStory = stories[currentStoryIndex]

  // Set up default content for stories that don't have it
  const storyContent = currentStory?.content || {
    type: "image",
    url: `/images/story-${currentStory?.id || 1}.jpg`,
  }

  // Reset progress when story changes
  useEffect(() => {
    if (!currentStory) return

    setProgress(0)

    // Limpar o intervalo anterior
    if (progressInterval.current) {
      clearInterval(progressInterval.current)
    }

    // Marcar o story como visualizado se ainda não foi
    if (!viewedStoriesRef.current.has(currentStory.id)) {
      viewedStoriesRef.current.add(currentStory.id)
      onStoryViewed(currentStory.id)
    }

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current)
      }
    }
  }, [currentStoryIndex, currentStory, onStoryViewed])

  // Progress timer
  useEffect(() => {
    if (!isOpen || isPaused || !currentStory) return

    if (progressInterval.current) {
      clearInterval(progressInterval.current)
    }

    const duration = storyContent.type === "video" ? 30000 : 5000 // 5s for images, 30s for videos
    const increment = 100 / (duration / 100) // Update every 100ms

    progressInterval.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          // Move to next story
          if (currentStoryIndex < stories.length - 1) {
            setCurrentStoryIndex((prev) => prev + 1)
          } else {
            // Close if it's the last story
            onClose()
          }
          return 0
        }
        return prev + increment
      })
    }, 100)

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current)
      }
    }
  }, [isOpen, isPaused, currentStoryIndex, stories.length, onClose, storyContent.type, currentStory])

  const handlePrevStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex((prev) => prev - 1)
    }
  }

  const handleNextStory = () => {
    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex((prev) => prev + 1)
    } else {
      onClose()
    }
  }

  // Pause progress on mouse down, resume on mouse up
  const handleMouseDown = () => setIsPaused(true)
  const handleMouseUp = () => setIsPaused(false)

  if (!currentStory) return null

  // Função para renderizar o conteúdo do story corretamente
  const renderStoryContent = () => {
    if (storyContent.type === "image") {
      // Verificar se a URL é uma URL de objeto (blob) ou um caminho de arquivo
      const isObjectUrl =
        storyContent.url && (storyContent.url.startsWith("blob:") || storyContent.url.startsWith("data:"))

      if (isObjectUrl) {
        // Para URLs de objeto (uploads do usuário), usar a tag img diretamente
        return (
          <img
            src={storyContent.url || "/placeholder.svg"}
            alt="Story"
            className="max-h-full max-w-full object-contain"
          />
        )
      } else {
        // Para caminhos de arquivo, usar uma div com background-image
        return (
          <div
            className="w-full h-full bg-center bg-contain bg-no-repeat"
            style={{ backgroundImage: `url(${storyContent.url || "/placeholder.svg?height=800&width=600"})` }}
          />
        )
      }
    } else if (storyContent.type === "video") {
      return <video src={storyContent.url} className="max-h-full max-w-full" autoPlay muted playsInline controls />
    }

    return <div className="flex items-center justify-center h-full w-full text-white">Conteúdo não disponível</div>
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-screen-md w-full p-0 h-[80vh] max-h-[80vh] overflow-hidden bg-black text-white">
        <div
          className="relative w-full h-full flex flex-col"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchEnd={handleMouseUp}
        >
          {/* Progress bar */}
          <div className="absolute top-0 left-0 right-0 z-20 flex gap-1 p-2">
            {stories.map((story, index) => (
              <div key={story.id} className="h-1 bg-white/30 flex-1 rounded-full overflow-hidden">
                {index === currentStoryIndex ? (
                  <div className="h-full bg-white rounded-full" style={{ width: `${progress}%` }} />
                ) : index < currentStoryIndex ? (
                  <div className="h-full bg-white rounded-full w-full" />
                ) : null}
              </div>
            ))}
          </div>

          {/* Header */}
          <div className="absolute top-0 left-0 right-0 z-20 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border-2 border-white">
                <AvatarImage src={currentStory.user.image} alt={currentStory.user.name} />
                <AvatarFallback>{currentStory.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{currentStory.user.name}</p>
                <p className="text-xs text-white/70">Just now</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-white">
              <X className="h-6 w-6" />
            </Button>
          </div>

          {/* Story content */}
          <div className="flex-1 flex items-center justify-center">{renderStoryContent()}</div>

          {/* Navigation buttons */}
          <div className="absolute inset-0 flex items-center justify-between z-10 pointer-events-none">
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrevStory}
              disabled={currentStoryIndex === 0}
              className="h-12 w-12 text-white pointer-events-auto opacity-70 hover:opacity-100"
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNextStory}
              className="h-12 w-12 text-white pointer-events-auto opacity-70 hover:opacity-100"
            >
              <ChevronRight className="h-8 w-8" />
            </Button>
          </div>

          {/* Footer */}
          <div className="absolute bottom-0 left-0 right-0 z-20 p-4 flex items-center gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Reply to story..."
                className="w-full bg-white/10 backdrop-blur-sm text-white rounded-full py-2 px-4 pr-10 border border-white/20 focus:outline-none focus:border-white/50"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-white"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <Button variant="ghost" size="icon" className="text-white">
              <Heart className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white">
              <MessageCircle className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

