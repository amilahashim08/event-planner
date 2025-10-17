# sa.bbi - Event Management Platform

## Overview

sa.bbi is a web-based event management platform designed to help users organize, plan, and track various types of events. The application provides a comprehensive dashboard for managing events, guest lists, team members, and other event-related activities. Built as a client-side single-page application (SPA) using vanilla JavaScript, HTML, and CSS.

## System Architecture

### Frontend Architecture
- **Single Page Application (SPA)**: Built with vanilla JavaScript for dynamic content rendering
- **Component-based Structure**: Modular approach with separate concerns for different features
- **State Management**: Global application state managed through the `AppState` object
- **Responsive Design**: Mobile-first approach with flexible layouts

### Technology Stack
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Icons**: Font Awesome 6.0.0
- **Images**: External Unsplash integration for avatars and media
- **Data Storage**: Client-side data management using JavaScript objects

## Key Components

### 1. Application State Management
- Centralized state management through `AppState` object
- Tracks current page, selected events, calendar view, and UI state
- Manages navigation and sidebar collapse states

### 2. User Interface Components
- **Header**: Navigation bar with logo, breadcrumbs, language selector, notifications, and profile dropdown
- **Sidebar**: Collapsible navigation menu for different sections
- **Main Content Area**: Dynamic content rendering based on current page
- **Modal System**: Event creation and detail viewing modals

### 3. Event Management Features
- Event creation and editing capabilities
- Event categorization (Wedding, Corporate, etc.)
- Progress tracking and status management
- Budget and guest count tracking

### 4. Calendar Integration
- Monthly calendar view for event visualization
- Navigation between months and years
- Event display on calendar dates

### 5. Team and Guest Management
- Team member assignment and role management
- Guest list management with RSVP tracking
- Contact information and relationship tracking

## Data Flow

### Data Structure
- Events stored as JavaScript objects with comprehensive metadata
- Each event includes: basic info, organizers, team members, guests, and progress data
- Sample data provided through `window.sampleEvents` global variable

### State Updates
1. User interactions trigger state changes in `AppState`
2. State changes trigger UI re-rendering
3. Dynamic content updates based on current page and selected items
4. Modal systems manage temporary state for forms and details

## External Dependencies

### Third-party Services
- **Font Awesome**: Icon library (CDN: cdnjs.cloudflare.com)
- **Unsplash**: Image service for avatars and placeholder images
- **External Image Assets**: Profile pictures and media content

### Browser APIs
- DOM manipulation for dynamic content
- Local storage potential for data persistence (not currently implemented)
- Event handling for user interactions

## Deployment Strategy

### Current Architecture
- **Static File Hosting**: Can be deployed on any static web server
- **Client-side Only**: No backend infrastructure required
- **CDN Dependencies**: Relies on external CDNs for Font Awesome

### Deployment Considerations
- All assets are self-contained except for external CDN resources
- No build process required - direct file serving
- Cross-browser compatibility maintained through standard web APIs

### Scalability Path
- Future backend integration possible for data persistence
- API integration potential for real-time updates
- Database integration ready for production data management

## Changelog

- July 03, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.