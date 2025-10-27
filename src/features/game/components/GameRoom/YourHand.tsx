import { useState } from 'react';
import { useGameActions } from '@/shared/hooks/useSocket';
import Card from '../Card/Card';
import { Card as CardType } from '../../types/card.types';

interface YourHandProps {
  cards: CardType[];
  isMyTurn: boolean;
  canPlayCard: boolean;
}

const YourHand: React.FC<YourHandProps> = ({ cards, isMyTurn, canPlayCard }) => {
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);
  const { playCard } = useGameActions();

  const handleCardClick = (card: CardType) => {
    if (!isMyTurn || !canPlayCard) return;
    
    if (selectedCard?.id === card.id) {
      // Play the selected card
      playCard(card.id);
      setSelectedCard(null);
    } else {
      // Select the card
      setSelectedCard(card);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="flex items-center justify-center space-x-2 overflow-x-auto">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`transition-transform cursor-pointer ${
              selectedCard?.id === card.id ? '-translate-y-4' : 'hover:-translate-y-2'
            } ${!isMyTurn || !canPlayCard ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => handleCardClick(card)}
          >
            <Card card={card} size="md" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default YourHand;