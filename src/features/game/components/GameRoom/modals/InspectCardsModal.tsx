import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import Card from '../../Card/Card';
import { PlayedCard } from '@/features/game/types/card.types';
// import { PlayedCard } from '../../../types/game.types';

interface InspectCardsModalProps {
  cards: PlayedCard[];
  onClose: () => void;
}

const InspectCardsModal: React.FC<InspectCardsModalProps> = ({ cards, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gray-800 rounded-lg p-6 max-w-4xl w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Played Cards</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg transition"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="grid grid-cols-5 gap-4">
          {cards.map((card) => (
            <div key={card.id} className="flex flex-col items-center space-y-2">
              <Card card={card} size="lg" />
              <p className="text-white text-sm text-center">{card.playedBy}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default InspectCardsModal;