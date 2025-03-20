"use client"

import { useContext } from "react"
import { AIContext } from "./ai-provider"

export function useAI() {
  const context = useContext(AIContext)

  if (!context) {
    throw new Error("useAI must be used within an AIProvider")
  }

  return context
}

