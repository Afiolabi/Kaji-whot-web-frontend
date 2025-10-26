import { Layers } from 'lucide-react';
import { useGameActions } from '@/shared/hooks/useSocket';
import CardBack from '../Card/CardBack';

interface MarketProps {
  cardsRemaining: number;
}

const Market: React.FC<MarketProps> = ({ cardsRemaining }) => {
  const { drawCard } = useGameActions();

  return (
    <div className="flex flex-col items-center space-y-2">
      <button
        onClick={drawCard}
        className="relative transition-transform hover:scale-105 active:scale-95"
      >
        <CardBack size="lg" />
        <div className="absolute -bottom-2 -right-2 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg">
          <Layers className="w-4 h-4 text-primary-600" />
        </div>
      </button>
      <div className="text-white text-sm font-medium">
        {cardsRemaining} cards remaining
      </div>
    </div>
  );
};

export default Market;