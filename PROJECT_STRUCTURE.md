# Whot Game Frontend - Project Structure

## Directory Organization

```
whot-game-frontend/
├── public/
│   ├── assets/
│   │   ├── cards/           # Card images
│   │   ├── avatars/         # Default avatars
│   │   └── sounds/          # Game sounds
│   └── favicon.ico
│
├── src/
│   ├── app/
│   │   ├── store.ts         # Redux store configuration
│   │   ├── hooks.ts         # Typed Redux hooks
│   │   └── rootReducer.ts   # Combined reducers
│   │
│   ├── features/
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   ├── SignupForm.tsx
│   │   │   │   └── AuthLayout.tsx
│   │   │   ├── hooks/
│   │   │   │   └── useAuth.ts
│   │   │   ├── services/
│   │   │   │   └── authService.ts
│   │   │   ├── slices/
│   │   │   │   └── authSlice.ts
│   │   │   └── types/
│   │   │       └── auth.types.ts
│   │   │
│   │   ├── game/
│   │   │   ├── components/
│   │   │   │   ├── GameRoom/
│   │   │   │   │   ├── index.tsx
│   │   │   │   │   ├── PlayerGrid.tsx
│   │   │   │   │   ├── PlayerFrame.tsx
│   │   │   │   │   ├── PlayingArea.tsx
│   │   │   │   │   ├── Market.tsx
│   │   │   │   │   ├── PlayedCards.tsx
│   │   │   │   │   ├── YourHand.tsx
│   │   │   │   │   ├── ObserversPanel.tsx
│   │   │   │   │   ├── GameStatus.tsx
│   │   │   │   │   └── TopBar.tsx
│   │   │   │   ├── Card/
│   │   │   │   │   ├── Card.tsx
│   │   │   │   │   └── CardBack.tsx
│   │   │   │   ├── VideoControls/
│   │   │   │   │   ├── VideoFrame.tsx
│   │   │   │   │   └── ControlOverlay.tsx
│   │   │   │   └── modals/
│   │   │   │       ├── InspectCardsModal.tsx
│   │   │   │       ├── ReplacePlayerModal.tsx
│   │   │   │       └── GameResultsModal.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useGameState.ts
│   │   │   │   ├── useGameActions.ts
│   │   │   │   └── useTurnTimer.ts
│   │   │   ├── services/
│   │   │   │   ├── gameService.ts
│   │   │   │   └── cardLogic.ts
│   │   │   ├── slices/
│   │   │   │   ├── gameSlice.ts
│   │   │   │   └── gameRoomSlice.ts
│   │   │   ├── types/
│   │   │   │   ├── game.types.ts
│   │   │   │   └── card.types.ts
│   │   │   └── utils/
│   │   │       ├── cardValidator.ts
│   │   │       └── gameUtils.ts
│   │   │
│   │   ├── lobby/
│   │   │   ├── components/
│   │   │   │   ├── Lobby/
│   │   │   │   │   ├── index.tsx
│   │   │   │   │   ├── PlayerList.tsx
│   │   │   │   │   ├── ObserverList.tsx
│   │   │   │   │   ├── LobbySettings.tsx
│   │   │   │   │   ├── ReadyButton.tsx
│   │   │   │   │   ├── CountdownTimer.tsx
│   │   │   │   │   └── InviteFriends.tsx
│   │   │   │   └── VideoPreview.tsx
│   │   │   ├── hooks/
│   │   │   │   └── useLobby.ts
│   │   │   ├── slices/
│   │   │   │   └── lobbySlice.ts
│   │   │   └── types/
│   │   │       └── lobby.types.ts
│   │   │
│   │   ├── rooms/
│   │   │   ├── components/
│   │   │   │   ├── RoomBrowser/
│   │   │   │   │   ├── index.tsx
│   │   │   │   │   ├── RoomCard.tsx
│   │   │   │   │   └── RoomFilters.tsx
│   │   │   │   ├── CreateRoom/
│   │   │   │   │   ├── index.tsx
│   │   │   │   │   ├── RoomTypeSelector.tsx
│   │   │   │   │   └── RoomSettings.tsx
│   │   │   │   ├── FreeRoom.tsx
│   │   │   │   ├── RankRoom.tsx
│   │   │   │   └── CelebrityRoom.tsx
│   │   │   ├── hooks/
│   │   │   │   └── useRooms.ts
│   │   │   ├── slices/
│   │   │   │   └── roomsSlice.ts
│   │   │   └── types/
│   │   │       └── room.types.ts
│   │   │
│   │   ├── wallet/
│   │   │   ├── components/
│   │   │   │   ├── WalletDashboard.tsx
│   │   │   │   ├── FundWallet.tsx
│   │   │   │   ├── Withdraw.tsx
│   │   │   │   └── TransactionHistory.tsx
│   │   │   ├── hooks/
│   │   │   │   └── useWallet.ts
│   │   │   ├── slices/
│   │   │   │   └── walletSlice.ts
│   │   │   └── types/
│   │   │       └── wallet.types.ts
│   │   │
│   │   ├── profile/
│   │   │   ├── components/
│   │   │   │   ├── ProfileView.tsx
│   │   │   │   ├── EditProfile.tsx
│   │   │   │   ├── StatsPanel.tsx
│   │   │   │   └── FriendsList.tsx
│   │   │   ├── slices/
│   │   │   │   └── profileSlice.ts
│   │   │   └── types/
│   │   │       └── profile.types.ts
│   │   │
│   │   ├── celebrity/
│   │   │   ├── components/
│   │   │   │   ├── CelebrityOnboarding/
│   │   │   │   │   ├── index.tsx
│   │   │   │   │   ├── IdentityVerification.tsx
│   │   │   │   │   ├── SocialMediaLink.tsx
│   │   │   │   │   └── ProfileSetup.tsx
│   │   │   │   └── CelebrityDashboard.tsx
│   │   │   ├── slices/
│   │   │   │   └── celebritySlice.ts
│   │   │   └── types/
│   │   │       └── celebrity.types.ts
│   │   │
│   │   └── notifications/
│   │       ├── components/
│   │       │   ├── NotificationCenter.tsx
│   │       │   └── Toast.tsx
│   │       ├── slices/
│   │       │   └── notificationsSlice.ts
│   │       └── types/
│   │           └── notification.types.ts
│   │
│   ├── shared/
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Input.tsx
│   │   │   │   ├── Modal.tsx
│   │   │   │   ├── Card.tsx
│   │   │   │   ├── Badge.tsx
│   │   │   │   ├── Avatar.tsx
│   │   │   │   ├── Spinner.tsx
│   │   │   │   ├── Dropdown.tsx
│   │   │   │   └── Tabs.tsx
│   │   │   ├── layout/
│   │   │   │   ├── MainLayout.tsx
│   │   │   │   ├── GameLayout.tsx
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   └── Footer.tsx
│   │   │   └── common/
│   │   │       ├── ErrorBoundary.tsx
│   │   │       ├── LoadingScreen.tsx
│   │   │       └── ProtectedRoute.tsx
│   │   ├── hooks/
│   │   │   ├── useSocket.ts
│   │   │   ├── useWebRTC.ts
│   │   │   ├── useMediaStream.ts
│   │   │   ├── useLocalStorage.ts
│   │   │   ├── useDebounce.ts
│   │   │   └── useClickOutside.ts
│   │   ├── utils/
│   │   │   ├── api.ts
│   │   │   ├── constants.ts
│   │   │   ├── helpers.ts
│   │   │   ├── formatters.ts
│   │   │   └── validators.ts
│   │   └── types/
│   │       ├── common.types.ts
│   │       └── api.types.ts
│   │
│   ├── services/
│   │   ├── socket/
│   │   │   ├── socketClient.ts
│   │   │   ├── socketEvents.ts
│   │   │   └── socketMiddleware.ts
│   │   ├── webrtc/
│   │   │   ├── dailyClient.ts
│   │   │   └── webrtcService.ts
│   │   ├── api/
│   │   │   ├── axios.config.ts
│   │   │   ├── endpoints.ts
│   │   │   └── interceptors.ts
│   │   └── firebase/
│   │       └── firebaseConfig.ts
│   │
│   ├── pages/
│   │   ├── Landing.tsx
│   │   ├── GameModeSelection.tsx
│   │   ├── OfflineGame.tsx
│   │   ├── Wallet.tsx
│   │   ├── Profile.tsx
│   │   ├── Settings.tsx
│   │   ├── CelebrityOnboarding.tsx
│   │   └── NotFound.tsx
│   │
│   ├── routes/
│   │   ├── AppRouter.tsx
│   │   └── routeConfig.ts
│   │
│   ├── styles/
│   │   ├── globals.css
│   │   └── animations.css
│   │
│   ├── config/
│   │   ├── env.ts
│   │   └── game.config.ts
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
│
├── tests/
│   ├── unit/
│   ├── integration/
│   └── setup.ts
│
├── .env.example
├── .env.development
├── .env.production
├── .eslintrc.cjs
├── .prettierrc
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md
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