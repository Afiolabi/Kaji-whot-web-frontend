import { useState } from 'react';
import { useMediaStream } from '@/shared/hooks/useMediaStream';
import { Player } from '../../types/game.types';
import VideoControls from './VideoControls';

interface PlayerFrameProps {
  player: Player;
  isActive: boolean;
  isMe: boolean;
}

const PlayerFrame: React.FC<PlayerFrameProps> = ({ player, isActive, isMe }) => {
  const [showControls, setShowControls] = useState(false);
  const videoRef = useMediaStream(player.videoStream);

  return (
    <div
      className={`relative w-full h-full rounded-lg overflow-hidden border-4 transition-all ${
        isActive 
          ? 'border-primary-500 animate-turn-pulse' 
          : 'border-gray-700'
      }`}
      onClick={() => setShowControls(!showControls)}
    >
      {/* Video Feed */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted={isMe}
        className="w-full h-full object-cover bg-gray-900"
      />

      {/* Player Info Overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
        <p className="text-white text-sm font-semibold">{player.username}</p>
      </div>

      {/* Card Count Badge */}
      <div className="absolute top-2 right-2">
        <div className={`px-2 py-1 rounded-full text-sm font-bold ${
          player.isLastCard ? 'bg-red-500 animate-pulse' : 'bg-gray-800'
        } text-white`}>
          {player.cardCount}
        </div>
      </div>

      {/* Last Card Warning */}
      {player.isLastCard && (
        <div className="absolute top-2 left-2 text-red-500 text-xs font-bold animate-pulse">
          Last card
        </div>
      )}

      {/* Disconnected Indicator */}
      {player.isDisconnected && (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
          <p className="text-white text-sm">Disconnected</p>
        </div>
      )}

      {/* Video Controls Overlay */}
      {showControls && !isMe && (
        <VideoControls
          player={player}
          onClose={() => setShowControls(false)}
        />
      )}
    </div>
  );
};

export default PlayerFrame;