# Netflix Clone Application

## Overview

This is a full-stack Netflix clone built with React, Express.js, and PostgreSQL. The application provides a streaming service interface where users can browse movies and TV shows, view content details, manage watchlists, and play videos. It features a modern UI with Netflix-style design patterns and responsive layouts.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development patterns
- **Routing**: Wouter for lightweight client-side routing with support for dynamic routes
- **State Management**: TanStack Query (React Query) for server state management and caching
- **UI Framework**: Radix UI components with shadcn/ui for accessible, customizable components
- **Styling**: Tailwind CSS with custom Netflix-themed color variables and responsive design
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework for RESTful API endpoints
- **Database ORM**: Drizzle ORM for type-safe database operations and schema management
- **API Design**: RESTful endpoints for content management, user operations, and watchlist functionality
- **Development Setup**: Hot reload with Vite integration for seamless full-stack development

### Data Storage
- **Primary Database**: PostgreSQL with Neon serverless for scalable cloud hosting
- **Schema Design**: Three main entities - users, content, and user_watchlist with proper relationships
- **Connection Pooling**: Neon serverless connection pooling for efficient database connections
- **Migrations**: Drizzle Kit for database schema migrations and version control

### Key Features
- **Content Browsing**: Browse movies and TV shows with filtering by type and genre
- **Content Discovery**: Trending content and Netflix Originals sections
- **Video Playback**: Custom video player with standard controls (play/pause, seek, volume)
- **Watchlist Management**: Add/remove content from personal watchlists
- **Responsive Design**: Mobile-first design that works across all device sizes
- **Search Functionality**: Search through content catalog with real-time results

### Authentication & Security
- The application structure suggests session-based authentication will be implemented
- Database schema includes user management with secure password storage
- API endpoints are structured to support user-specific operations

## External Dependencies

### Database & Infrastructure
- **Neon Database**: Serverless PostgreSQL hosting for scalable data storage
- **WebSocket Support**: ws library for Neon database WebSocket connections

### UI & Design System
- **Radix UI**: Comprehensive set of accessible, unstyled UI components
- **shadcn/ui**: Pre-built component library based on Radix UI with Tailwind styling
- **Lucide React**: Modern icon library for consistent iconography
- **Embla Carousel**: Touch-friendly carousel component for content rows

### Development & Build Tools
- **Vite**: Fast build tool with hot module replacement and optimized bundling
- **TypeScript**: Static typing for improved developer experience and code reliability
- **Drizzle Kit**: Database migration and schema management tools
- **PostCSS & Autoprefixer**: CSS processing for cross-browser compatibility

### Form & Data Validation
- **React Hook Form**: Performant form handling with minimal re-renders
- **Zod**: Runtime type validation and schema definition
- **Drizzle-Zod**: Integration between Drizzle ORM and Zod for type-safe validation

### Utility Libraries
- **date-fns**: Modern date manipulation and formatting
- **clsx & class-variance-authority**: Dynamic CSS class name generation
- **nanoid**: Unique ID generation for various application needs