# Amanotes Piano Roll 🎹
**Technical Assessment Project**

A full-stack web application demonstrating modern development practices through an interactive piano roll interface for musical composition management. This project showcases proficiency in Ruby on Rails, React TypeScript, and scalable application architecture.

## 🌐 Live Demo
**🚀 [Visit the Live Application](https://amanotes-piano-roll-rb2qgkhvm-viet-dos-projects-ff96f841.vercel.app/)**

## 🎯 Project Highlights

This application demonstrates:
- **Full-Stack Development**: Complete Rails API + React frontend integration
- **Modern Architecture**: Clean separation of concerns with RESTful API design
- **Performance Optimization**: Efficient state management and UI rendering
- **Professional UI/UX**: Industry-standard component library integration
- **Production Deployment**: Successfully deployed and accessible online

## 🚀 Key Features & Technical Challenges Solved

### Core Functionality
- **Interactive Piano Roll**: Complex grid-based interface with real-time note manipulation
- **Multi-track Audio Editing**: Support for up to 8 concurrent tracks with instrument assignment
- **CRUD Operations**: Complete song/track/note lifecycle management with proper validation
- **Tag System**: Flexible categorization and filtering capabilities

### Technical Solutions Implemented
- **Performance Optimization**: Solved UI blocking issues in large grid rendering (100+ rows/columns)
- **State Synchronization**: Implemented optimistic updates with fallback error handling
- **Memory Management**: Efficient cell lookup using Map data structures (O(1) vs O(n))
- **API Design**: Clean separation between song metadata and detailed track/note data
- **Error Handling**: Comprehensive validation and user-friendly error messages

## 🏗️ Technical Architecture

### Backend Implementation (Ruby on Rails 7.2)
- **API-First Design**: RESTful JSON API with JSONAPI serializers for consistent response formatting
- **Database Design**: PostgreSQL with properly normalized relationships and foreign key constraints
- **Modular Architecture**: Separate controllers for each resource (songs, tracks, notes, instruments)
- **Business Logic**: Track limit validation (max 8 per song), proper error handling
- **Performance**: Includes queries and optimized serialization

### Frontend Implementation (React 18 + TypeScript)
- **Type Safety**: Full TypeScript integration with custom type definitions
- **State Management**:
  - Zustand for global UI state (modals, selections)
  - React Query for server state caching and synchronization
- **Component Architecture**: Reusable components with proper separation of concerns
- **Performance Optimizations**:
  - Memoized expensive calculations
  - Optimized grid rendering for large datasets
  - Efficient re-render prevention with useCallback/useMemo

## 📁 Project Structure

```
amanotes-piano-roll/
├── backend/                 # Ruby on Rails API
│   ├── app/
│   │   ├── controllers/api/v1/  # API controllers
│   │   ├── models/             # Database models
│   │   ├── serializers/        # JSONAPI serializers
│   │   └── ...
│   ├── db/                     # Database migrations & seeds
│   └── config/                 # Rails configuration
│
├── frontend/                # React TypeScript app
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/             # Page components
│   │   ├── hooks/             # Custom React hooks
│   │   ├── stores/            # Zustand stores
│   │   ├── utils/             # Utility functions
│   │   └── types/             # TypeScript type definitions
│   └── public/                # Static assets
│
└── docker-compose.yml        # Docker development setup
```

## 🛠️ Technology Stack

### Backend
- **Ruby on Rails 7.2** - Web framework
- **PostgreSQL** - Primary database
- **JSONAPI::Serializer** - API response formatting
- **Puma** - Application server

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Query** - Server state management
- **Zustand** - Client state management
- **Ant Design** - UI component library
- **Styled Components** - CSS-in-JS styling
- **React Router** - Client-side routing

## 🚀 Getting Started

### Prerequisites
- Ruby 3.1+
- Node.js 16+
- PostgreSQL 12+
- Docker & Docker Compose (optional but recommend)

### Development Setup

#### Using Docker (Recommended)
```bash
# Clone the repository
git clone https://github.com/vietdqhcmute/amanotes-piano-roll.git
cd amanotes-piano-roll

# Start all services
docker-compose up -d

# Setup database
docker-compose exec backend rails db:create db:migrate db:seed
```

#### Manual Setup

**Backend:**
```bash
cd backend
bundle install
rails db:create db:migrate db:seed
rails server -p 3001
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## 📚 API Documentation

### Core Endpoints

**Songs:**
- `GET /api/v1/songs` - List all songs
- `GET /api/v1/songs/:id` - Get song details
- `POST /api/v1/songs` - Create new song
- `PUT /api/v1/songs/:id` - Update song
- `DELETE /api/v1/songs/:id` - Delete song

**Tracks:**
- `GET /api/v1/songs/:song_id/tracks` - List song tracks
- `POST /api/v1/songs/:song_id/tracks` - Create track (max 8 per song)
- `DELETE /api/v1/songs/:song_id/tracks/:id` - Delete track

**Notes:**
- `GET /api/v1/songs/:song_id/notes` - List song notes
- `POST /api/v1/songs/:song_id/notes` - Create note
- `DELETE /api/v1/songs/:song_id/notes/:id` - Delete note

**Other:**
- `GET /api/v1/instruments` - List available instruments
- `GET /api/v1/tags` - List all tags

## 🎨 Key Features Details

### Piano Roll Interface
- **Grid-based Editing**: Visual representation of musical time vs. tracks
- **Interactive Cells**: Click empty cells to add notes, click notes to delete
- **Real-time Updates**: Immediate visual feedback on all operations
- **Performance Optimized**: Handles large grids efficiently with memoization

### Track Management
- **Multi-instrument Support**: Each track can have a different instrument
- **Visual Distinction**: Color-coded tracks based on instrument
- **Limit Enforcement**: Maximum 8 tracks per song for optimal performance

### State Management
- **Global State**: Zustand stores for modal states and selected items
- **Server State**: React Query for caching and synchronization
- **Optimistic Updates**: Immediate UI updates with background API calls

## 🚀 Deployment & CI/CD

### Automated Deployment Pipeline
- **GitHub Actions**: Continuous Integration and Deployment workflows
- **Frontend**: Automated deployment to Vercel on push to main branch
- **Backend**: Configured for Heroku deployment with database migrations
- **Quality Gates**: Code linting, type checking, and build validation before deployment

### Environment Configuration
- **Production Security**: Separate environment variables for production
- **CORS Configuration**: Proper origin whitelisting for production domains
- **Database**: PostgreSQL production instance with connection pooling
- **API Integration**: Frontend configured to use production API endpoints

## 📊 Development Approach

### Problem-Solving Methodology
- **Performance Issues**: Identified and resolved infinite loops and UI blocking through proper memoization
- **State Management**: Transitioned from local state to global state management for better scalability
- **API Optimization**: Refactored heavy endpoints into lightweight, focused resources
- **User Experience**: Implemented modal-based workflows with proper validation feedback

### Code Quality Practices
- **TypeScript Integration**: Comprehensive type safety across the entire frontend
- **Component Reusability**: Created modular, configurable components
- **Error Handling**: Implemented proper error boundaries and user feedback
- **CI/CD Pipeline**: GitHub Actions for automated testing and deployment
- **Code Standards**: ESLint and Prettier for consistent code formatting
- **Build Automation**: Automated builds with type checking and error validation

## 📈 Technical Decisions & Trade-offs

| Decision | Rationale | Trade-off |
|----------|-----------|-----------|
| Separate API endpoints for tracks/notes | Better performance, cacheable responses | More API calls, but cleaner separation |
| Grid size limits (100x50) | Prevents UI blocking | Limited canvas size, but better UX |
| Zustand over Redux | Simpler implementation, less boilerplate | Less ecosystem, but sufficient for scope |
| JSONAPI serializers | Consistent API format | More backend complexity, but better frontend integration |

## 👨‍💻 Developer Information

**Viet Do** - Full Stack Developer
**GitHub**: [@vietdqhcmute](https://github.com/vietdqhcmute)
**Project Type**: Technical Assessment for Amanotes
**Focus Areas**: Full-stack development, performance optimization, modern web technologies
