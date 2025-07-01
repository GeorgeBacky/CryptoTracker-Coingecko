import { NextRequest, NextResponse } from 'next/server';
import { CoinDetail } from '@/types/crypto';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${params.id}?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false`,
      {
        headers: {
          'Accept': 'application/json',
          'x-cg-demo-api-key': process.env.COINGECKO_API_KEY || ''
        },
        next: { revalidate: 60 } // Cache for 60 seconds
      }
    );

    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`);
    }

    const data: CoinDetail = await response.json();
    
    // Return only necessary fields
    const filteredData = {
      id: data.id,
      symbol: data.symbol,
      name: data.name,
      image: data.image,
      description: data.description,
      market_data: {
        current_price: data.market_data.current_price,
        price_change_24h: data.market_data.price_change_24h,
        price_change_percentage_24h: data.market_data.price_change_percentage_24h,
        price_change_percentage_7d: data.market_data.price_change_percentage_7d,
        price_change_percentage_14d: data.market_data.price_change_percentage_14d,
        price_change_percentage_30d: data.market_data.price_change_percentage_30d,
        price_change_percentage_60d: data.market_data.price_change_percentage_60d,
        price_change_percentage_200d: data.market_data.price_change_percentage_200d,
        price_change_percentage_1y: data.market_data.price_change_percentage_1y,
        high_24h: data.market_data.high_24h,
        low_24h: data.market_data.low_24h,
        market_cap: data.market_data.market_cap,
        total_volume: data.market_data.total_volume,
      },
    };

    return NextResponse.json(filteredData);
  } catch (error) {
    console.error('Error fetching coin data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch coin data' },
      { status: 500 }
    );
  }
}