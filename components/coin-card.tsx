'use client';

import { CoinMarket } from '@/types/crypto';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatPrice, formatPercentage, formatMarketCap, getPercentageColor } from '@/lib/format';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface CoinCardProps {
  coin: CoinMarket;
}

export function CoinCard({ coin }: CoinCardProps) {
  const priceChange = coin.price_change_percentage_24h;
  const isPositive = priceChange >= 0;

  return (
    <Link href={`/coins/${coin.id}`} className="block">
      <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative w-10 h-10">
                <Image
                  src={coin.image}
                  alt={coin.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                  {coin.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 uppercase">
                  {coin.symbol}
                </p>
              </div>
            </div>
            <Badge variant="secondary" className="text-xs">
              #{coin.market_cap_rank}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatPrice(coin.current_price)}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Current Price
                </p>
              </div>
              <div className={`flex items-center space-x-1 ${getPercentageColor(priceChange)}`}>
                {isPositive ? (
                  <ArrowUpIcon className="w-4 h-4" />
                ) : (
                  <ArrowDownIcon className="w-4 h-4" />
                )}
                <span className="font-semibold">
                  {formatPercentage(priceChange)}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500 dark:text-gray-400">24h High</p>
                <p className="font-semibold text-green-600">
                  {formatPrice(coin.high_24h)}
                </p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400">24h Low</p>
                <p className="font-semibold text-red-600">
                  {formatPrice(coin.low_24h)}
                </p>
              </div>
            </div>
            
            <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Market Cap</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {formatMarketCap(coin.market_cap)}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}