/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/app/hooks';
import { useWebRTC } from '@/shared/hooks/useWebRTC';
import { useSocket } from '@/shared/hooks/useSocket';
import TopBar from './TopBar';
import PlayerGrid from './PlayerGrid';
import PlayingArea from './PlayingArea';
import YourHand from './YourHand';
import ObserversPanel from './ObserversPanel';
import GameResultsModal from './modals/GameResultsModal';

export const GameRoom = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  // const dispatch = useAppDispatch();
  const { isConnected } = useSocket();
  
  const gameState = useAppSelector((state) => state.game);
  const user = useAppSelector((state) => state.auth.user);

  // Initialize WebRTC
  useWebRTC(roomId || null);

  useEffect(() => {
    if (!roomId || !isConnected) {
      navigate('/play');
    }
  }, [roomId, isConnected, navigate]);

  if (!gameState || !user) {
    return <div>Loading game...</div>;
  }

  return (
    <div className="h-screen bg-gray-900 flex flex-col overflow-hidden">
      {/* Top Bar */}
      <TopBar 
        timer={gameState.gameTimer}
        roomId={roomId || ''}
      />

      {/* Ad Banner */}
      <div className="bg-white h-[60px] flex items-center justify-center">
        <span className="text-gray-500">468x60 Ad Space</span>
      </div>

      {/* Main Game Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Game Content */}
        <div className="flex-1 flex flex-col p-4 space-y-4">
          {/* Players Grid */}
          <PlayerGrid 
            players={gameState.players}
            currentTurn={gameState.currentTurn}
            myId={user.id}
          />

          {/* Playing Area (Center) */}
          <PlayingArea
            playedCards={gameState.playedCards}
            marketSize={gameState.market.length}
            lastPlayedCard={gameState.lastPlayedCard}
            gameStatus={gameState.status}
          />

          {/* Your Hand (Bottom) */}
          <YourHand
            cards={gameState.myHand}
            isMyTurn={gameState.isMyTurn}
            canPlayCard={gameState.canPlayCard}
          />
        </div>

        {/* Observers Panel (Right Sidebar) */}
        <ObserversPanel 
          observers={gameState.observers}
          isHost={gameState.players.find((p: { id: any; }) => p.id === user.id)?.position === 0}
        />
      </div>

      {/* Modals */}
      {gameState.status === 'ended' && gameState.winner && (
        <GameResultsModal
          winner={gameState.winner}
          rankings={[]}
          onClose={() => navigate('/play')}
        />
      )}
    </div>
  );
};