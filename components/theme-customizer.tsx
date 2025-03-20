"use client"

import { useEffect, useState } from "react"
import { Check, ChevronDown, Palette } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

// Color themes
const themes = [
  {
    name: "Rose (Default)",
    primaryColor: "346 77% 49%",
    primaryLight: "#f43f5e",
    primaryDark: "#e11d48",
  },
  {
    name: "Blue",
    primaryColor: "221 83% 53%",
    primaryLight: "#3b82f6",
    primaryDark: "#2563eb",
  },
  {
    name: "Green",
    primaryColor: "142 71% 45%",
    primaryLight: "#22c55e",
    primaryDark: "#16a34a",
  },
  {
    name: "Purple",
    primaryColor: "270 76% 53%",
    primaryLight: "#8b5cf6",
    primaryDark: "#7c3aed",
  },
  {
    name: "Orange",
    primaryColor: "24 95% 53%",
    primaryLight: "#f97316",
    primaryDark: "#ea580c",
  },
  {
    name: "Teal",
    primaryColor: "172 66% 50%",
    primaryLight: "#14b8a6",
    primaryDark: "#0d9488",
  },
]

// Font families
const fonts = [
  {
    name: "Inter (Default)",
    value: "Inter, sans-serif",
  },
  {
    name: "Poppins",
    value: "Poppins, sans-serif",
  },
  {
    name: "Playfair Display",
    value: "Playfair Display, serif",
  },
  {
    name: "Montserrat",
    value: "Montserrat, sans-serif",
  },
  {
    name: "Roboto",
    value: "Roboto, sans-serif",
  },
  {
    name: "Open Sans",
    value: "Open Sans, sans-serif",
  },
]

export function ThemeCustomizer() {
  const [mounted, setMounted] = useState(false)
  const { theme: currentTheme, setTheme } = useTheme()
  const [currentFont, setCurrentFont] = useState("Inter, sans-serif")
  const [currentColor, setCurrentColor] = useState(themes[0])

  // Update the theme when the color changes
  useEffect(() => {
    if (mounted) {
      document.documentElement.style.setProperty("--primary", currentColor.primaryColor)

      // Store the selected color in localStorage
      localStorage.setItem("wedding-stories-color", JSON.stringify(currentColor))
    }
  }, [currentColor, mounted])

  // Update the font when it changes
  useEffect(() => {
    if (mounted) {
      document.documentElement.style.setProperty("--font-family", currentFont)

      // Apply the font to the body element as well for complete coverage
      document.body.style.fontFamily = currentFont

      // Store the selected font in localStorage
      localStorage.setItem("wedding-stories-font", currentFont)
    }
  }, [currentFont, mounted])

  // Load saved preferences
  useEffect(() => {
    setMounted(true)

    // Load saved color
    const savedColor = localStorage.getItem("wedding-stories-color")
    if (savedColor) {
      setCurrentColor(JSON.parse(savedColor))
    }

    // Load saved font
    const savedFont = localStorage.getItem("wedding-stories-font")
    if (savedFont) {
      setCurrentFont(savedFont)
    }
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="h-8 w-8">
          <Palette className="h-4 w-4" />
          <span className="sr-only">Customize theme</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Customize Theme</DialogTitle>
          <DialogDescription>Personalize the appearance of Wedding Stories.</DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="colors">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="colors">Colors</TabsTrigger>
            <TabsTrigger value="fonts">Fonts</TabsTrigger>
          </TabsList>
          <TabsContent value="colors" className="space-y-4 py-4">
            <div className="grid grid-cols-3 gap-2">
              {themes.map((theme) => (
                <button
                  key={theme.name}
                  onClick={() => setCurrentColor(theme)}
                  className={cn(
                    "relative flex h-16 flex-col items-center justify-between rounded-md p-2",
                    currentColor.name === theme.name ? "border-2 border-primary" : "border border-border",
                  )}
                  style={{
                    backgroundColor: currentTheme === "dark" ? theme.primaryDark : theme.primaryLight,
                  }}
                >
                  <span className="sr-only">{theme.name}</span>
                  <Check
                    className={cn(
                      "absolute right-1 top-1 h-4 w-4 text-white",
                      currentColor.name === theme.name ? "opacity-100" : "opacity-0",
                    )}
                  />
                  <span className="mt-auto text-xs text-white">{theme.name}</span>
                </button>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Mode</p>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="capitalize">
                    {currentTheme === "system" ? "System" : currentTheme}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </TabsContent>
          <TabsContent value="fonts" className="space-y-4 py-4">
            <div className="grid gap-2">
              {fonts.map((font) => (
                <button
                  key={font.name}
                  onClick={() => setCurrentFont(font.value)}
                  className={cn(
                    "flex items-center justify-between rounded-md border px-4 py-2",
                    currentFont === font.value ? "border-primary" : "border-border",
                  )}
                  style={{ fontFamily: font.value }}
                >
                  <span>{font.name}</span>
                  <Check
                    className={cn("h-4 w-4", currentFont === font.value ? "opacity-100 text-primary" : "opacity-0")}
                  />
                </button>
              ))}
            </div>
            <div className="rounded-md border p-4">
              <p className="text-sm text-muted-foreground mb-2">Preview:</p>
              <p className="text-xl font-semibold" style={{ fontFamily: currentFont }}>
                Wedding Stories
              </p>
              <p className="text-sm text-muted-foreground" style={{ fontFamily: currentFont }}>
                Share your special day with the world.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

