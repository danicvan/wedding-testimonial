"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Image, Film, Music, Upload, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface MediaUploadProps {
  isOpen: boolean
  onClose: () => void
  onUpload: (data: any) => void
  type?: "post" | "story" | "reel"
}

export function MediaUpload({ isOpen, onClose, onUpload, type = "post" }: MediaUploadProps) {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState<string>("photo")
  const [caption, setCaption] = useState("")
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  // Update the handleFileChange function to handle real file uploads
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const newFiles: File[] = []
    const newPreviews: string[] = []

    // Process each file
    Array.from(files).forEach((file) => {
      // Validate file type based on active tab
      if (
        (activeTab === "photo" && !file.type.startsWith("image/")) ||
        (activeTab === "video" && !file.type.startsWith("video/")) ||
        (activeTab === "audio" && !file.type.startsWith("audio/"))
      ) {
        toast({
          title: "Invalid file type",
          description: `Please select a ${activeTab} file.`,
          variant: "destructive",
        })
        return
      }

      // Validate file size
      const maxSize = activeTab === "photo" ? 10 : activeTab === "video" ? 100 : 20 // MB
      if (file.size > maxSize * 1024 * 1024) {
        toast({
          title: "File too large",
          description: `Maximum file size for ${activeTab} is ${maxSize}MB.`,
          variant: "destructive",
        })
        return
      }

      // Create preview URL
      const previewUrl = URL.createObjectURL(file)
      newFiles.push(file)
      newPreviews.push(previewUrl)
    })

    setSelectedFiles((prev) => [...prev, ...newFiles])
    setPreviews((prev) => [...prev, ...newPreviews])
  }

  const removeFile = (index: number) => {
    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(previews[index])

    setSelectedFiles((prev) => prev.filter((_, i) => i !== index))
    setPreviews((prev) => prev.filter((_, i) => i !== index))
  }

  // Modificar a função handleSubmit para não armazenar as imagens no localStorage
  const handleSubmit = () => {
    if (selectedFiles.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select at least one file to upload.",
        variant: "destructive",
      })
      return
    }

    // Em uma aplicação real, você enviaria os arquivos para um servidor
    toast({
      title: "Processando arquivos",
      description: "Seus arquivos estão sendo processados...",
    })

    // Usar as URLs de objeto diretamente em vez de converter para Data URLs
    const processFiles = async () => {
      // Não vamos mais armazenar no localStorage para evitar o erro de quota
      const uploadData = {
        type: activeTab,
        files: selectedFiles,
        caption,
        uploadType: type,
        timestamp: new Date().toISOString(),
        // Usar as URLs de objeto diretamente
        fileUrls: previews,
        // Adicionar metadados para facilitar a recuperação
        metadata: {
          fileNames: selectedFiles.map((file) => file.name),
          fileTypes: selectedFiles.map((file) => file.type),
        },
      }

      onUpload(uploadData)

      toast({
        title: "Upload concluído",
        description: `Seu ${type} foi publicado com sucesso.`,
      })

      // Resetar formulário
      setSelectedFiles([])
      setPreviews([])
      setCaption("")

      // Fechar diálogo
      onClose()
    }

    processFiles()
  }

  // Atualizar o renderPreviews para mostrar as imagens reais
  const renderPreviews = () => {
    if (previews.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-md p-12 text-center">
          <Upload className="h-8 w-8 text-muted-foreground mb-2" />
          <p className="text-sm font-medium mb-1">Arraste e solte seus arquivos aqui ou clique para navegar</p>
          <p className="text-xs text-muted-foreground">
            {activeTab === "photo" && "Suporta: JPG, PNG, GIF (Máx 10MB)"}
            {activeTab === "video" && "Suporta: MP4, MOV, AVI (Máx 100MB)"}
            {activeTab === "audio" && "Suporta: MP3, WAV, OGG (Máx 20MB)"}
          </p>
          <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="mt-4">
            Selecionar Arquivos
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            multiple={type !== "story"}
            accept={activeTab === "photo" ? "image/*" : activeTab === "video" ? "video/*" : "audio/*"}
          />
        </div>
      )
    }

    return (
      <div className="grid grid-cols-2 gap-4 mt-4">
        {previews.map((preview, index) => (
          <div key={index} className="relative group">
            {activeTab === "photo" && (
              <div className="w-full h-40 rounded-md overflow-hidden">
                <img
                  src={preview || "/placeholder.svg"}
                  alt={`Preview ${index}`}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            {activeTab === "video" && (
              <div className="w-full h-40 rounded-md overflow-hidden">
                <video src={preview} className="w-full h-full object-cover" controls />
              </div>
            )}
            {activeTab === "audio" && (
              <div className="w-full h-40 bg-muted rounded-md flex items-center justify-center">
                <audio src={preview} controls className="w-full px-4" />
              </div>
            )}
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => removeFile(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <div className="flex items-center justify-center border-2 border-dashed rounded-md h-40">
          <Button variant="ghost" onClick={() => fileInputRef.current?.click()} className="flex flex-col items-center">
            <Upload className="h-6 w-6 mb-2" />
            <span>Adicionar Mais</span>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {type === "post" && "Create New Post"}
            {type === "story" && "Add to Your Story"}
            {type === "reel" && "Create New Reel"}
          </DialogTitle>
          <DialogDescription>
            {type === "post" && "Share your wedding moments with your followers."}
            {type === "story" && "Share a moment that will disappear after 24 hours."}
            {type === "reel" && "Create a short video to showcase your wedding highlights."}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="photo" value={activeTab} onValueChange={handleTabChange}>
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="photo" className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              <span>Photo</span>
            </TabsTrigger>
            <TabsTrigger value="video" className="flex items-center gap-2">
              <Film className="h-4 w-4" />
              <span>Video</span>
            </TabsTrigger>
            <TabsTrigger value="audio" className="flex items-center gap-2">
              <Music className="h-4 w-4" />
              <span>Audio</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="photo" className="space-y-4 mt-4">
            {renderPreviews()}
          </TabsContent>

          <TabsContent value="video" className="space-y-4 mt-4">
            {renderPreviews()}
          </TabsContent>

          <TabsContent value="audio" className="space-y-4 mt-4">
            {renderPreviews()}
          </TabsContent>
        </Tabs>

        <div className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="caption">Caption</Label>
            <Textarea
              id="caption"
              placeholder="Write a caption..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={selectedFiles.length === 0}>
            {type === "post" ? "Post" : type === "story" ? "Share Story" : "Share Reel"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

