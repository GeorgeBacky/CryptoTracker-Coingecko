'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { CoinDetail } from '@/types/crypto';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { formatPrice, formatPercentage, formatMarketCap, getPercentageColor } from '@/lib/format';
import { ArrowLeftIcon, ArrowUpIcon, ArrowDownIcon, RefreshCwIcon } from 'lucide-react';
import Image from 'next/image';

export default function CoinDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [coin, setCoin] = useState<CoinDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchCoinDetail = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/coins/${params.id}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch coin details');
      }
      
      const data: CoinDetail = await response.json();
      setCoin(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchCoinDetail();
  };

  useEffect(() => {
    if (params.id) {
      fetchCoinDetail();
    }
  }, [params.id]);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => router.back()} variant="outline">
              Go Back
            </Button>
            <Button onClick={fetchCoinDetail} className="bg-blue-600 hover:bg-blue-700">
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            onClick={() => router.back()}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back
          </Button>
          <Button
            onClick={handleRefresh}
            disabled={refreshing}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <RefreshCwIcon className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {loading ? (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Skeleton className="w-16 h-16 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <Skeleton className="h-12 w-32" />
                    <Skeleton className="h-6 w-24" />
                  </div>
                  <div className="space-y-4">
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-3/4" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-48" />
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-6 w-20" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : coin ? (
          <div className="space-y-6">
            {/* Coin Overview */}
            <Card className="border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Image
                    src={coin.image.large}
                    alt={coin.name}
                    width={64}
                    height={64}
                    className="rounded-full"
                  />
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                      {coin.name}
                    </h1>
                    <Badge variant="secondary" className="mt-2">
                      {coin.symbol.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <p className="text-4xl font-bold text-gray-900 dark:text-white">
                        {formatPrice(coin.market_data.current_price.usd)}
                      </p>
                      <div className={`flex items-center gap-2 mt-2 ${getPercentageColor(coin.market_data.price_change_percentage_24h)}`}>
                        {coin.market_data.price_change_percentage_24h >= 0 ? (
                          <ArrowUpIcon className="w-5 h-5" />
                        ) : (
                          <ArrowDownIcon className="w-5 h-5" />
                        )}
                        <span className="text-lg font-semibold">
                          {formatPercentage(coin.market_data.price_change_percentage_24h)}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          (24h)
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">24h High</p>
                        <p className="text-lg font-semibold text-green-600">
                          {formatPrice(coin.market_data.high_24h.usd)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">24h Low</p>
                        <p className="text-lg font-semibold text-red-600">
                          {formatPrice(coin.market_data.low_24h.usd)}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Market Cap</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {formatMarketCap(coin.market_data.market_cap.usd)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">24h Volume</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {formatMarketCap(coin.market_data.total_volume.usd)}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Price Changes */}
            <Card className="border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                  Price Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { period: '7d', value: coin.market_data.price_change_percentage_7d },
                    { period: '14d', value: coin.market_data.price_change_percentage_14d },
                    { period: '30d', value: coin.market_data.price_change_percentage_30d },
                    { period: '60d', value: coin.market_data.price_change_percentage_60d },
                    { period: '200d', value: coin.market_data.price_change_percentage_200d },
                    { period: '1y', value: coin.market_data.price_change_percentage_1y },
                  ].filter(item => item.value !== null && item.value !== undefined).map((item) => (
                    <div key={item.period} className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                        {item.period}
                      </p>
                      <p className={`text-lg font-semibold ${getPercentageColor(item.value)}`}>
                        {formatPercentage(item.value)}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            {coin.description.en && (
              <Card className="border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                    About {coin.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div 
                    className="prose prose-gray dark:prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ 
                      __html: coin.description.en.split('.').slice(0, 3).join('.') + '.' 
                    }}
                  />
                </CardContent>
              </Card>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}