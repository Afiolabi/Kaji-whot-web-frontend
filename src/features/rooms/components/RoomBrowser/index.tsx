import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Filter } from 'lucide-react';
import { GameMode } from '@/shared/types/common.types';
import RoomCard from './RoomCard.tsx';
import RoomFilters from './RoomFilters.tsx';
// import CreateRoomModal from '../CreateRoom';
import LoadingScreen from '@/shared/components/common/LoadingScreen';
import { useRooms } from '@/features/rooms/api/roomsApi';
import CreateRoomModal from '../CreateRoom.tsx/index.tsx';

interface RoomBrowserProps {
  mode: GameMode;
}
 const RoomBrowser: React.FC<RoomBrowserProps> = ({ mode }) => {
  const navigate = useNavigate();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { data: rooms, isLoading } = useRooms(mode);

  const filteredRooms = rooms?.filter((room: { name: string; }) =>
    room.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) return <LoadingScreen/>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 capitalize">{mode} Rooms</h1>
          <p className="text-gray-600 mt-1">Join a room or create your own</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Create Room</span>
        </button>
      </div>

      {/* Search & Filters */}
      <div className="flex space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search rooms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="px-6 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center space-x-2"
        >
          <Filter className="w-5 h-5" />
          <span>Filters</span>
        </button>
      </div>

      {/* Filters Panel */}
      {showFilters && <RoomFilters />}

      {/* Rooms Grid */}
      {filteredRooms && filteredRooms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              onJoin={() => navigate(`/lobby/${room.id}`)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">No rooms found</p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="mt-4 text-primary-500 hover:text-primary-600 font-medium"
          >
            Create the first room
          </button>
        </div>
      )}

      {/* Create Room Modal */}
      {showCreateModal && (
        <CreateRoomModal
          mode={mode}
          onClose={() => setShowCreateModal(false)}
        />
      )}
    </div>
  );
};

export default RoomBrowser;