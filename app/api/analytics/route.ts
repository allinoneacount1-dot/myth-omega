// MYTH Analytics — Real-time data from free APIs
// CoinGecko (free, no key) + Solana public RPC + Helius free tier

import { NextRequest, NextResponse } from 'next/server';

const COINGECKO_BASE = 'https://api.coingecko.com/api/v3';
const SOLANA_RPC = 'https://api.mainnet-beta.solana.com';
const BIRDEYE_BASE = 'https://public-api.birdeye.so';

// Cache to respect rate limits
const cache = new Map<string, { data: any; expiry: number }>();
const CACHE_TTL = 30_000; // 30 seconds

async function fetchCached<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
  const cached = cache.get(key);
  if (cached && Date.now() < cached.expiry) return cached.data as T;
  const data = await fetcher();
  cache.set(key, { data, expiry: Date.now() + CACHE_TTL });
  return data;
}

// ─── CoinGecko: Get crypto prices ──────────────────────────────────
async function fetchCryptoPrices() {
  return fetchCached('prices', async () => {
    try {
      const res = await fetch(
        `${COINGECKO_BASE}/coins/markets?vs_currency=usd&ids=solana,bitcoin,ethereum&order=market_cap_desc&sparkline=false&price_change_percentage=24h,7d`,
        { cache: 'no-store' }
      );
      if (!res.ok) throw new Error(`CoinGecko ${res.status}`);
      const data = await res.json();
      return data.map((c: any) => ({
        symbol: c.symbol.toUpperCase(),
        name: c.name,
        price: c.current_price,
        change24h: c.price_change_percentage_24h,
        change7d: c.price_change_percentage_7d_in_currency,
        marketCap: c.market_cap,
        volume24h: c.total_volume,
        sparkline: null, // free tier doesn't include sparkline
      }));
    } catch (error) {
      console.error('CoinGecko error:', error);
      return getFallbackPrices();
    }
  });
}

function getFallbackPrices() {
  // Fallback data when API is rate-limited
  return [
    { symbol: 'SOL', name: 'Solana', price: 0, change24h: 0, change7d: 0, marketCap: 0, volume24h: 0 },
    { symbol: 'BTC', name: 'Bitcoin', price: 0, change24h: 0, change7d: 0, marketCap: 0, volume24h: 0 },
    { symbol: 'ETH', name: 'Ethereum', price: 0, change24h: 0, change7d: 0, marketCap: 0, volume24h: 0 },
  ];
}

// ─── Solana RPC: Get network stats ──────────────────────────────────
async function fetchSolanaNetworkStats() {
  return fetchCached('solana_network', async () => {
    try {
      // Get recent performance samples
      const perfRes = await fetch(SOLANA_RPC, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'getRecentPerformanceSamples',
          params: [5],
        }),
        cache: 'no-store',
      });
      const perfData = await perfRes.json();
      const samples = perfData.result || [];

      // Calculate average TPS
      let avgTps = 0;
      if (samples.length > 0) {
        const tpsValues = samples
          .filter((s: any) => s.numTransactions && s.samplePeriodSecs)
          .map((s: any) => Math.round(s.numTransactions / s.samplePeriodSecs));
        avgTps = tpsValues.length > 0 ? Math.round(tpsValues.reduce((a: number, b: number) => a + b, 0) / tpsValues.length) : 0;
      }

      // Get slot
      const slotRes = await fetch(SOLANA_RPC, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'getSlot' }),
        cache: 'no-store',
      });
      const slotData = await slotRes.json();

      // Get supply
      const supplyRes = await fetch(SOLANA_RPC, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'getSupply',
          params: { commitment: 'finalized' },
        }),
        cache: 'no-store',
      });
      const supplyData = await supplyRes.json();
      const supply = supplyData.result?.value;
      const circulatingSupply = supply ? Math.round(supply.circulating / 1e9) : 0;
      const totalSupply = supply ? Math.round(supply.total / 1e9) : 0;

      return {
        currentSlot: slotData.result || 0,
        avgTps,
        circulatingSupply,
        totalSupply,
        source: 'Solana RPC (public)',
      };
    } catch (error) {
      console.error('Solana RPC error:', error);
      return { currentSlot: 0, avgTps: 0, circulatingSupply: 0, totalSupply: 0, source: 'fallback' };
    }
  });
}

// ─── Helius: Get token data (free tier) ────────────────────────────
async function fetchHeliusTokenData(mintAddress?: string) {
  const apiKey = process.env.HELIUS_API_KEY;
  if (!apiKey) return null;

  return fetchCached('helius_token', async () => {
    try {
      // Get token metadata if mint address provided
      if (mintAddress) {
        const res = await fetch(`https://api.helius.xyz/v0/token-metadata?apikey=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mintAccounts: [mintAddress] }),
          cache: 'no-store',
        });
        if (res.ok) return await res.json();
      }

      // Get Top Holders of a known token ( Wrapped SOL as reference )
      const wsol = 'So11111111111111111111111111111111111111112';
      const holderRes = await fetch(`${BIRDEYE_BASE}/defi/token_holder?address=${wsol}&offset=0&limit=10`, {
        headers: { 'X-API-KEY': apiKey, 'chain': 'solana' },
        cache: 'no-store',
      });

      if (holderRes.ok) {
        const holderData = await holderRes.json();
        return { holders: holderData.data?.items || [], source: 'Birdeye' };
      }

      return null;
    } catch (error) {
      console.error('Helius/Birdeye error:', error);
      return null;
    }
  });
}

// ─── CoinGecko: Get global market data ──────────────────────────────
async function fetchGlobalMarketData() {
  return fetchCached('global_market', async () => {
    try {
      const res = await fetch(`${COINGECKO_BASE}/global`, { cache: 'no-store' });
      if (!res.ok) throw new Error(`CoinGecko global ${res.status}`);
      const data = await res.json();
      return {
        totalMarketCap: data.data?.total_market_cap?.usd || 0,
        totalVolume: data.data?.total_volume?.usd || 0,
        btcDominance: data.data?.market_cap_percentage?.btc || 0,
        ethDominance: data.data?.market_cap_percentage?.eth || 0,
        marketCapChange24h: data.data?.market_cap_change_percentage_24h_usd || 0,
        activeCryptocurrencies: data.data?.active_cryptocurrencies || 0,
        markets: data.data?.markets || 0,
      };
    } catch (error) {
      console.error('Global market error:', error);
      return {
        totalMarketCap: 0,
        totalVolume: 0,
        btcDominance: 0,
        ethDominance: 0,
        marketCapChange24h: 0,
        activeCryptocurrencies: 0,
        markets: 0,
      };
    }
  });
}

// ─── Solana: Get recent transactions as activity proxy ──────────────
async function fetchSolanaActivity() {
  return fetchCached('solana_activity', async () => {
    try {
      // Get recent block production
      const blockRes = await fetch(SOLANA_RPC, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'getRecentPerformanceSamples',
          params: [10],
        }),
        cache: 'no-store',
      });
      const blockData = await blockRes.json();
      const samples = blockData.result || [];

      const recentBlocks = samples.map((s: any) => ({
        slot: s.slot,
        tps: s.numTransactions && s.samplePeriodSecs ? Math.round(s.numTransactions / s.samplePeriodSecs) : 0,
        transactions: s.numTransactions || 0,
      }));

      return {
        recentBlocks,
        avgTps: recentBlocks.length > 0
          ? Math.round(recentBlocks.reduce((a: number, b: any) => a + b.tps, 0) / recentBlocks.length)
          : 0,
        source: 'Solana RPC (public)',
      };
    } catch (error) {
      console.error('Solana activity error:', error);
      return { recentBlocks: [], avgTps: 0, source: 'fallback' };
    }
  });
}

// ─── Main handler ──────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type') || 'all';

  try {
    const result: any = { timestamp: new Date().toISOString() };

    if (type === 'all' || type === 'prices') {
      result.cryptoPrices = await fetchCryptoPrices();
    }

    if (type === 'all' || type === 'network') {
      result.solanaNetwork = await fetchSolanaNetworkStats();
    }

    if (type === 'all' || type === 'market') {
      result.globalMarket = await fetchGlobalMarketData();
    }

    if (type === 'all' || type === 'activity') {
      result.solanaActivity = await fetchSolanaActivity();
    }

    if (type === 'all' || type === 'token') {
      const mint = searchParams.get('mint') || process.env.MYTH_TOKEN_MINT;
      if (mint || process.env.HELIUS_API_KEY) {
        result.tokenData = await fetchHeliusTokenData(mint || undefined);
      }
    }

    // Add data source info
    result.sources = {
      prices: 'CoinGecko API (free, 50 req/min)',
      network: 'Solana public RPC',
      market: 'CoinGecko API (free)',
      activity: 'Solana public RPC',
      token: process.env.HELIUS_API_KEY ? 'Helius free tier (100k req/day)' : 'Not configured — set HELIUS_API_KEY for token data',
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json(
      { error: 'Analytics temporarily unavailable', timestamp: new Date().toISOString() },
      { status: 500 }
    );
  }
}
