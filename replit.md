# TRANZ8 - Yemen Logistics and Shipping Platform

## Overview

TRANZ8 is a modern, bilingual (Arabic/English) logistics and shipping platform designed specifically for the Yemeni market. The application provides comprehensive shipping services including full container shipping, partial shipping, domestic transport, and international shopping assistance. Built with a focus on user experience and cultural relevance, the platform features right-to-left (RTL) language support and a responsive design optimized for both desktop and mobile users.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Routing**: Wouter (lightweight React router)
- **Animations**: Framer Motion for smooth transitions and interactions
- **State Management**: React Query (TanStack Query) for server state
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **API Design**: RESTful architecture
- **Development**: Hot module replacement via Vite integration

### Database Strategy
- **ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured via Drizzle config)
- **Connection**: Neon Database serverless connection
- **Migrations**: Drizzle Kit for schema management
- **Development Storage**: In-memory storage implementation for rapid prototyping

## Key Components

### Multi-language Support
- Context-based language switching between Arabic (RTL) and English (LTR)
- Comprehensive translation system with structured JSON-based translations
- Dynamic text direction and layout adaptation
- Font optimization for Arabic (Tajawal) and English (Inter) typography

### User Interface Components
- **Design System**: shadcn/ui with custom theme configuration
- **Responsive Design**: Mobile-first approach with breakpoint-specific optimizations
- **Accessibility**: ARIA compliance and keyboard navigation support
- **Loading States**: Custom loading screens and skeleton components

### Business Logic Modules
- **Shipment Tracking**: Real-time tracking with status updates
- **Quote Management**: Customer inquiry and quote request system
- **Service Portfolio**: Full shipping, partial shipping, domestic transport, and shopping services
- **Contact System**: Multi-channel communication (WhatsApp integration, forms, direct contact)

## Data Flow

### Client-Server Communication
1. **API Requests**: Centralized API client with automatic error handling
2. **Data Validation**: Shared Zod schemas between client and server
3. **State Management**: React Query for caching, synchronization, and background updates
4. **Form Submission**: Validated form data flows through React Hook Form to API endpoints

### Database Operations
1. **Schema Definition**: Shared TypeScript schemas for type safety
2. **Query Processing**: Drizzle ORM handles database interactions
3. **Data Transformation**: Automatic serialization/deserialization of database records
4. **Validation**: Server-side validation using shared Zod schemas

## External Dependencies

### Core Dependencies
- **UI Framework**: React 18, React DOM, React Router (Wouter)
- **Styling**: Tailwind CSS, PostCSS, Autoprefixer
- **Database**: Drizzle ORM, Neon Database serverless
- **Validation**: Zod for schema validation
- **HTTP Client**: Fetch API with custom wrapper
- **Development**: Vite, TypeScript, ESBuild

### Third-party Integrations
- **WhatsApp Business**: Direct messaging integration
- **Font Services**: Google Fonts for typography
- **Image Hosting**: Unsplash for placeholder images
- **Icon Library**: Lucide React for consistent iconography

## Deployment Strategy

### Development Environment
- **Platform**: Replit with Node.js 20 runtime
- **Database**: PostgreSQL 16 module
- **Hot Reload**: Vite development server with HMR
- **Port Configuration**: Development server on port 5000

### Production Build
- **Client Build**: Vite production build with asset optimization
- **Server Build**: ESBuild compilation for Node.js deployment
- **Static Assets**: Served from dist/public directory
- **Deployment Target**: Auto-scaling deployment on Replit

### Environment Configuration
- **Development**: `npm run dev` - Concurrent client/server development
- **Production**: `npm run build && npm run start` - Optimized production deployment
- **Database**: Environment-based DATABASE_URL configuration

## Changelog

```
Changelog:
- June 15, 2025. Initial setup
- June 15, 2025. Major website upgrade with:
  * Official TRANZ8 logo integration
  * Updated company statistics (9,450+ shipments, 98.7% satisfaction, 12,000+ support hours, 22 governorates)
  * Enhanced services: Full/Partial shipping, Domestic transport, Customs clearance, International shopping, Logistics consulting
  * Real-time animated achievements section with count-up animations
  * Interactive Yemen coverage map showing all 22 governorates
  * Official contact information (+967777030198, info@tranz8.com)
  * Improved animations and modern design elements
  * WhatsApp integration with official number
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```