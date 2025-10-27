import PlayedCards from './PlayedCards';
import Market from './Market';
import GameStatus from './GameStatus';
import { PlayedCard } from '../../types/card.types';
// import { PlayedCard } from '../../types/game.types';

interface PlayingAreaProps {
  playedCards: PlayedCard[];
  marketSize: number;
  lastPlayedCard: PlayedCard | null;
  gameStatus: string;
}

const PlayingArea: React.FC<PlayingAreaProps> = ({
  playedCards,
  marketSize,
  lastPlayedCard,
  gameStatus,
}) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center space-y-4 bg-gray-800 rounded-lg p-4">
      {/* Played Cards */}
      <PlayedCards cards={playedCards.slice(-3)} />

      {/* Market */}
      <Market cardsRemaining={marketSize} />

      {/* Game Status */}
      <GameStatus status={gameStatus} lastCard={lastPlayedCard} />
    </div>
  );
};

export default PlayingArea;