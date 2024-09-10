'use client';

import React, {
  useEffect,
  useState,
} from 'react';

import Link from 'next/link';

import PolymarketEmbed from './PolymarketEmbed';

interface Market {
  id: string;
  slug: string;
  question: string;
  creator: string;
  volume: number;
  liquidity: number;
  createdAt: string;
  isResolved: boolean;
  outcomePrices: { [key: string]: number };
}

interface Event {
  id: string;
  slug: string;
  title: string;
  description: string;
  markets: Market[];
  volume: number;
  liquidity: number;
  createdAt: string;
}

const PolymarketEmbedList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedEvents, setExpandedEvents] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('https://gamma-api.polymarket.com/events?closed=false&limit=50');
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        console.log('API Response:', data);

        // Log details for each event and its markets
        data.forEach((event: Event, index: number) => {
          console.log(`Event ${index + 1}:`, {
            id: event.id,
            title: event.title,
            marketsCount: event.markets.length,
            volume: event.volume,
            liquidity: event.liquidity
          });

          event.markets.forEach((market: Market, marketIndex: number) => {
            console.log(`  Market ${marketIndex + 1} of Event ${index + 1}:`, {
              id: market.id,
              question: market.question,
              isResolved: market.isResolved,
              outcomePrices: market.outcomePrices,
              volume: market.volume,
              liquidity: market.liquidity
            });
          });
        });

        // For now, let's set all events without filtering
        setEvents(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching events:', error);
        setError('Failed to fetch events. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const toggleEvent = (eventId: string) => {
    setExpandedEvents((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(eventId)) {
        newSet.delete(eventId);
      } else {
        newSet.add(eventId);
      }
      return newSet;
    });
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      <Link href="/" className="inline-block mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition duration-150 ease-in-out">
        ← Back to Home
      </Link>
      
      {isLoading && <p className="text-center text-xl font-semibold">Loading markets...</p>}
      {error && <p className="text-center text-xl font-semibold text-red-500">{error}</p>}
      {!isLoading && !error && events.length === 0 && <p className="text-center text-xl font-semibold">No active markets found.</p>}
      
      {events.map((event) => (
        <div key={event.id} className="border rounded-lg shadow-md overflow-hidden bg-white">
          <button
            className="w-full text-left p-4 bg-blue-600 hover:bg-blue-700 focus:outline-none transition duration-150 ease-in-out"
            onClick={() => toggleEvent(event.id)}
          >
            <h2 className="text-xl font-bold text-white">{event.title}</h2>
            <span className="text-sm text-blue-200">
              {expandedEvents.has(event.id) ? 'Click to collapse' : 'Click to expand'}
            </span>
          </button>
          {expandedEvents.has(event.id) && (
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-100">
              {event.markets.map((market) => (
                <div key={market.id} className="border p-4 rounded-lg shadow-sm bg-white">
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">{market.question}</h3>
                  <PolymarketEmbed
                    market={market.slug}
                    creator={market.creator}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PolymarketEmbedList;
