import { useNavigate } from 'react-router-dom';
import { Users, Trophy, Star, Gamepad2 } from 'lucide-react';
import { motion } from 'framer-motion';

const GameModeSelection = () => {
  const navigate = useNavigate();

  const modes = [
    {
      icon: Users,
      title: 'Free Room',
      description: 'Play for fun with no entry fee',
      color: 'from-blue-500 to-blue-600',
      route: '/play/free',
    },
    {
      icon: Trophy,
      title: 'Rank Room',
      description: 'Compete in ranked matches for prizes',
      color: 'from-purple-500 to-purple-600',
      route: '/play/rank',
    },
    {
      icon: Star,
      title: 'Celebrity Room',
      description: 'Play with celebrities and influencers',
      color: 'from-pink-500 to-pink-600',
      route: '/play/celebrity',
    },
    {
      icon: Gamepad2,
      title: 'Offline Mode',
      description: 'Practice against AI bots',
      color: 'from-gray-500 to-gray-600',
      route: '/play/offline',
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Choose Game Mode</h1>
        <p className="text-gray-600">Select how you want to play</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {modes.map((mode, index) => (
          <motion.button
            key={mode.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => navigate(mode.route)}
            className={`bg-gradient-to-br ${mode.color} p-8 rounded-2xl text-white text-left hover:scale-105 transition-transform shadow-lg`}
          >
            <mode.icon className="w-16 h-16 mb-4" />
            <h2 className="text-2xl font-bold mb-2">{mode.title}</h2>
            <p className="text-white/80">{mode.description}</p>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default GameModeSelection;