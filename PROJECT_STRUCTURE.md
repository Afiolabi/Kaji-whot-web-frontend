# Whot Game Frontend - Project Structure

## Directory Organization

```
src/
├── app/                          # Application core setup
│   ├── store/                    # Redux store configuration
│   └── providers/                # Context providers
│
├── features/                     # Feature-based modules
│   ├── auth/                     # Authentication feature
│   │   ├── components/           # Auth-specific components
│   │   ├── hooks/                # Auth-specific hooks
│   │   ├── services/             # Auth services
│   │   └── types/                # Auth types
│   │
│   ├── game/                     # Game logic and UI
│   │   ├── components/           # Game components (Board, Cards, etc.)
│   │   ├── hooks/                # Game hooks
│   │   ├── services/             # Game logic services
│   │   └── types/                # Game types
│   │
│   ├── lobby/                    # Lobby/waiting room
│   │   ├── components/
│   │   ├── hooks/
│   │   └── types/
│   │
│   ├── rooms/                    # Room management
│   │   ├── components/
│   │   ├── hooks/
│   │   └── types/
│   │
│   ├── wallet/                   # Wallet/payment integration
│   │   ├── components/
│   │   ├── hooks/
│   │   └── types/
│   │
│   ├── profile/                  # User profile
│   │   ├── components/
│   │   ├── hooks/
│   │   └── types/
│   │
│   ├── celebrity/                # Celebrity mode features
│   │   ├── components/
│   │   ├── hooks/
│   │   └── types/
│   │
│   └── notifications/            # Notifications system
│       ├── components/
│       ├── hooks/
│       └── types/
│
├── shared/                       # Shared resources
│   ├── components/               # Reusable UI components
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── Modal/
│   │   ├── Layout/
│   │   └── index.ts
│   │
│   ├── hooks/                    # Reusable custom hooks
│   │   ├── useAuth.ts
│   │   ├── useSocket.ts
│   │   ├── useGame.ts
│   │   └── index.ts
│   │
│   ├── utils/                    # Utility functions
│   │   ├── helpers.ts
│   │   ├── validators.ts
│   │   ├── formatters.ts
│   │   └── index.ts
│   │
│   └── types/                    # Shared TypeScript types
│       ├── game.types.ts
│       ├── user.types.ts
│       ├── room.types.ts
│       └── index.ts
│
├── services/                     # External service integrations
│   ├── api/                      # REST API client
│   │   ├── client.ts
│   │   ├── endpoints.ts
│   │   └── index.ts
│   │
│   ├── socket/                   # Socket.io integration
│   │   ├── socket.service.ts
│   │   ├── socket.events.ts
│   │   └── index.ts
│   │
│   ├── webrtc/                   # Daily.co WebRTC integration
│   │   ├── daily.service.ts
│   │   └── index.ts
│   │
│   └── firebase/                 # Firebase services
│       ├── firebase.config.ts
│       ├── auth.service.ts
│       ├── firestore.service.ts
│       └── index.ts
│
├── pages/                        # Page components
│   ├── HomePage.tsx
│   ├── AuthPage.tsx
│   ├── LobbyPage.tsx
│   ├── GamePage.tsx
│   └── ProfilePage.tsx
│
├── routes/                       # Routing configuration
│   └── index.tsx
│
├── config/                       # App configuration
│   ├── env.ts                    # Environment variables
│   ├── constants.ts              # App constants
│   └── index.ts
│
├── styles/                       # Global styles
│   ├── globals.css
│   └── themes/
│
├── assets/                       # Static assets (original Vite)
│   └── react.svg
│
├── App.tsx                       # Root component
├── main.tsx                      # Entry point
└── index.css                     # Global CSS with Tailwind

public/
├── assets/
│   ├── cards/                    # Card images
│   ├── avatars/                  # Avatar images
│   └── sounds/                   # Sound effects
└── vite.svg
```

## Architecture Principles

### Feature-Based Organization
- Each feature is self-contained with its own components, hooks, services, and types
- Features can be developed and tested independently
- Easy to scale and maintain

### Shared Resources
- Common components, hooks, and utilities are in the `shared/` directory
- Promotes code reuse and consistency
- Single source of truth for shared logic

### Service Layer
- External integrations are isolated in the `services/` directory
- Easy to mock for testing
- Clear separation of concerns

### Type Safety
- TypeScript types are organized by domain
- Shared types in `shared/types/`
- Feature-specific types in their respective directories

## Key Technologies

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Redux Toolkit** - State management
- **React Router v7** - Routing
- **Socket.io** - Real-time communication
- **Daily.co** - Video/audio calls
- **Firebase** - Authentication & database
- **Tailwind CSS v4** - Styling
- **Framer Motion** - Animations
- **Vitest** - Testing

## Getting Started

1. Install dependencies: `pnpm install`
2. Update `.env.development` with your API keys
3. Start dev server: `pnpm dev`
4. Run tests: `pnpm test`

## Next Steps

1. Implement authentication flow in `features/auth/`
2. Set up Redux store in `app/store/`
3. Create game logic in `features/game/`
4. Build shared UI components in `shared/components/`
5. Configure services in `services/`