import { Card as CardType } from '../../types/card.types';
import { motion } from 'framer-motion';

interface CardProps {
  card: CardType;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
}

const sizeClasses = {
  sm: 'w-16 h-24',
  md: 'w-20 h-32',
  lg: 'w-24 h-36',
};

const Card: React.FC<CardProps> = ({ card, size = 'md', onClick, disabled = false }) => {
  return (
    <motion.div
      className={`${sizeClasses[size]} cursor-pointer relative ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      onClick={disabled ? undefined : onClick}
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
    >
      <img
        src={card.imageUrl || `/assets/cards/${card.shape}-${card.number}.png`}
        alt={`${card.shape} ${card.number}`}
        className="w-full h-full object-cover rounded-lg shadow-lg"
      />
      {card.isSpecial && (
        <div className="absolute top-1 right-1 bg-yellow-500 rounded-full w-4 h-4 flex items-center justify-center">
          <span className="text-xs text-white font-bold">★</span>
        </div>
      )}
    </motion.div>
  );
};

export default Card;