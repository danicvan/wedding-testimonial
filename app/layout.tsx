import type React from "react"
import { Inter, Poppins, Playfair_Display, Montserrat, Roboto, Open_Sans } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/lib/auth-provider"
import { AIProvider } from "@/lib/ai-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ChatAssistant from "@/components/chat-assistant"
import "./globals.css"

// Load all fonts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
})

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
})

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
})

export const metadata = {
  title: "Wedding Stories - Share Your Special Day",
  description: "A social network for wedding testimonials and experiences",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`
      ${inter.variable} 
      ${poppins.variable} 
      ${playfair.variable} 
      ${montserrat.variable} 
      ${roboto.variable} 
      ${openSans.variable}
    `}
    >
      <head>
        {/* Preload images */}
        <link rel="preload" as="image" href="/images/wedding-hero.jpg" />
        <link rel="preload" as="image" href="/images/beach-wedding.jpg" />
        <link rel="preload" as="image" href="/images/barn-wedding.jpg" />
        <link rel="preload" as="image" href="/images/garden-wedding.jpg" />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            storageKey="wedding-stories-theme"
          >
            <AIProvider>
              <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
                <ChatAssistant />
                <Toaster />
              </div>
            </AIProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

