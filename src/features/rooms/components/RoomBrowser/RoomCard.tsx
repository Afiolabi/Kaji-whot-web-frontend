import { Users, Clock, DollarSign, Crown, Eye } from 'lucide-react';
import { formatCurrency } from '@/shared/utils/formatters';
import { RoomInfo } from '../../types/room.types';

interface RoomCardProps {
  room: RoomInfo;
  onJoin: () => void;
}

const RoomCard: React.FC<RoomCardProps> = ({ room, onJoin }) => {
  const getStatusColor = () => {
    switch (room.status) {
      case 'waiting':
        return 'bg-green-500';
      case 'active':
        return 'bg-yellow-500';
      case 'full':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden">
      {/* Header */}
      <div className="bg-linear-to-r from-primary-500 to-primary-600 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-white font-bold text-lg truncate">{room.name}</h3>
          <div className={`px-2 py-1 ${getStatusColor()} rounded-full`}>
            <span className="text-white text-xs font-medium capitalize">{room.status}</span>
          </div>
        </div>
      </div>

      {/* Host Info */}
      <div className="p-4 border-b">
        <div className="flex items-center space-x-3">
          <img
            src={room.host.avatar}
            alt={room.host.username}
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-1">
            <p className="text-gray-900 font-medium">{room.host.username}</p>
            <p className="text-gray-500 text-sm">Host</p>
          </div>
          {room.host.isCelebrity && (
            <Crown className="w-5 h-5 text-yellow-500" />
          )}
        </div>
      </div>

      {/* Room Info */}
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2 text-gray-600">
            <Users className="w-4 h-4" />
            <span>Players</span>
          </div>
          <span className="font-medium text-gray-900">
            {room.playerCount}/{room.settings.maxPlayers}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2 text-gray-600">
            <Eye className="w-4 h-4" />
            <span>Observers</span>
          </div>
          <span className="font-medium text-gray-900">{room.observerCount}</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2 text-gray-600">
            <Clock className="w-4 h-4" />
            <span>Duration</span>
          </div>
          <span className="font-medium text-gray-900">{room.settings.duration} min</span>
        </div>

        {room.settings.entryFee > 0 && (
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2 text-gray-600">
              <DollarSign className="w-4 h-4" />
              <span>Entry Fee</span>
            </div>
            <span className="font-medium text-green-600">
              {formatCurrency(room.settings.entryFee)}
            </span>
          </div>
        )}
      </div>

      {/* Join Button */}
      <div className="p-4">
        <button
          onClick={onJoin}
          disabled={room.status === 'full'}
          className="w-full py-3 bg-primary-500 text-white font-medium rounded-lg hover:bg-primary-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {room.status === 'full' ? 'Room Full' : 'Join Room'}
        </button>
      </div>
    </div>
  );
};

export default RoomCard;