# 🚀 Cryptocurrency Price Tracker

A modern, responsive web application for tracking cryptocurrency prices and market trends in real-time. Built with Next.js, TypeScript, and Tailwind CSS.

## ✨ Features

- **Real-time Price Tracking**: Live cryptocurrency prices with 24-hour price changes
- **Market Data**: Comprehensive market information including market cap, volume, and price ranges
- **Search Functionality**: Search cryptocurrencies by name or symbol
- **Responsive Design**: Beautiful UI that works on desktop, tablet, and mobile devices
- **Pagination**: Navigate through large lists of cryptocurrencies
- **Individual Coin Details**: Detailed pages for each cryptocurrency
- **Price Formatting**: Smart formatting for different price ranges
- **Loading States**: Smooth loading animations and skeleton screens
- **Error Handling**: Graceful error handling with retry functionality

## 🛠️ Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Icons**: Lucide React
- **Data Source**: CoinGecko API
- **Charts**: Recharts
- **Forms**: React Hook Form + Zod validation
- **State Management**: React Hooks

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/cryptocurrency-tracker.git
   cd cryptocurrency-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   COINGECKO_API_KEY=your_coingecko_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Environment Variables

- `COINGECKO_API_KEY`: Your CoinGecko API key (optional for demo usage)

### API Endpoints

The application uses the following CoinGecko API endpoints:
- `/api/coins/markets` - Get market data for cryptocurrencies
- `/api/coins/list` - Get list of all available coins
- `/api/coins/[id]` - Get detailed information for a specific coin

## 🎨 Key Components

### CoinCard
Displays individual cryptocurrency information including:
- Current price and 24h change
- Market cap and rank
- 24h high/low prices
- Price change indicators

### CoinSkeleton
Loading skeleton component for smooth user experience during data fetching.

### PaginationControls
Handles navigation through large lists of cryptocurrencies.

## 📊 Data Types

The application uses TypeScript interfaces for type safety:

```typescript
interface CoinMarket {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  high_24h: number;
  low_24h: number;
  total_volume: number;
}
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push

## 🔍 API Usage

The application fetches data from CoinGecko API with the following features:
- 60-second caching for better performance
- Error handling and retry logic
- Rate limiting compliance
- Data filtering and formatting

## 🎯 Features in Detail

### Home Page
- Displays top cryptocurrencies by market cap
- Real-time price updates
- Search functionality
- Refresh button for latest data
- Responsive grid layout

### Individual Coin Pages
- Detailed coin information
- Price history charts
- Market statistics
- Description and links

### Search & Filter
- Search by coin name or symbol
- Real-time filtering
- Clear search results

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [CoinGecko](https://coingecko.com/) for providing the cryptocurrency data API
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Next.js](https://nextjs.org/) team for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework

---

**Happy Trading! 📈** 