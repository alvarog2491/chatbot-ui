"use client"

import { Bot, User } from "lucide-react"
import { MarkdownMessage } from "@/components/markdown-message"
import { Message } from "@/lib/types"

interface ChatMessageProps {
    message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
    const isAssistant = message.role === "assistant"

    return (
        <div className={`flex gap-3 ${!isAssistant ? "justify-end" : "justify-start"}`}>
            {isAssistant && (
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 shadow-sm animate-in fade-in zoom-in duration-300">
                    <Bot className="w-4 h-4 text-primary-foreground" />
                </div>
            )}
            <div
                className={`max-w-[85%] md:max-w-[75%] rounded-2xl px-4 py-3 shadow-sm transition-all animate-in slide-in-from-bottom-2 duration-300 ${!isAssistant
                        ? "bg-primary text-primary-foreground rounded-tr-none"
                        : "bg-muted text-muted-foreground rounded-tl-none"
                    }`}
            >
                <div className="text-sm">
                    {isAssistant ? (
                        <MarkdownMessage content={message.content} />
                    ) : (
                        <p className="leading-relaxed whitespace-pre-wrap">{message.content}</p>
                    )}
                </div>
                <span
                    className="text-[10px] opacity-60 mt-1.5 block font-medium uppercase tracking-wider"
                    suppressHydrationWarning
                >
                    {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </span>
            </div>
            {!isAssistant && (
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 shadow-sm animate-in fade-in zoom-in duration-300">
                    <User className="w-4 h-4 text-secondary-foreground" />
                </div>
            )}
        </div>
    )
}

export function LoadingMessage() {
    return (
        <div className="flex gap-3 justify-start animate-in fade-in slide-in-from-left-2 duration-300">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 shadow-sm">
                <Bot className="w-4 h-4 text-primary-foreground" />
            </div>
            <div className="bg-muted rounded-2xl px-4 py-3 rounded-tl-none shadow-sm">
                <div className="flex gap-1.5 items-center h-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce [animation-duration:0.8s]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce [animation-delay:0.2s] [animation-duration:0.8s]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce [animation-delay:0.4s] [animation-duration:0.8s]" />
                </div>
            </div>
        </div>
    )
}
