import { ReactNode } from 'react';
import { Currency } from '../FinanceWidget/FinanceWidget.types';

export interface TickerItem {
  symbol: string;
  name?: string;
  price: number;
  change24h: number;
  icon?: ReactNode;
}

export interface TickerProps {
  /** List of ticker items */
  items?: TickerItem[];
  /** Currency code for formatting (USD, EUR, GBP, JPY, RUB) */
  currency?: Currency;
  /** Speed of scrolling animation in seconds (default: 30) */
  speed?: number;
  /** Pause scrolling on hover (default: true) */
  pauseOnHover?: boolean;
  /** Visual variant: 'default' | 'pill' | 'minimal' */
  variant?: 'default' | 'pill' | 'minimal';
  /** Theme: 'dark' | 'light' | 'auto' */
  theme?: 'dark' | 'light' | 'auto';
  /** Show live blinking indicator badge */
  live?: boolean;
  /** Callback when an item in the ticker is clicked */
  onItemClick?: (item: TickerItem) => void;
  /** Optional custom class name */
  className?: string;
}

