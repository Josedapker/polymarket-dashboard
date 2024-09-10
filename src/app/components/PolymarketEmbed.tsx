'use client';

import React from 'react';

interface PolymarketEmbedProps {
  market: string;
  creator: string;
  theme?: 'light' | 'dark';
  features?: string;
  width?: number;
  height?: number;
}

const PolymarketEmbed: React.FC<PolymarketEmbedProps> = ({
  market,
  creator,
  theme = 'dark',
  features = 'volume',
  width = 400,
  height = 180,
}) => {
  console.log('Rendering PolymarketEmbed:', { market, creator });
  const src = `https://embed.polymarket.com/market.html?market=${encodeURIComponent(market)}&features=${features}&theme=${theme}&creator=${creator}`;

  return (
    <iframe
      title="polymarket-market-iframe"
      src={src}
      width={width}
      height={height}
      frameBorder="0"
    />
  );
};

export default PolymarketEmbed;