import { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '../Card/Card';
import { PlayedCard } from '../../types/game.types';
import InspectCardsModal from './modals/InspectCardsModal';

interface PlayedCardsProps {
  cards: PlayedCard[];
}

const PlayedCards: React.FC<PlayedCardsProps> = ({ cards }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="flex items-center space-x-2">
        <p className="text-white text-sm font-medium">Recently Played:</p>
        <div className="flex -space-x-8">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              style={{ zIndex: index }}
            >
              <Card card={card} size="sm" onClick={() => setShowModal(true)} />
            </motion.div>
          ))}
        </div>
      </div>

      {showModal && <InspectCardsModal cards={cards} onClose={() => setShowModal(false)} />}
    </>
  );
};

export default PlayedCards;