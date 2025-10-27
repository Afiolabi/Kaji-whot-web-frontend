import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameState, Player, Observer } from '../types/game.types';
import { Card, PlayedCard } from '../types/card.types';

interface GameSliceState extends GameState {
  players: Player[];
  observers: Observer[];
  myHand: Card[];
  isMyTurn: boolean;
  canPlayCard: boolean;
  canDrawCard: boolean;
  selectedCard: Card | null;
}

const initialState: GameSliceState = {
  roomId: '',
  mode: 'free',
  status: 'waiting',
  currentTurn: '',
  direction: 'clockwise',
  market: [],
  playedCards: [],
  lastPlayedCard: null,
  turnTimer: 30,
  gameTimer: 900,
  startTime: null,
  endTime: null,
  winner: null,
  players: [],
  observers: [],
  myHand: [],
  isMyTurn: false,
  canPlayCard: false,
  canDrawCard: true,
  selectedCard: null,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGameState: (state, action: PayloadAction<Partial<GameSliceState>>) => {
      return { ...state, ...action.payload };
    },
    updatePlayers: (state, action: PayloadAction<Player[]>) => {
      state.players = action.payload;
    },
    updatePlayer: (state, action: PayloadAction<{ playerId: string; updates: Partial<Player> }>) => {
      const index = state.players.findIndex((p) => p.id === action.payload.playerId);
      if (index !== -1) {
        state.players[index] = { ...state.players[index], ...action.payload.updates };
      }
    },
    addPlayedCard: (state, action: PayloadAction<PlayedCard>) => {
      state.playedCards.push(action.payload);
      state.lastPlayedCard = action.payload;
      if (state.playedCards.length > 10) {
        state.playedCards = state.playedCards.slice(-10);
      }
    },
    updateMyHand: (state, action: PayloadAction<Card[]>) => {
      state.myHand = action.payload;
    },
    addCardToHand: (state, action: PayloadAction<Card>) => {
      state.myHand.push(action.payload);
    },
    removeCardFromHand: (state, action: PayloadAction<string>) => {
      state.myHand = state.myHand.filter((card: { id: string; }) => card.id !== action.payload);
    },
    selectCard: (state, action: PayloadAction<Card | null>) => {
      state.selectedCard = action.payload;
    },
    setTurn: (state, action: PayloadAction<{ playerId: string; timer: number }>) => {
      state.currentTurn = action.payload.playerId;
      state.turnTimer = action.payload.timer;
    },
    decrementTurnTimer: (state) => {
      if (state.turnTimer > 0) {
        state.turnTimer -= 1;
      }
    },
    decrementGameTimer: (state) => {
      if (state.gameTimer > 0) {
        state.gameTimer -= 1;
      }
    },
    toggleDirection: (state) => {
      state.direction = state.direction === 'clockwise' ? 'counterclockwise' : 'clockwise';
    },
    updateObservers: (state, action: PayloadAction<Observer[]>) => {
      state.observers = action.payload;
    },
    addObserver: (state, action: PayloadAction<Observer>) => {
      state.observers.push(action.payload);
    },
    removeObserver: (state, action: PayloadAction<string>) => {
      state.observers = state.observers.filter((o) => o.id !== action.payload);
    },
    updateObserver: (state, action: PayloadAction<{ observerId: string; updates: Partial<Observer> }>) => {
      const index = state.observers.findIndex((o) => o.id === action.payload.observerId);
      if (index !== -1) {
        state.observers[index] = { ...state.observers[index], ...action.payload.updates };
      }
    },
    setGameStatus: (state, action: PayloadAction<GameSliceState['status']>) => {
      state.status = action.payload;
    },
    endGame: (state, action: PayloadAction<{ winner: string; endTime: number }>) => {
      state.status = 'ended';
      state.winner = action.payload.winner;
      state.endTime = action.payload.endTime;
    },
    resetGame: () => initialState,
  },
});

export const {
  setGameState,
  updatePlayers,
  updatePlayer,
  addPlayedCard,
  updateMyHand,
  addCardToHand,
  removeCardFromHand,
  selectCard,
  setTurn,
  decrementTurnTimer,
  decrementGameTimer,
  toggleDirection,
  updateObservers,
  addObserver,
  removeObserver,
  updateObserver,
  setGameStatus,
  endGame,
  resetGame,
} = gameSlice.actions;

export default gameSlice.reducer;