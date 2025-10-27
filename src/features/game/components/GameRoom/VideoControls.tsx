/* eslint-disable @typescript-eslint/no-unused-vars */
import { Mic, MicOff, Video, VideoOff } from 'lucide-react';
import { Player } from '../../types/game.types';

interface VideoControlsProps {
  player: Player;
  onClose: () => void;
}

const VideoControls: React.FC<VideoControlsProps> = ({ player, onClose }) => {
  return (
    <div className="absolute inset-0 bg-black/50 flex items-center justify-center space-x-4">
      <button
        className="w-14 h-14 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition"
        onClick={(e) => {
          e.stopPropagation();
          // Handle mute/unmute
        }}
      >
        {player.audioMuted ? (
          <MicOff className="w-6 h-6 text-black" />
        ) : (
          <Mic className="w-6 h-6 text-black" />
        )}
      </button>

      <button
        className="w-14 h-14 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition"
        onClick={(e) => {
          e.stopPropagation();
          // Handle video on/off
        }}
      >
        {player.videoDisabled ? (
          <VideoOff className="w-6 h-6 text-black" />
        ) : (
          <Video className="w-6 h-6 text-black" />
        )}
      </button>
    </div>
  );
};

export default VideoControls;