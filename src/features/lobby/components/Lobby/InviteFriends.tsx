/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { UserPlus, Copy, Check } from 'lucide-react';
import { useFriends } from '@/features/profile/api/profileApi';
import { useLobbyActions } from '@/shared/hooks/useSocket';
import toast from 'react-hot-toast';

interface InviteFriendsProps {
  roomId: string;
}

const InviteFriends: React.FC<InviteFriendsProps> = ({ roomId }) => {
  const [copied, setCopied] = useState(false);
  const { data: friends } = useFriends();
  const { inviteFriend } = useLobbyActions();

  const roomLink = `${window.location.origin}/lobby/${roomId}`;

  const copyLink = () => {
    navigator.clipboard.writeText(roomLink);
    setCopied(true);
    toast.success('Room link copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="text-white text-lg font-bold mb-4 flex items-center space-x-2">
        <UserPlus className="w-5 h-5" />
        <span>Invite Friends</span>
      </h3>

      {/* Copy Link */}
      <div className="mb-4">
        <label className="text-gray-400 text-sm mb-2 block">Room Link</label>
        <div className="flex space-x-2">
          <input
            type="text"
            value={roomLink}
            readOnly
            className="flex-1 px-3 py-2 bg-gray-700 text-white rounded-lg text-sm"
          />
          <button
            onClick={copyLink}
            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Friends List */}
      {friends && friends.length > 0 && (
        <div>
          <label className="text-gray-400 text-sm mb-2 block">Select Friends</label>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {friends.map((friend: { id: string; avatar: string | undefined; username: string  | undefined; }) => (
              <button
                key={friend.id}
                onClick={() => inviteFriend(roomId, friend.id)}
                className="w-full flex items-center space-x-3 p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
              >
                <img
                  src={friend?.avatar}
                  alt={friend?.username || ""}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-white text-sm">{friend.username}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default InviteFriends;