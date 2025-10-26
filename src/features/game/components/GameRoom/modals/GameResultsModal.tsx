/* eslint-disable @typescript-eslint/no-explicit-any */
import { Trophy, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatCurrency } from '@/shared/utils/formatters';

interface GameResultsModalProps {
  winner: string;
  rankings: any[];
  onClose: () => void;
}

const GameResultsModal: React.FC<GameResultsModalProps> = ({ winner, rankings, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl p-8 max-w-2xl w-full mx-4"
      >
        {/* Trophy Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: [0, -10, 10, -10, 0] }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="flex justify-center mb-6"
        >
          <Trophy className="w-32 h-32 text-white" />
        </motion.div>

        <h2 className="text-4xl font-bold text-white text-center mb-2">Game Over!</h2>
        <p className="text-2xl text-white text-center mb-8">🎉 {winner} Wins! 🎉</p>

        {/* Rankings */}
        <div className="bg-white/20 rounded-lg p-6 mb-6">
          <h3 className="text-white text-xl font-bold mb-4">Final Rankings</h3>
          <div className="space-y-3">
            {rankings.map((rank, index) => (
              <div
                key={rank.playerId}
                className="flex items-center justify-between bg-white/10 rounded-lg p-3"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <span className="font-bold text-orange-600">{index + 1}</span>
                  </div>
                  <span className="text-white font-medium">{rank.username}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-white text-sm">{rank.cardsRemaining} cards</span>
                  {rank.payout && (
                    <div className="flex items-center space-x-1 text-white">
                      <DollarSign className="w-4 h-4" />
                      <span className="font-bold">{formatCurrency(rank.payout)}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-4 bg-white text-orange-600 font-bold text-lg rounded-lg hover:bg-gray-100 transition"
        >
          Continue
        </button>
      </motion.div>
    </motion.div>
  );
};

export default GameResultsModal;
