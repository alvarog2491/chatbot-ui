export const API_CONFIG = {
  endpoint: process.env.NEXT_PUBLIC_API_ENDPOINT || process.env.API_ENDPOINT || "",
  apiKey: process.env.NEXT_PUBLIC_API_KEY || process.env.API_KEY || "",
} as const

