/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { ChevronRight, Hand } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Observer } from '../../types/game.types';
import { useObserverActions, useVideoActions } from '@/shared/hooks/useSocket';

interface ObserversPanelProps {
  observers: Observer[];
  isHost: boolean;
}

const ObserversPanel: React.FC<ObserversPanelProps> = ({ observers, isHost }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { raiseHand, lowerHand } = useObserverActions();
  const { muteObserver, unmuteObserver } = useVideoActions();

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-800 text-white p-3 rounded-l-lg shadow-lg z-10"
      >
        <ChevronRight className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-700">
              <h3 className="text-white text-lg font-bold">
                Observers ({observers.length})
              </h3>
            </div>

            {/* Observers List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {observers.length === 0 ? (
                <p className="text-gray-400 text-center text-sm">No observers yet</p>
              ) : (
                observers.map((observer) => (
                  <div
                    key={observer.id}
                    className="bg-gray-700 rounded-lg p-3 flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={observer.avatar}
                        alt={observer.username}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="text-white font-medium">{observer.username}</p>
                        {observer.handRaised && (
                          <div className="flex items-center space-x-1 text-yellow-500 text-xs">
                            <Hand className="w-3 h-3" />
                            <span>Raised hand</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {isHost && observer.handRaised && (
                      <button
                        onClick={() =>
                          observer.isUnmuted
                            ? muteObserver(observer.id)
                            : unmuteObserver(observer.id)
                        }
                        className="px-3 py-1 bg-primary-500 text-white text-xs rounded-md hover:bg-primary-600"
                      >
                        {observer.isUnmuted ? 'Mute' : 'Unmute'}
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ObserversPanel;