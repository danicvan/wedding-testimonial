"use client"

import type React from "react"

import { createContext, useState } from "react"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

interface Message {
  role: "user" | "assistant"
  content: string
}

interface AIContextType {
  messages: Message[]
  sendMessage: (message: string) => Promise<void>
  isLoading: boolean
}

export const AIContext = createContext<AIContextType | null>(null)

export function AIProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Sample responses for common wedding questions
  const sampleResponses: Record<string, string> = {
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

  const sendMessage = async (message: string) => {
    setIsLoading(true)

    // Add user message to the chat
    const newMessages = [...messages, { role: "user", content: message }]
    setMessages(newMessages)

    try {
      // Check for keywords in the message
      const lowerMessage = message.toLowerCase()
      let responseContent = ""

      for (const [keyword, response] of Object.entries(sampleResponses)) {
        if (lowerMessage.includes(keyword)) {
          responseContent = response
          break
        }
      }

      // If no predefined response, use a generic one
      if (!responseContent) {
        // In a real app, this would use the actual OpenAI API
        // For demo purposes, we'll simulate a response

        // Prepare the prompt with conversation history
        const prompt = newMessages
          .map((msg) => `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`)
          .join("\n")

        // Generate a response using AI SDK
        const response = await generateText({
          model: openai("gpt-4o"),
          prompt: `You are a helpful wedding assistant. Respond to the following conversation:\n\n${prompt}\n\nAssistant:`,
          system:
            "You are a helpful wedding assistant that provides advice, tips, and answers questions about weddings, planning, and related topics. Be friendly, supportive, and informative.",
        })

        responseContent = response.text
      } else {
        // Simulate API delay for predefined responses
        await new Promise((resolve) => setTimeout(resolve, 1000))
      }

      // Add assistant response to the chat
      setMessages([...newMessages, { role: "assistant", content: responseContent }])
    } catch (error) {
      console.error("Error generating AI response:", error)
      // Add a fallback response
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "I'm sorry, I'm having trouble connecting right now. Please try again later.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return <AIContext.Provider value={{ messages, sendMessage, isLoading }}>{children}</AIContext.Provider>
}

