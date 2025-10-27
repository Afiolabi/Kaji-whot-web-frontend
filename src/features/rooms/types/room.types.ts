import type { LobbySettings } from '@/features/lobby/types/lobby.types';
import type { GameMode } from '@/shared/types/common.types';

export interface RoomInfo {
  id: string;
  name: string;
  mode: GameMode;
  host: {
    id: string;
    username: string;
    avatar: string;
    isCelebrity: boolean;
  };
  settings: LobbySettings;
  playerCount: number;
  observerCount: number;
  status: 'waiting' | 'active' | 'full';
  createdAt: number;
}

export interface CreateRoomData {
  name: string;
  mode: GameMode;
  settings: LobbySettings;
}