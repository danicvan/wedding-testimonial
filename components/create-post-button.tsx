"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MediaUpload } from "@/components/media-upload"
import { useToast } from "@/hooks/use-toast"

export function CreatePostButton() {
  const { toast } = useToast()
  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const [uploadType, setUploadType] = useState<"post" | "story" | "reel">("post")

  const handleUpload = (data: any) => {
    // In a real app, you would process the upload data here
    console.log("Upload data:", data)

    toast({
      title: `${uploadType.charAt(0).toUpperCase() + uploadType.slice(1)} created`,
      description: `Your ${uploadType} has been created successfully.`,
    })
  }

  const openUpload = (type: "post" | "story" | "reel") => {
    setUploadType(type)
    setIsUploadOpen(true)
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="sm" className="gap-1">
            <PlusCircle className="h-4 w-4" />
            <span>Create</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => openUpload("post")}>Create Post</DropdownMenuItem>
          <DropdownMenuItem onClick={() => openUpload("story")}>Add to Story</DropdownMenuItem>
          <DropdownMenuItem onClick={() => openUpload("reel")}>Create Reel</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <MediaUpload
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUpload={handleUpload}
        type={uploadType}
      />
    </>
  )
}

