import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '@/features/auth/slices/authSlice';
import gameReducer from '@/features/game/slices/gameSlice';
import gameRoomReducer from '@/features/game/slices/gameRoomSlice';
import lobbyReducer from '@/features/lobby/slices/lobbySlice';
import roomsReducer from '@/features/rooms/slices/roomsSlice';
import walletReducer from '@/features/wallet/slices/walletSlice';
import profileReducer from '@/features/profile/slices/profileSlice';
import celebrityReducer from '@/features/celebrity/slices/celebritySlice';
import notificationsReducer from '@/features/notifications/slices/notificationsSlice';
import webrtcReducer from '@/services/webrtc/webrtcSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  game: gameReducer,
  gameRoom: gameRoomReducer,
  lobby: lobbyReducer,
  rooms: roomsReducer,
  wallet: walletReducer,
  profile: profileReducer,
  celebrity: celebrityReducer,
  notifications: notificationsReducer,
  webrtc: webrtcReducer,
});

export default rootReducer;