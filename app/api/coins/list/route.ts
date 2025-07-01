import { NextRequest, NextResponse } from 'next/server';
import { CoinListItem, CoinListResponse } from '@/types/crypto';

// Rate limiting: Simple in-memory store for demo purposes
// In production, use Redis or similar persistent storage
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 30; // 30 requests per minute

/**
 * Simple rate limiting implementation
 * Respects CoinGecko's API guidelines for public endpoints
 */
function checkRateLimit(clientId: string): boolean {
  const now = Date.now();
  const clientData = rateLimitStore.get(clientId);

  if (!clientData || now > clientData.resetTime) {
    // Reset or initialize rate limit for client
    rateLimitStore.set(clientId, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW
    });
    return true;
  }

  if (clientData.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false; // Rate limit exceeded
  }

  // Increment request count
  clientData.count++;
  return true;
}

/**
 * GET /api/coins/list
 * Fetches the complete list of cryptocurrencies from CoinGecko
 * Returns the first 10 results with proper error handling and rate limiting
 */
export async function GET(request: NextRequest) {
  try {
    // Get client IP for rate limiting (fallback to a default for local development)
    const clientIp = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'localhost';

    // Check rate limit
    if (!checkRateLimit(clientIp)) {
      return NextResponse.json(
        { 
          error: 'Rate limit exceeded. Please try again later.',
          retryAfter: 60 
        },
        { 
          status: 429,
          headers: {
            'Retry-After': '60'
          }
        }
      );
    }

    // Make request to CoinGecko API with proper headers
    const response = await fetch(
      'https://api.coingecko.com/api/v3/coins/list',
      {
        headers: {
          'Accept': 'application/json',
          'x-cg-demo-api-key': process.env.COINGECKO_API_KEY || ''
        },
        // Cache for 5 minutes to reduce API calls
        next: { revalidate: 300 }
      }
    );

    // Handle API response errors
    if (!response.ok) {
      console.error(`CoinGecko API error: ${response.status} ${response.statusText}`);
      
      if (response.status === 429) {
        return NextResponse.json(
          { error: 'API rate limit exceeded. Please try again later.' },
          { status: 429 }
        );
      }
      
      throw new Error(`CoinGecko API error: ${response.status}`);
    }

    // Parse JSON response
    const data: CoinListItem[] = await response.json();
    
    // Validate response structure
    if (!Array.isArray(data)) {
      throw new Error('Invalid response format from CoinGecko API');
    }

    // Extract and structure the first 10 results
    const limitedResults = data.slice(0, 10).map(coin => ({
      id: coin.id || 'unknown',
      symbol: coin.symbol || 'unknown',
      name: coin.name || 'Unknown Coin'
    }));

    // Prepare structured response
    const coinListResponse: CoinListResponse = {
      coins: limitedResults,
      total: limitedResults.length
    };

    // Log successful fetch for monitoring
    console.log(`Successfully fetched ${limitedResults.length} coins from CoinGecko API`);

    return NextResponse.json(coinListResponse, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
      }
    });

  } catch (error) {
    // Comprehensive error handling
    console.error('Error fetching coins list:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch cryptocurrency list',
        details: errorMessage,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}