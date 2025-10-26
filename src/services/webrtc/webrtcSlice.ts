import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WebRTCState {
  localStream: MediaStream | null;
  remoteStreams: { [userId: string]: MediaStream };
  isConnected: boolean;
  roomUrl: string;
  audioEnabled: boolean;
  videoEnabled: boolean;
}

const initialState: WebRTCState = {
  localStream: null,
  remoteStreams: {},
  isConnected: false,
  roomUrl: '',
  audioEnabled: true,
  videoEnabled: true,
};

const webrtcSlice = createSlice({
  name: 'webrtc',
  initialState,
  reducers: {
    setLocalStream: (state, action: PayloadAction<MediaStream | null>) => {
      state.localStream = action.payload;
    },
    addRemoteStream: (state, action: PayloadAction<{ userId: string; stream: MediaStream }>) => {
      state.remoteStreams[action.payload.userId] = action.payload.stream;
    },
    removeRemoteStream: (state, action: PayloadAction<string>) => {
      delete state.remoteStreams[action.payload];
    },
    setConnectionStatus: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
    setRoomUrl: (state, action: PayloadAction<string>) => {
      state.roomUrl = action.payload;
    },
    setAudioEnabled: (state, action: PayloadAction<boolean>) => {
      state.audioEnabled = action.payload;
    },
    setVideoEnabled: (state, action: PayloadAction<boolean>) => {
      state.videoEnabled = action.payload;
    },
    resetWebRTC: () => initialState,
  },
});

export const {
  setLocalStream,
  addRemoteStream,
  removeRemoteStream,
  setConnectionStatus,
  setRoomUrl,
  setAudioEnabled,
  setVideoEnabled,
  resetWebRTC,
} = webrtcSlice.actions;

export default webrtcSlice.reducer;