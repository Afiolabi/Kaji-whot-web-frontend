import { useState } from 'react';

const RoomFilters = () => {
  const [filters, setFilters] = useState({
    playerCount: 'all',
    status: 'all',
    entryFee: 'all',
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Player Count
        </label>
        <select
          value={filters.playerCount}
          onChange={(e) => setFilters({ ...filters, playerCount: e.target.value })}
          className="input-field"
        >
          <option value="all">All</option>
          <option value="2">2 Players</option>
          <option value="3">3 Players</option>
          <option value="4">4 Players</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Status
        </label>
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          className="input-field"
        >
          <option value="all">All</option>
          <option value="waiting">Waiting</option>
          <option value="active">In Progress</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Entry Fee
        </label>
        <select
          value={filters.entryFee}
          onChange={(e) => setFilters({ ...filters, entryFee: e.target.value })}
          className="input-field"
        >
          <option value="all">All</option>
          <option value="free">Free</option>
          <option value="paid">Paid</option>
        </select>
      </div>

      <button className="w-full py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600">
        Apply Filters
      </button>
    </div>
  );
};

export default RoomFilters;