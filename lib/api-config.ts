const isDev = process.env.NODE_ENV === 'development';

export const API_CONFIG = {
  endpoint: isDev ? '/api/' : (process.env.NEXT_PUBLIC_API_ENDPOINT || process.env.API_ENDPOINT || ""),
  apiKey: process.env.NEXT_PUBLIC_API_KEY || "",
} as const

