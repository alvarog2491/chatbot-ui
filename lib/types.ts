export type MessageRole = "user" | "assistant"

export interface Message {
    id: string
    role: MessageRole
    content: string
    timestamp: Date
}

export interface ApiResponse {
    completion?: string
    response?: string
    sessionId?: string
    error?: string
}
