import DailyIframe, { DailyCall, DailyEventObject } from '@daily-co/daily-js';
import { store } from '@/app/store';
import { setLocalStream, addRemoteStream, removeRemoteStream } from './webrtcSlice';

class DailyClient {
  private callObject: DailyCall | null = null;
  private roomUrl: string = '';

  async createRoom(roomId: string): Promise<string> {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/video/create-room`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${store.getState().auth.token}`,
        },
        body: JSON.stringify({ roomId }),
      });

      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error('Failed to create video room:', error);
      throw error;
    }
  }

  async joinRoom(roomUrl: string, username: string): Promise<void> {
    try {
      this.roomUrl = roomUrl;

      // Create call object
      this.callObject = DailyIframe.createCallObject({
        audioSource: true,
        videoSource: true,
      });

      // Setup event listeners
      this.setupEventListeners();

      // Join the room
      await this.callObject.join({
        url: roomUrl,
        userName: username,
      });

      console.log('✅ Joined Daily.co room');
    } catch (error) {
      console.error('Failed to join video room:', error);
      throw error;
    }
  }

  private setupEventListeners() {
    if (!this.callObject) return;

    // Participant joined
    this.callObject.on('participant-joined', (event: DailyEventObject) => {
      console.log('Participant joined:', event.participant);
    });

    // Participant left
    this.callObject.on('participant-left', (event: DailyEventObject) => {
      console.log('Participant left:', event.participant);
      if (event.participant?.session_id) {
        store.dispatch(removeRemoteStream(event.participant.session_id));
      }
    });

    // Track started (video/audio)
    this.callObject.on('track-started', (event: DailyEventObject) => {
      console.log('Track started:', event);
      const { participant, track } = event;

      if (!participant || !track) return;

      if (participant.local) {
        // Local stream
        const stream = new MediaStream([track]);
        store.dispatch(setLocalStream(stream));
      } else {
        // Remote stream
        const existingStream = this.getRemoteStream(participant.session_id);
        if (existingStream) {
          existingStream.addTrack(track);
        } else {
          const stream = new MediaStream([track]);
          store.dispatch(addRemoteStream({
            userId: participant.user_id || participant.session_id,
            stream,
          }));
        }
      }
    });

    // Track stopped
    this.callObject.on('track-stopped', (event: DailyEventObject) => {
      console.log('Track stopped:', event);
    });

    // Participant updated (mute/unmute)
    this.callObject.on('participant-updated', (event: DailyEventObject) => {
      console.log('Participant updated:', event.participant);
    });

    // Error handling
    this.callObject.on('error', (event) => {
      console.error('Daily.co error:', event);
    });

    // Call left
    this.callObject.on('left-meeting', () => {
      console.log('Left meeting');
      this.cleanup();
    });
  }

  private getRemoteStream(sessionId: string): MediaStream | null {
    const remoteStreams = store.getState().webrtc.remoteStreams;
    return remoteStreams[sessionId] || null;
  }

  async toggleAudio(muted: boolean): Promise<void> {
    if (!this.callObject) return;
    await this.callObject.setLocalAudio(!muted);
  }

  async toggleVideo(disabled: boolean): Promise<void> {
    if (!this.callObject) return;
    await this.callObject.setLocalVideo(!disabled);
  }

  async leaveRoom(): Promise<void> {
    if (this.callObject) {
      await this.callObject.leave();
      this.cleanup();
    }
  }

  private cleanup() {
    if (this.callObject) {
      this.callObject.destroy();
      this.callObject = null;
    }
    this.roomUrl = '';
  }

  getCallObject(): DailyCall | null {
    return this.callObject;
  }

  getLocalStream(): MediaStream | null {
    if (!this.callObject) return null;
    
    const participants = this.callObject.participants();
    const localParticipant = participants.local;
    
    if (!localParticipant?.tracks) return null;

    const tracks: MediaStreamTrack[] = [];
    if (localParticipant.tracks.audio?.track) {
      tracks.push(localParticipant.tracks.audio.track);
    }
    if (localParticipant.tracks.video?.track) {
      tracks.push(localParticipant.tracks.video.track);
    }

    return tracks.length > 0 ? new MediaStream(tracks) : null;
  }

  getParticipants() {
    return this.callObject?.participants() || {};
  }
}

export const dailyClient = new DailyClient();