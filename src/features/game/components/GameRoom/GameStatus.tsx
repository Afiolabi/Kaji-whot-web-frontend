/* eslint-disable @typescript-eslint/no-unused-vars */
// import { PlayedCard } from '../../types/game.types';

import { PlayedCard } from '../../types/card.types';

interface GameStatusProps {
  status: string;
  lastCard: PlayedCard | null;
}

const GameStatus: React.FC<GameStatusProps> = ({ status, lastCard }) => {
  const getStatusText = () => {
    if (!lastCard) return 'Game started! Play your first card.';
    
    if (lastCard.isSpecial) {
      switch (lastCard.number) {
        case 2:
          return 'Pick Two! Next player must pick 2 cards or play another Pick Two.';
        case 1:
          return 'Hold On! Next player skips their turn.';
        case 14:
          return 'General Market! All players pick 1 card.';
        case 20:
          return 'Whot card played! Shape changed.';
        default:
          return `Last played: ${lastCard.shape} ${lastCard.number}`;
      }
    }

    return `Last played: ${lastCard.shape} ${lastCard.number}`;
  };

  return (
    <div className="bg-gray-700 px-6 py-3 rounded-lg">
      <p className="text-white text-center text-sm">{getStatusText()}</p>
    </div>
  );
};

export default GameStatus;