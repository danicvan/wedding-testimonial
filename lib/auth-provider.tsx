"use client"

import type React from "react"

import { createContext, useEffect, useState } from "react"

interface User {
  id: string
  name: string
  email: string
  isAdmin: boolean
}

interface AuthContextType {
  user: User | null
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => void
  register: (name: string, email: string, password: string) => Promise<void>
}

export const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("wedding_stories_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    // In a real app, this would make an API call to authenticate
    // For demo purposes, we'll simulate a successful login

    // Simulate admin login with specific credentials
    const isAdmin = email === "admin@example.com" && password === "admin123"

    const user: User = {
      id: "user-1",
      name: isAdmin ? "Admin User" : email.split("@")[0],
      email,
      isAdmin,
    }

    setUser(user)
    localStorage.setItem("wedding_stories_user", JSON.stringify(user))
  }

  const register = async (name: string, email: string, password: string) => {
    // In a real app, this would make an API call to register
    // For demo purposes, we'll simulate a successful registration

    const user: User = {
      id: "user-" + Date.now(),
      name,
      email,
      isAdmin: false,
    }

    setUser(user)
    localStorage.setItem("wedding_stories_user", JSON.stringify(user))
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem("wedding_stories_user")
  }

  return <AuthContext.Provider value={{ user, signIn, signOut, register }}>{children}</AuthContext.Provider>
}

