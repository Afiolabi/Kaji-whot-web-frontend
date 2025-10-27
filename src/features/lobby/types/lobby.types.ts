import type { Observer, Player } from '@/features/game/types/game.types';
import type { GameMode } from '@/shared/types/common.types';

export interface LobbySettings {
  maxPlayers: number;
  entryFee: number;
  duration: number;
  isPrivate: boolean;
  password?: string;
}

export interface LobbyState {
  roomId: string;
  mode: GameMode;
  host: string;
  players: Player[];
  observers: Observer[];
  settings: LobbySettings;
  countdown: number | null;
  isStarting: boolean;
  chatMessages: ChatMessage[];
}

export interface ChatMessage {
  id: string;
  userId: string;
  username: string;
  message: string;
  timestamp: number;
  type: 'user' | 'system';
}