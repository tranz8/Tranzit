# AI Chat Application

## Overview

This is a full-stack AI chat application built with React, TypeScript, Express, and Drizzle ORM. The application allows users to have conversations with an AI assistant (GPT-4o) through a modern, responsive web interface. It features real-time chat functionality, session management, and a polished UI built with shadcn/ui components.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API endpoints for chat operations
- **Session Management**: In-memory storage with database schema ready
- **AI Integration**: OpenAI GPT-4o for chat responses

### Data Storage Solutions
- **ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured via Neon serverless)
- **Current State**: In-memory storage (MemStorage) for development
- **Session Storage**: Browser sessionStorage for username and session persistence

## Key Components

### Database Schema
Located in `shared/schema.ts`:
- **users**: User authentication and profiles
- **chatSessions**: Chat session tracking with unique session IDs
- **messages**: Individual chat messages with sender identification

### API Endpoints
- `POST /api/chat/session` - Create or retrieve chat sessions
- `GET /api/chat/:sessionId/messages` - Fetch messages for a session
- `POST /api/chat/:sessionId/message` - Send message and get AI response

### Frontend Components
- **ChatInterface**: Main chat UI with message display and input
- **MessageBubble**: Individual message rendering with timestamps
- **TypingIndicator**: Visual feedback during AI response generation
- **UsernameModal**: Initial user onboarding

### Storage Layer
- **IStorage Interface**: Abstraction for data persistence
- **MemStorage**: In-memory implementation for development
- **Database Ready**: Drizzle schema prepared for PostgreSQL migration

## Data Flow

1. **User Onboarding**: Username collection and session creation
2. **Session Management**: Unique session IDs track conversation context
3. **Message Exchange**: 
   - User sends message → API stores it → Forwards to OpenAI
   - AI response received → Stored in database → Sent to frontend
4. **Real-time Updates**: TanStack Query manages cache invalidation and updates

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL serverless connection
- **OpenAI**: GPT-4o integration for AI responses
- **Drizzle ORM**: Type-safe database operations
- **TanStack Query**: Server state management
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first styling

### Development Tools
- **Vite**: Build tool with HMR
- **TypeScript**: Type safety across the stack
- **ESBuild**: Server-side bundling for production

## Deployment Strategy

### Development
- **Command**: `npm run dev`
- **Features**: Hot module replacement, TypeScript compilation, concurrent client/server
- **Port**: 5000 (configured in .replit)

### Production Build
- **Client**: Vite builds to `dist/public`
- **Server**: ESBuild bundles to `dist/index.js`
- **Environment**: Node.js production mode

### Replit Configuration
- **Modules**: Node.js 20, Web, PostgreSQL 16
- **Auto-deploy**: Configured for autoscale deployment
- **Build Process**: `npm run build`
- **Runtime**: `npm run start`

## Changelog

```
Changelog:
- June 15, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```