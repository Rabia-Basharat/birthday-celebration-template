# Overview

This is a birthday tribute web application built for a full-stack engineer celebrating another year. The application combines love and technology in an interactive birthday experience featuring an animated photo gallery journey from childhood to present, interactive timeline showcasing life milestones, and a tech-themed romantic design with custom color schemes. The site includes personalized messaging that acknowledges his strict but caring personality and integrates his favorite music.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **State Management**: TanStack Query for server state management
- **Build Tool**: Vite for fast development and optimized builds

## Backend Architecture  
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Pattern**: RESTful API with `/api` prefix
- **Middleware**: Custom logging middleware for API requests
- **Error Handling**: Centralized error handling with status code mapping
- **Development**: Hot module replacement via Vite integration

## Data Storage Solutions
- **Database**: PostgreSQL configured via Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Schema Management**: Drizzle Kit for migrations and schema generation
- **Fallback Storage**: In-memory storage implementation for development
- **Session Storage**: PostgreSQL-backed sessions using connect-pg-simple

## Authentication and Authorization
- **Session Management**: Express sessions with PostgreSQL storage
- **User Schema**: Basic user model with username/password fields
- **Password Handling**: Ready for bcrypt integration (not yet implemented)
- **CRUD Operations**: Interface-based storage pattern for user management

## External Dependencies
- **Database**: Neon Database for PostgreSQL hosting
- **Fonts**: Google Fonts (Playfair Display and Inter)
- **Icons**: Lucide React for consistent iconography
- **Animations**: CSS-based animations with Tailwind utilities
- **Date Utilities**: date-fns for date formatting and manipulation
- **Development**: Replit-specific plugins for cartographer and error overlay