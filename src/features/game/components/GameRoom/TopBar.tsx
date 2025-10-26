import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { formatTime } from '@/shared/utils/formatters';

interface TopBarProps {
  timer: number;
  roomId: string;
}

const TopBar: React.FC<TopBarProps> = ({ timer, roomId }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (confirm('Are you sure you want to leave the game?')) {
      navigate('/play');
    }
  };

  return (
    <div className="bg-gray-800 text-white px-4 py-3 flex items-center justify-between">
      <button
        onClick={handleBack}
        className="p-2 hover:bg-gray-700 rounded-lg transition"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>

      <div className="text-2xl font-bold text-blue-400">
        {formatTime(timer)}
      </div>

      <div className="text-sm text-gray-400">
        Room: {roomId.slice(0, 6)}
      </div>
    </div>
  );
};

export default TopBar;