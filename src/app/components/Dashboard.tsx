'use client';

import { useState } from 'react';

import Activity from '@/app/components/Activity';
import MarketList from '@/app/components/MarketList';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('markets');

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Polymarket Dashboard</h1>
      <div className="mb-4">
        <button
          className={`mr-2 px-4 py-2 rounded ${activeTab === 'markets' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('markets')}
        >
          Markets
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === 'activity' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('activity')}
        >
          Activity
        </button>
      </div>

      {activeTab === 'markets' && <MarketList />}
      {activeTab === 'activity' && <Activity />}
    </div>
  );
}
