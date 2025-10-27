import { Bell, Lock, Palette, Globe } from 'lucide-react';

const Settings = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your preferences</p>
      </div>

      <div className="bg-white rounded-lg shadow-md divide-y">
        {/* Notifications */}
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Bell className="w-6 h-6 text-gray-600" />
            <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
          </div>
          <div className="space-y-3">
            <label className="flex items-center justify-between">
              <span className="text-gray-700">Game invitations</span>
              <input type="checkbox" defaultChecked className="w-5 h-5" />
            </label>
            <label className="flex items-center justify-between">
              <span className="text-gray-700">Friend requests</span>
              <input type="checkbox" defaultChecked className="w-5 h-5" />
            </label>
            <label className="flex items-center justify-between">
              <span className="text-gray-700">Game updates</span>
              <input type="checkbox" className="w-5 h-5" />
            </label>
          </div>
        </div>

        {/* Privacy */}
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Lock className="w-6 h-6 text-gray-600" />
            <h2 className="text-xl font-bold text-gray-900">Privacy</h2>
          </div>
          <div className="space-y-3">
            <label className="flex items-center justify-between">
              <span className="text-gray-700">Show online status</span>
              <input type="checkbox" defaultChecked className="w-5 h-5" />
            </label>
            <label className="flex items-center justify-between">
              <span className="text-gray-700">Allow friend requests</span>
              <input type="checkbox" defaultChecked className="w-5 h-5" />
            </label>
          </div>
        </div>

        {/* Appearance */}
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Palette className="w-6 h-6 text-gray-600" />
            <h2 className="text-xl font-bold text-gray-900">Appearance</h2>
          </div>
          <select className="input-field">
            <option>Light Mode</option>
            <option>Dark Mode</option>
            <option>System Default</option>
          </select>
        </div>

        {/* Language */}
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Globe className="w-6 h-6 text-gray-600" />
            <h2 className="text-xl font-bold text-gray-900">Language</h2>
          </div>
          <select className="input-field">
            <option>English</option>
            <option>Yoruba</option>
            <option>Igbo</option>
            <option>Hausa</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Settings;
