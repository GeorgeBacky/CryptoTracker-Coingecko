export function formatPrice(price: number | null | undefined): string {
  if (price == null || isNaN(price)) return '-';
  if (price >= 1) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  } else {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 6,
      maximumFractionDigits: 6,
    }).format(price);
  }
}

export function formatPercentage(percentage: number | null | undefined): string {
  if (percentage == null || isNaN(percentage)) return '-';
  return `${percentage > 0 ? '+' : ''}${percentage.toFixed(2)}%`;
}

export function formatMarketCap(marketCap: number | null | undefined): string {
  if (marketCap == null || isNaN(marketCap)) return '-';
  if (marketCap >= 1e12) {
    return `$${(marketCap / 1e12).toFixed(2)}T`;
  } else if (marketCap >= 1e9) {
    return `$${(marketCap / 1e9).toFixed(2)}B`;
  } else if (marketCap >= 1e6) {
    return `$${(marketCap / 1e6).toFixed(2)}M`;
  } else {
    return `$${marketCap.toFixed(0)}`;
  }
}

export function getPercentageColor(percentage: number | null | undefined): string {
  if (percentage == null || isNaN(percentage)) return '';
  return percentage >= 0 ? 'text-green-600' : 'text-red-600';
}