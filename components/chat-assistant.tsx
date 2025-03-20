"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageCircle, Send, X, Image, Paperclip, Smile } from "lucide-react"
import { useAI } from "@/lib/use-ai"

// Sample responses for common wedding questions
const sampleResponses = {
  hello: "Hello! I'm your wedding assistant. How can I help you today?",
  hi: "Hi there! I'm here to help with your wedding questions. What can I assist you with?",
  help: "I can help with wedding planning, venue suggestions, budget tips, timeline planning, and more. What specific area do you need help with?",
  venue:
    "Finding the perfect venue is crucial! Consider your guest count, budget, and preferred style. Would you like indoor or outdoor? Rustic or elegant? I can suggest some options based on your preferences.",
  budget:
    "Creating a wedding budget is a great first step! Typically, allocate about 50% for venue and catering, 10% for attire, 10% for photography, 10% for decor, and the rest for other elements. What's your total budget?",
  dress:
    "Wedding dresses come in many styles! A-line dresses flatter most body types, ball gowns are perfect for formal weddings, and sheath dresses offer a sleek look. Have you considered any particular style?",
  photographer:
    "A good wedding photographer is worth the investment! Look for someone whose style matches your vision, read reviews, and always meet before booking. Would you like tips on questions to ask photographers?",
  invitation:
    "Wedding invitations should be sent 6-8 weeks before the wedding. Include the date, time, location, dress code, and RSVP details. Are you looking for design ideas or wording suggestions?",
  music:
    "Music sets the tone for your wedding! Consider a string quartet for the ceremony, a DJ for the reception, or a live band for a more energetic atmosphere. What kind of music do you and your partner enjoy?",
  food: "Food is a highlight of any wedding! Popular options include plated dinners, buffets, food stations, or family-style service. Consider dietary restrictions and seasonal ingredients. What cuisine do you prefer?",
  flowers:
    "Flowers add beauty and personality to your wedding! Popular choices include roses, peonies, and lilies. Consider seasonal availability for better pricing. What colors are you considering for your wedding?",
  timeline:
    "A typical wedding day timeline includes: getting ready (3-4 hours), ceremony (30-60 minutes), photos (1-2 hours), cocktail hour, reception (4-5 hours). Would you like a more detailed breakdown?",
  vows: "Writing personal vows can be meaningful! Start by reflecting on your relationship, include promises, and keep it concise (1-2 minutes). Would you like some example structures to help you get started?",
  honeymoon:
    "Popular honeymoon destinations include Bali, Maldives, Italy, and Hawaii. Consider your interests as a couple - adventure, relaxation, culture, or food. What type of experience are you looking for?",
  "thank you":
    "You're welcome! I'm happy to help with your wedding planning. Feel free to ask if you have any other questions!",
}

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")
  const { messages, sendMessage, isLoading } = useAI()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      sendMessage(message)
      setMessage("")
    }
  }

  // Enhanced AI response with sample responses
  const enhancedSendMessage = (text: string) => {
    // Add user message to chat
    const userMessage = { role: "user", content: text }

    // Check if we have a predefined response
    const lowerText = text.toLowerCase()
    let responseContent = ""

    // Check for keywords in the message
    for (const [keyword, response] of Object.entries(sampleResponses)) {
      if (lowerText.includes(keyword)) {
        responseContent = response
        break
      }
    }

    // If no predefined response, use a generic one
    if (!responseContent) {
      responseContent =
        "That's a great question about wedding planning! I'd be happy to help with that. Could you provide a bit more detail so I can give you the most relevant advice?"
    }

    // Simulate typing delay
    setTimeout(() => {
      sendMessage(text)
    }, 500)
  }

  const suggestedQuestions = [
    "How do I create a wedding budget?",
    "What are popular wedding venues?",
    "When should I send invitations?",
    "Tips for choosing a photographer?",
    "How to write wedding vows?",
  ]

  return (
    <>
      {isOpen ? (
        <Card className="fixed bottom-4 right-4 w-80 md:w-96 shadow-lg z-50 max-h-[80vh] flex flex-col">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="/images/ai-assistant.jpg" alt="AI Assistant" />
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
                Wedding Assistant
              </CardTitle>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden">
            <div className="h-[350px] overflow-y-auto space-y-4 pr-2">
              {messages.length === 0 ? (
                <>
                  <div className="text-center text-muted-foreground py-4">
                    <p className="font-medium">Hello! I'm your wedding assistant.</p>
                    <p className="mt-1">How can I help you today?</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">Try asking:</p>
                    {suggestedQuestions.map((question, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="text-xs w-full justify-start h-auto py-2 px-3"
                        onClick={() => enhancedSendMessage(question)}
                      >
                        {question}
                      </Button>
                    ))}
                  </div>
                </>
              ) : (
                messages.map((msg, index) => (
                  <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    {msg.role === "assistant" && (
                      <Avatar className="h-6 w-6 mr-2 mt-1 flex-shrink-0">
                        <AvatarImage src="/images/ai-assistant.jpg" alt="AI" />
                        <AvatarFallback>AI</AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`max-w-[80%] rounded-lg px-3 py-2 ${
                        msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))
              )}
              {isLoading && (
                <div className="flex justify-start">
                  <Avatar className="h-6 w-6 mr-2 mt-1 flex-shrink-0">
                    <AvatarImage src="/images/ai-assistant.jpg" alt="AI" />
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                  <div className="max-w-[80%] rounded-lg px-3 py-2 bg-muted">
                    <div className="flex gap-1">
                      <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce"></div>
                      <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce delay-75"></div>
                      <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce delay-150"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
          <CardFooter className="border-t pt-2">
            <form onSubmit={handleSendMessage} className="flex w-full gap-2">
              <div className="flex items-center gap-2 border rounded-md flex-1 px-2">
                <Input
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <Button type="button" variant="ghost" size="icon" className="h-8 w-8">
                  <Smile className="h-5 w-5 text-muted-foreground" />
                </Button>
                <Button type="button" variant="ghost" size="icon" className="h-8 w-8">
                  <Paperclip className="h-5 w-5 text-muted-foreground" />
                </Button>
                <Button type="button" variant="ghost" size="icon" className="h-8 w-8">
                  <Image className="h-5 w-5 text-muted-foreground" />
                </Button>
              </div>
              <Button type="submit" size="icon" disabled={isLoading || !message.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      ) : (
        <Button
          className="fixed bottom-4 right-4 rounded-full h-12 w-12 shadow-lg z-50"
          onClick={() => setIsOpen(true)}
        >
          <MessageCircle className="h-6 w-6" />
          <span className="sr-only">Open chat assistant</span>
        </Button>
      )}
    </>
  )
}

