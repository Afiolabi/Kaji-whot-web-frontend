import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LobbyState, ChatMessage } from '../types/lobby.types';

const initialState: LobbyState = {
  roomId: '',
  mode: 'free',
  host: '',
  players: [],
  observers: [],
  settings: {
    maxPlayers: 4,
    entryFee: 0,
    duration: 15,
    isPrivate: false,
  },
  countdown: null,
  isStarting: false,
  chatMessages: [],
};

const lobbySlice = createSlice({
  name: 'lobby',
  initialState,
  reducers: {
    setLobbyState: (state, action: PayloadAction<Partial<LobbyState>>) => {
      return { ...state, ...action.payload };
    },
    addPlayer: (state, action) => {
      state.players.push(action.payload);
    },
    removePlayer: (state, action: PayloadAction<string>) => {
      state.players = state.players.filter((p) => p.id !== action.payload);
    },
    addObserver: (state, action) => {
      state.observers.push(action.payload);
    },
    removeObserver: (state, action: PayloadAction<string>) => {
      state.observers = state.observers.filter((o) => o.id !== action.payload);
    },
    updatePlayerReady: (state, action: PayloadAction<{ playerId: string; isReady: boolean }>) => {
      const player = state.players.find((p) => p.id === action.payload.playerId);
      if (player) {
        player.isReady = action.payload.isReady;
      }
    },
    swapPlayerRole: (state, action: PayloadAction<{ userId: string; toRole: 'player' | 'observer' }>) => {
      const { userId, toRole } = action.payload;
      
      if (toRole === 'observer') {
        const playerIndex = state.players.findIndex((p) => p.id === userId);
        if (playerIndex !== -1) {
          const player = state.players[playerIndex];
          state.players.splice(playerIndex, 1);
          state.observers.push({
            id: player.id,
            username: player.username,
            avatar: player.avatar,
            handRaised: false,
            isUnmuted: false,
            videoStream: player.videoStream,
            joinedAt: Date.now(),
          });
        }
      } else {
        const observerIndex = state.observers.findIndex((o) => o.id === userId);
        if (observerIndex !== -1 && state.players.length < state.settings.maxPlayers) {
          const observer = state.observers[observerIndex];
          state.observers.splice(observerIndex, 1);
          state.players.push({
            id: observer.id,
            username: observer.username,
            avatar: observer.avatar,
            role: 'player',
            hand: [],
            cardCount: 0,
            position: state.players.length,
            isDisconnected: false,
            isLastCard: false,
            disconnectedAt: null,
            videoStream: observer.videoStream,
            audioMuted: false,
            videoDisabled: false,
            isReady: false,
          });
        }
      }
    },
    startCountdown: (state, action: PayloadAction<number>) => {
      state.countdown = action.payload;
      state.isStarting = true;
    },
    decrementCountdown: (state) => {
      if (state.countdown !== null && state.countdown > 0) {
        state.countdown -= 1;
      }
    },
    cancelCountdown: (state) => {
      state.countdown = null;
      state.isStarting = false;
    },
    addChatMessage: (state, action: PayloadAction<ChatMessage>) => {
      state.chatMessages.push(action.payload);
      if (state.chatMessages.length > 100) {
        state.chatMessages = state.chatMessages.slice(-100);
      }
    },
    resetLobby: () => initialState,
  },
});

export const {
  setLobbyState,
  addPlayer,
  removePlayer,
  addObserver,
  removeObserver,
  updatePlayerReady,
  swapPlayerRole,
  startCountdown,
  decrementCountdown,
  cancelCountdown,
  addChatMessage,
  resetLobby,
} = lobbySlice.actions;

export default lobbySlice.reducer;