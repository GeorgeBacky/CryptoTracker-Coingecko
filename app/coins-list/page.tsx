'use client';

import { useState, useEffect } from 'react';
import { CoinListItem, CoinListResponse } from '@/types/crypto';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { RefreshCwIcon, ListIcon, ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';

export default function CoinsListPage() {
  const [coinsList, setCoinsList] = useState<CoinListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [lastFetched, setLastFetched] = useState<Date | null>(null);

  /**
   * Fetches the cryptocurrency list from our API endpoint
   * Implements proper error handling and loading states
   */
  const fetchCoinsList = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/coins/list');
      
      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('Rate limit exceeded. Please wait a moment before trying again.');
        }
        throw new Error(`Failed to fetch coins list: ${response.status}`);
      }
      
      const data: CoinListResponse = await response.json();
      
      // Validate response structure
      if (!data.coins || !Array.isArray(data.coins)) {
        throw new Error('Invalid response format received');
      }
      
      setCoinsList(data.coins);
      setLastFetched(new Date());
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      console.error('Error fetching coins list:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  /**
   * Handles manual refresh with visual feedback
   */
  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchCoinsList();
  };

  // Initial data fetch on component mount
  useEffect(() => {
    fetchCoinsList();
  }, []);

  // Error state with retry option
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
          <div className="flex gap-4 justify-center">
            <Link href="/">
              <Button variant="outline">
                <ArrowLeftIcon className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <Button onClick={fetchCoinsList} className="bg-blue-600 hover:bg-blue-700">
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md mx-auto px-2 py-8 sm:container sm:mx-auto sm:px-4">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-green-600 to-blue-600 p-3 rounded-full">
              <ListIcon className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Cryptocurrency List
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
            Complete list of cryptocurrencies available on CoinGecko
          </p>
          
          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeftIcon className="w-4 h-4" />
                Back to Market
              </Button>
            </Link>
            <Button
              onClick={handleRefresh}
              disabled={refreshing}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RefreshCwIcon className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh List
            </Button>
          </div>
          
          {/* Last Updated Info */}
          {lastFetched && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              Last updated: {lastFetched.toLocaleString()}
            </p>
          )}
        </div>

        {/* Results Section */}
        <Card className="border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <ListIcon className="w-5 h-5" />
              Top 10 Cryptocurrencies
            </CardTitle>
            <p className="text-gray-600 dark:text-gray-400">
              Displaying the first 10 results from CoinGecko's comprehensive cryptocurrency database
            </p>
          </CardHeader>
          <CardContent>
            {loading ? (
              // Loading skeletons
              <div className="space-y-4">
                {Array.from({ length: 10 }).map((_, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-4">
                      <Skeleton className="w-8 h-8 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                    </div>
                    <Skeleton className="h-6 w-20" />
                  </div>
                ))}
              </div>
            ) : (
              // Coins list display
              <div className="space-y-3">
                {coinsList.map((coin, index) => (
                  <div 
                    key={coin.id} 
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      {/* Rank Badge */}
                      <Badge variant="secondary" className="min-w-[2rem] justify-center">
                        {index + 1}
                      </Badge>
                      
                      {/* Coin Information */}
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                          {coin.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          ID: {coin.id}
                        </p>
                      </div>
                    </div>
                    
                    {/* Symbol Badge */}
                    <Badge variant="outline" className="uppercase font-mono">
                      {coin.symbol}
                    </Badge>
                  </div>
                ))}
                
                {/* Empty state */}
                {coinsList.length === 0 && !loading && (
                  <div className="text-center py-8">
                    <div className="text-gray-500 text-4xl mb-4">📋</div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      No data available
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Unable to load cryptocurrency list at this time
                    </p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}