import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import rootReducer from './rootReducer';
import { socketMiddleware } from '@/services/socket/socketMiddleware';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore MediaStream objects in state
        ignoredActions: ['webrtc/setLocalStream', 'webrtc/addRemoteStream'],
        ignoredPaths: ['webrtc.localStream', 'webrtc.remoteStreams', 'game.players.*.videoStream'],
      },
    }).concat(socketMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;