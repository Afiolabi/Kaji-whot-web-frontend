import { useNavigate } from 'react-router-dom';
import { Gamepad2, Users, Trophy, Zap } from 'lucide-react';
import { useAppSelector } from '@/app/hooks';
import { motion } from 'framer-motion';
import LoginForm from '@/features/auth/components/LoginForm';
import SignupForm from '@/features/auth/components/SignupForm';
import { useState } from 'react';

const Landing = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const [showAuth, setShowAuth] = useState<'login' | 'signup' | null>(null);

  if (isAuthenticated) {
    navigate('/play');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 via-primary-500 to-purple-600">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-white mb-16"
        >
          <h1 className="text-6xl font-bold mb-6">Whot Game</h1>
          <p className="text-2xl mb-8">Play, Compete, and Win Real Money!</p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setShowAuth('signup')}
              className="px-8 py-4 bg-white text-primary-600 font-bold text-lg rounded-lg hover:bg-gray-100 transition"
            >
              Get Started
            </button>
            <button
              onClick={() => setShowAuth('login')}
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold text-lg rounded-lg hover:bg-white/10 transition"
            >
              Login
            </button>
          </div>
        </motion.div>

        {/* Features */}
        <div className="grid md:grid-cols-4 gap-8 mb-16">
          {[
            { icon: Gamepad2, title: 'Play Online', desc: 'Multiplayer card game action' },
            { icon: Users, title: 'Connect', desc: 'Play with friends & celebrities' },
            { icon: Trophy, title: 'Compete', desc: 'Rank rooms & tournaments' },
            { icon: Zap, title: 'Win Money', desc: 'Real cash prizes' },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-lg rounded-lg p-6 text-center"
            >
              <feature.icon className="w-12 h-12 text-white mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-white/80">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Auth Modals */}
      {showAuth === 'login' && <LoginForm onClose={() => setShowAuth(null)} />}
      {showAuth === 'signup' && (
        <SignupForm
          onClose={() => setShowAuth(null)}
          onSwitchToLogin={() => setShowAuth('login')}
        />
      )}
    </div>
  );
};

export default Landing;