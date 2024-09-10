'use client';

interface Trade {
  id: string;
  market: {
    question: string;
  };
  outcomeIndex: number;
  price: number;
  amount: number;
  type: 'BUY' | 'SELL';
  traderAddress: string;
  timestamp: string;
}

export default function Activity() {
  return (
    <div>
      <h2>Activity</h2>
      {/* Add activity content here */}
    </div>
  );
}
