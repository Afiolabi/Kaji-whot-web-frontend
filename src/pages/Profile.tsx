import { useState } from 'react';
import { Camera, Edit2, Trophy, TrendingUp } from 'lucide-react';
import { useAppSelector } from '@/app/hooks';
import { useUserStats, useFriends } from '@/features/profile/api/profileApi';
import LoadingScreen from '@/shared/components/common/LoadingScreen';

const Profile = () => {
  const user = useAppSelector((state) => state.auth.user);
  const { data: stats, isLoading: statsLoading } = useUserStats();
  const { data: friends, isLoading: friendsLoading } = useFriends();
  const [activeTab, setActiveTab] = useState<'stats' | 'friends'>('stats');

  if (statsLoading || !user) return <LoadingScreen />;

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex items-start space-x-6">
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.username}
              className="w-32 h-32 rounded-full"
            />
            <button className="absolute bottom-0 right-0 p-2 bg-primary-500 text-white rounded-full hover:bg-primary-600">
              <Camera className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">{user.username}</h1>
              {user.rank === 'celebrity' && (
                <div className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                  ⭐ Celebrity
                </div>
              )}
            </div>
            <p className="text-gray-600 mb-4">{user.email}</p>

            <button className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition flex items-center space-x-2">
              <Edit2 className="w-4 h-4" />
              <span>Edit Profile</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <Trophy className="w-8 h-8 text-yellow-500 mb-2" />
          <p className="text-3xl font-bold text-gray-900">{stats?.gamesWon || 0}</p>
          <p className="text-gray-600">Games Won</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <TrendingUp className="w-8 h-8 text-green-500 mb-2" />
          <p className="text-3xl font-bold text-gray-900">
            {stats?.winRate ? `${stats.winRate}%` : '0%'}
          </p>
          <p className="text-gray-600">Win Rate</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <Trophy className="w-8 h-8 text-blue-500 mb-2" />
          <p className="text-3xl font-bold text-gray-900">{stats?.gamesPlayed || 0}</p>
          <p className="text-gray-600">Games Played</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <TrendingUp className="w-8 h-8 text-purple-500 mb-2" />
          <p className="text-3xl font-bold text-gray-900">{stats?.currentStreak || 0}</p>
          <p className="text-gray-600">Current Streak</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b border-gray-200">
          <div className="flex">
            <button
              onClick={() => setActiveTab('stats')}
              className={`flex-1 px-6 py-4 font-medium transition ${
                activeTab === 'stats'
                  ? 'text-primary-500 border-b-2 border-primary-500'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Statistics
            </button>
            <button
              onClick={() => setActiveTab('friends')}
              className={`flex-1 px-6 py-4 font-medium transition ${
                activeTab === 'friends'
                  ? 'text-primary-500 border-b-2 border-primary-500'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Friends ({friends?.length || 0})
            </button>
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'stats' && (
            <div className="space-y-4">
              <div className="flex justify-between py-3 border-b">
                <span className="text-gray-600">Total Earnings</span>
                <span className="font-bold">₦{stats?.totalEarnings?.toLocaleString() || 0}</span>
              </div>
              <div className="flex justify-between py-3 border-b">
                <span className="text-gray-600">Best Streak</span>
                <span className="font-bold">{stats?.bestStreak || 0} games</span>
              </div>
            </div>
          )}

          {activeTab === 'friends' && (
            <div className="grid grid-cols-2 gap-4">
              {friendsLoading ? (
                <p>Loading friends...</p>
              ) : friends && friends.length > 0 ? (
                friends.map((friend) => (
                  <div
                    key={friend.id}
                    className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <img
                      src={friend.avatar}
                      alt={friend.username}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{friend.username}</p>
                      <p className="text-sm text-gray-600">Level {friend.stats.gamesWon}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600 col-span-2 text-center py-8">No friends yet</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;