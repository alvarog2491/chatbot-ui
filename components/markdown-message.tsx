"use client"

import type React from "react"

interface MarkdownMessageProps {
  content: string
}

export function MarkdownMessage({ content }: MarkdownMessageProps) {
  const renderContent = (text: string) => {
    const lines = text.split("\n")
    const elements: React.ReactNode[] = []
    let currentList: string[] = []
    let listKey = 0

    const flushList = () => {
      if (currentList.length > 0) {
        elements.push(
          <ul key={`list-${listKey++}`} className="my-2 space-y-1.5 pl-4">
            {currentList.map((item, idx) => (
              <li key={idx} className="flex gap-2">
                <span className="text-indigo-400 mt-0.5">•</span>
                <span className="flex-1">{parseInlineMarkdown(item)}</span>
              </li>
            ))}
          </ul>,
        )
        currentList = []
      }
    }

    const parseInlineMarkdown = (text: string): React.ReactNode[] => {
      const parts: React.ReactNode[] = []
      let lastIndex = 0
      const boldRegex = /\*\*(.*?)\*\*/g
      let match

      while ((match = boldRegex.exec(text)) !== null) {
        if (match.index > lastIndex) {
          parts.push(text.substring(lastIndex, match.index))
        }
        parts.push(
          <strong key={match.index} className="font-semibold text-foreground">
            {match[1]}
          </strong>,
        )
        lastIndex = match.index + match[0].length
      }

      if (lastIndex < text.length) {
        parts.push(text.substring(lastIndex))
      }

      return parts.length > 0 ? parts : [text]
    }

    lines.forEach((line, idx) => {
      const trimmedLine = line.trim()

      // Handle list items
      if (trimmedLine.startsWith("- ")) {
        currentList.push(trimmedLine.substring(2))
      } else {
        flushList()

        // Handle empty lines
        if (trimmedLine !== "") {
          // Regular text with inline markdown
          elements.push(
            <p key={`p-${idx}`} className="leading-relaxed">
              {parseInlineMarkdown(trimmedLine)}
            </p>,
          )
        }
      }
    })

    flushList()
    return elements
  }

  return <div className="space-y-0.5">{renderContent(content)}</div>
}
