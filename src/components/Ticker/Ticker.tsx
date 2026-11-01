import React from 'react';
import { TickerProps, TickerItem } from './Ticker.types';
import { Currency } from '../FinanceWidget/FinanceWidget.types';
import './Ticker.scss';

const DEFAULT_ITEMS: TickerItem[] = [
  { symbol: 'BTC', name: 'Bitcoin', price: 64280.5, change24h: 3.42, icon: '₿' },
  { symbol: 'ETH', name: 'Ethereum', price: 3450.2, change24h: -1.18, icon: 'Ξ' },
  { symbol: 'SOL', name: 'Solana', price: 154.3, change24h: 7.15, icon: '◎' },
  { symbol: 'NVDA', name: 'NVIDIA', price: 138.2, change24h: 4.62, icon: '🟢' },
  { symbol: 'AAPL', name: 'Apple', price: 228.45, change24h: 1.85, icon: '' },
  { symbol: 'TSLA', name: 'Tesla', price: 218.9, change24h: -2.45, icon: '⚡' },
];

const CURRENCY_CONFIG: Record<Currency, { symbol: string; rate: number }> = {
  USD: { symbol: '$', rate: 1 },
  EUR: { symbol: '€', rate: 0.92 },
  GBP: { symbol: '£', rate: 0.78 },
  JPY: { symbol: '¥', rate: 152.3 },
  RUB: { symbol: '₽', rate: 96.5 },
};

function formatPrice(val: number, currency: Currency = 'USD'): string {
  const conf = CURRENCY_CONFIG[currency] || CURRENCY_CONFIG.USD;
  const converted = val * conf.rate;
  const dec = converted >= 1000 ? 2 : 2;
  return `${conf.symbol}${converted.toLocaleString('en-US', {
    minimumFractionDigits: dec,
    maximumFractionDigits: dec,
  })}`;
}

export const Ticker: React.FC<TickerProps> = ({
  items = DEFAULT_ITEMS,
  currency = 'USD',
  speed = 30,
  pauseOnHover = true,
  variant = 'default',
  theme = 'dark',
  live = true,
  onItemClick,
  className = '',
}) => {
  const rootClasses = [
    'ww-ticker',
    theme === 'light' ? 'ww-ticker--light' : '',
    variant === 'pill' ? 'ww-ticker--pill' : '',
    variant === 'minimal' ? 'ww-ticker--minimal' : '',
    pauseOnHover ? 'ww-ticker--pause-hover' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Duplicate items twice to ensure infinite uninterrupted scrolling
  const stream = [...items, ...items, ...items, ...items];

  return (
    <div className={rootClasses} role="region" aria-label="Financial Ticker Bar">
      {live && (
        <div className="ww-ticker__badge">
          <span className="ww-live-badge">
            <span className="ww-live-badge__dot" />
            LIVE
          </span>
        </div>
      )}
      <div className="ww-ticker__viewport">
        <div
          className="ww-ticker__track"
          style={{ animationDuration: `${speed}s` }}
        >
          {stream.map((item, idx) => {
            const isPos = item.change24h >= 0;
            return (
              <div
                key={`${item.symbol}-${idx}`}
                className="ww-ticker__item"
                onClick={() => onItemClick?.(item)}
                title={`${item.name || item.symbol}: ${formatPrice(item.price, currency)}`}
              >
                {item.icon && <span className="ww-ticker__icon">{item.icon}</span>}
                <span className="ww-ticker__symbol">{item.symbol}</span>
                <span className="ww-ticker__price">{formatPrice(item.price, currency)}</span>
                <span
                  className={`ww-ticker__change ${
                    isPos ? 'ww-ticker__change--pos' : 'ww-ticker__change--neg'
                  }`}
                >
                  {isPos ? '▲ +' : '▼ '}
                  {Math.abs(item.change24h).toFixed(2)}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Ticker;

