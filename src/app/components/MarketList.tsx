'use client';

import {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';

interface Market {
  id: string;
  question: string;
  volume: any;
  liquidity: any;
  endDate: string;
  slug: string;
  description?: string;
  tokens?: {
    token_id: string;
    outcome: string;
  }[];
  rewards?: {
    min_size: number;
    max_spread: number;
    event_start_date: string;
    event_end_date: string;
    in_game_multiplier: number;
    reward_epoch: number;
  };
}

export default function MarketList() {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedMarket, setExpandedMarket] = useState<string | null>(null);

  useEffect(() => {
    const fetchMarkets = async () => {
      try {
        const response = await axios.get('https://gamma-api.polymarket.com/markets?limit=10&active=true');
        setMarkets(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching markets:', error);
        setError('Failed to fetch markets. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchMarkets();
  }, []);

  const toggleMarketExpansion = (marketId: string) => {
    setExpandedMarket(expandedMarket === marketId ? null : marketId);
  };

  if (isLoading) return <p>Loading markets...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="text-gray-800">
      <h2 className="text-2xl font-bold mb-4">Current Markets</h2>
      {markets.length > 0 ? (
        <ul className="space-y-4">
          {markets.map((market) => (
            <li key={market.id} className="border p-4 rounded-lg bg-white shadow-md">
              <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleMarketExpansion(market.id)}>
                <h3 className="text-xl font-semibold">{market.question}</h3>
                <span>{expandedMarket === market.id ? '▲' : '▼'}</span>
              </div>
              <p>Volume: ${typeof market.volume === 'number' ? market.volume.toFixed(2) : market.volume}</p>
              <p>Liquidity: ${typeof market.liquidity === 'number' ? market.liquidity.toFixed(2) : market.liquidity}</p>
              <p>End Date: {market.endDate ? new Date(market.endDate).toLocaleDateString() : 'N/A'}</p>
              <p>Slug: {market.slug}</p>
              
              {expandedMarket === market.id && (
                <div className="mt-4 p-4 bg-gray-100 rounded text-gray-700">
                  <h4 className="font-semibold mb-2 text-gray-800">Market Details:</h4>
                  <p className="mb-4 text-gray-800">{market.description || 'No description available.'}</p>
                  
                  {market.tokens && market.tokens.length > 0 && (
                    <div className="mt-2">
                      <h5 className="font-semibold text-gray-800">Tokens:</h5>
                      <ul className="list-disc list-inside">
                        {market.tokens.map((token, index) => (
                          <li key={index}>
                            Token ID: {token.token_id}, Outcome: {token.outcome}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {market.rewards && (
                    <div className="mt-2">
                      <h5 className="font-semibold text-gray-800">Rewards:</h5>
                      <p><span className="font-medium">Minimum Size:</span> {market.rewards.min_size}</p>
                      <p><span className="font-medium">Maximum Spread:</span> {market.rewards.max_spread}</p>
                      <p><span className="font-medium">Event Start:</span> {new Date(market.rewards.event_start_date).toLocaleString()}</p>
                      <p><span className="font-medium">Event End:</span> {new Date(market.rewards.event_end_date).toLocaleString()}</p>
                      <p><span className="font-medium">In-game Multiplier:</span> {market.rewards.in_game_multiplier}</p>
                      <p><span className="font-medium">Reward Epoch:</span> {market.rewards.reward_epoch}</p>
                    </div>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No markets available.</p>
      )}
    </div>
  );
}