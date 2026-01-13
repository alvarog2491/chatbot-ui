# Chatbot UI

## Overview

This repository contains a chatbot web interface built with **Next.js** and **React**. It is designed to connect to an API backend to provide a chat interface for users.

## Project Structure

```
.
├── app/                    # Next.js app directory
├── components/             # React components
├── lib/                    # Utility functions and configuration
│   └── api-config.ts       # API endpoint configuration
├── public/                 # Static assets
├── styles/                 # Global styles
├── cdk/                    # AWS CDK infrastructure
│   ├── bin/                # CDK app entry point
│   ├── lib/                # CDK stack definitions
│   └── README.md           # CDK deployment guide
└── package.json            # Next.js dependencies
```

To use this chatbot with your own API endpoints, follow these steps:

1. **Environment Variables**: Create a `.env.local` file in the root directory (copy from `.env.example`):
   ```bash
   cp .env.example .env.local
   ```
2. **Update Values**: Update the variables in `.env.local`:
   - `API_ENDPOINT`: Your API endpoint URL
   - `API_KEY`: Your API authentication key

## Local Development

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Run the development server:
   ```bash
   pnpm dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment to AWS

This project includes AWS CDK infrastructure for deployment to S3 + CloudFront.

### Quick Start

1. Navigate to the CDK directory:
   ```bash
   cd cdk
   ```

2. Install CDK dependencies:
   ```bash
   npm install
   ```

3. Deploy to AWS:
   ```bash
   cdk deploy
   ```

After deployment completes, the CloudFront URL will be displayed in the outputs. You can access your application directly at the provided URL:

```
Outputs:
ChatbotUIStack.WebsiteUrl = https://d1234567890.cloudfront.net
```

## Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS v4, Lucide Icons
- **Infrastructure**: AWS CDK (Infrastructure as Code), S3, CloudFront
- **Package Manager**: pnpm