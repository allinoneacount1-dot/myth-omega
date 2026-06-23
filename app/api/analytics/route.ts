import { NextResponse } from 'next/server';

// Simulated MYTH token analytics — in production, this would pull from
// on-chain data (Helius DAS API, Jupiter, Birdeye, etc.)

function generateAnalytics() {
  const now = Date.now();
  const dayMs = 86400000;

  // Generate 30 days of price history
  const priceHistory: { date: string; price: number; volume: number }[] = [];
  let basePrice = 0.042 + Math.random() * 0.015;
  for (let i = 29; i >= 0; i--) {
    const date = new Date(now - i * dayMs);
    const change = (Math.random() - 0.45) * 0.008;
    basePrice = Math.max(0.015, basePrice + change);
    priceHistory.push({
      date: date.toISOString().split('T')[0],
      price: parseFloat(basePrice.toFixed(6)),
      volume: Math.floor(50000 + Math.random() * 200000),
    });
  }

  const currentPrice = priceHistory[priceHistory.length - 1].price;
  const prevPrice = priceHistory[priceHistory.length - 2].price;
  const priceChange24h = ((currentPrice - prevPrice) / prevPrice) * 100;

  // Generate holder distribution
  const holderTiers = [
    { tier: 'Whale (>100K)', count: 12, share: 34.2 },
    { tier: 'Large (10K-100K)', count: 89, share: 28.7 },
    { tier: 'Medium (1K-10K)', count: 412, share: 22.1 },
    { tier: 'Small (100-1K)', count: 1847, share: 11.4 },
    { tier: 'Dust (<100)', count: 5234, share: 3.6 },
  ];

  // Generate on-chain activity
  const onChainActivity = [
    { metric: 'Active Wallets (24h)', value: 1247, change: 8.3 },
    { metric: 'Transactions (24h)', value: 3891, change: -2.1 },
    { metric: 'Avg Hold Time', value: '47 days', change: 12.5 },
    { metric: 'Transfer Count (7d)', value: 28473, change: 5.7 },
  ];

  // Generate market metrics
  const marketMetrics = {
    price: currentPrice,
    priceChange24h: parseFloat(priceChange24h.toFixed(2)),
    marketCap: Math.floor(currentPrice * 100000000),
    fullyDilutedValuation: Math.floor(currentPrice * 1000000000),
    volume24h: priceHistory[priceHistory.length - 1].volume,
    liquidity: 2847500,
    circulatingSupply: 100000000,
    totalSupply: 1000000000,
    allTimeHigh: 0.089,
    allTimeLow: 0.012,
  };

  // Generate civilization token flows
  const civFlows = [
    { name: 'Aetheria', inflow: 45200, outflow: 32100, net: 13100 },
    { name: 'Chronos Veil', inflow: 28400, outflow: 31200, net: -2800 },
    { name: 'The Amber Highlands', inflow: 67800, outflow: 41300, net: 26500 },
    { name: 'Void Meridian', inflow: 12300, outflow: 18700, net: -6400 },
    { name: 'Ember Accord', inflow: 51200, outflow: 38900, net: 12300 },
    { name: 'Silent Bloom', inflow: 23100, outflow: 19800, net: 3300 },
  ];

  return {
    market: marketMetrics,
    priceHistory,
    holderTiers,
    onChainActivity,
    civFlows,
    lastUpdated: new Date().toISOString(),
  };
}

export async function GET() {
  try {
    const analytics = generateAnalytics();
    return NextResponse.json(analytics);
  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json({ error: 'Analytics temporarily unavailable' }, { status: 500 });
  }
}
