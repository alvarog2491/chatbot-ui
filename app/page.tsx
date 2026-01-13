"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Send, Bot } from "lucide-react"
import { API_CONFIG } from "@/lib/api-config"
import { Message, ApiResponse } from "@/lib/types"
import { ChatMessage, LoadingMessage } from "@/components/chat-message"

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId] = useState(`session-${Date.now()}`)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Initialize with current time on client side to avoid hydration errors
  useEffect(() => {
    setMessages([
      {
        id: "1",
        role: "assistant",
        content: "Hello! I'm your AI assistant. How can I help you today?",
        timestamp: new Date(),
      },
    ])
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    console.log("Attempting to fetch from:", API_CONFIG.endpoint);

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    const userInput = input
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch(API_CONFIG.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_CONFIG.apiKey,
          Accept: "application/json",
        },
        body: JSON.stringify({
          inputText: userInput,
          sessionId: sessionId,
          enableTrace: true,
        }),
      })

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`)
      }

      const data: ApiResponse = await response.json()
      const botResponse = data.completion || "I'm sorry, I couldn't process that request at the moment."

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: botResponse,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error sending message:", error)
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "I encountered an error while processing your request. Please check your network connection and try again.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 selection:bg-indigo-100">
      <Card className="w-full max-w-4xl h-[700px] md:h-[800px] flex flex-col shadow-xl bg-white border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center shadow-md">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-900 tracking-tight">
                  AI Assistant
                </h1>
                <p className="text-sm font-medium text-slate-500">
                  Online
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-200">
          {messages.length === 0 && !isLoading && (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <h2 className="text-xl font-semibold text-slate-400">How can I help you?</h2>
            </div>
          )}

          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}

          {isLoading && <LoadingMessage />}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="p-6 border-t border-slate-200 bg-slate-50/50 mt-auto">
          <form onSubmit={sendMessage} className="max-w-3xl mx-auto">
            <div className="relative flex items-center gap-3 bg-white border border-slate-200 rounded-xl p-2 transition-shadow focus-within:shadow-md">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-transparent border-none text-slate-900 placeholder:text-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0 px-4 py-6"
                disabled={isLoading}
              />
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim() || isLoading}
                className={`w-12 h-12 rounded-lg transition-colors ${input.trim() && !isLoading
                  ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                  : "bg-slate-100 text-slate-400"
                  }`}
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  )
}
