# Whot Game Frontend

A modern, real-time multiplayer Whot card game built with React, TypeScript, and WebRTC.

## 🎮 Features

- **Real-time Multiplayer**: Play with friends using Socket.io
- **Video Chat**: Integrated video/audio calls with Daily.co
- **Authentication**: Secure user authentication with Firebase
- **Celebrity Mode**: Special game mode with celebrity players
- **Wallet Integration**: In-game currency and transactions
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Built with Tailwind CSS and Framer Motion

## 🚀 Tech Stack

- **Frontend Framework**: React 19 + TypeScript  + Vite
- **State Management**: Redux Toolkit
- **Routing**: React Router v7
- **Styling**: Tailwind CSS v4 + HeadlessUI
- **Real-time**: Socket.io Client
- **Video/Audio WebRTC**: Daily.co
- **Backend Integration**: Axios
- **Authentication**: Firebase Auth
- **Forms**: React Hook Form + Zod
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Testing**: Vitest + Testing Library


## 📁 Project Structure

```
src/
├── app/              # App configuration (store, providers)
├── features/         # Feature modules (auth, game, lobby, etc.)
├── shared/           # Shared components, hooks, utils
├── services/         # External service integrations
├── pages/            # Page components
├── routes/           # Routing configuration
├── config/           # App configuration
└── styles/           # Global styles
```

See [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) for detailed documentation.

## 🛠️ Setup

1. **Install dependencies**
   ```bash
   pnpm install
   ```

2. **Configure environment variables**
   
   Update `.env.development` with your credentials:

3. **Start development server**
   ```bash
   pnpm dev
   ```

4. **Run tests**
   ```bash
   pnpm test
   ```

5. **Build for production**
   ```bash
   pnpm build
   ```

## 📝 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm test` - Run tests
- `pnpm test:ui` - Run tests with UI
- `pnpm lint` - Lint code

## 🎯 Development Roadmap

- [ ] Implement authentication flow
- [ ] Set up Redux store with slices
- [ ] Create game logic and rules
- [ ] Build shared UI component library
- [ ] Integrate Socket.io for real-time gameplay
- [ ] Add Daily.co video chat
- [ ] Implement wallet system
- [ ] Create celebrity mode
- [ ] Add sound effects and animations
- [ ] Write comprehensive tests

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

## 📄 License

See [LICENSE](./LICENSE) file for details.

## 🔗 Links

- [Project Structure Documentation](./PROJECT_STRUCTURE.md)
- [Setup Guide](./SETUP_COMPLETE.md)

---

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh