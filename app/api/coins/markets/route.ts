import { NextRequest, NextResponse } from 'next/server';
import { CoinMarket, MarketResponse } from '@/types/crypto';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.get('page') || '1';
    const per_page = searchParams.get('per_page') || '20';
    const ids = searchParams.get('ids'); // comma-separated list of coin ids

    let url = '';
    if (ids) {
      // If ids are provided, fetch only those coins
      url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&sparkline=false&price_change_percentage=24h`;
    } else {
      // Default: paginated market data
      url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${per_page}&page=${page}&sparkline=false&price_change_percentage=24h`;
    }

    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'x-cg-demo-api-key': process.env.COINGECKO_API_KEY || ''
      },
      next: { revalidate: 60 } // Cache for 60 seconds
    });

    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`);
    }

    const data: CoinMarket[] = await response.json();
    
    // Filter and return only necessary fields
    const filteredData = data.map(coin => ({
      id: coin.id,
      symbol: coin.symbol,
      name: coin.name,
      image: coin.image,
      current_price: coin.current_price,
      market_cap: coin.market_cap,
      market_cap_rank: coin.market_cap_rank,
      price_change_24h: coin.price_change_24h,
      price_change_percentage_24h: coin.price_change_percentage_24h,
      high_24h: coin.high_24h,
      low_24h: coin.low_24h,
      total_volume: coin.total_volume,
    }));

    const marketResponse: MarketResponse = {
      coins: filteredData,
      total: filteredData.length,
      page: parseInt(page),
      per_page: parseInt(per_page),
    };

    return NextResponse.json(marketResponse);
  } catch (error) {
    console.error('Error fetching market data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch market data' },
      { status: 500 }
    );
  }
}