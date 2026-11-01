import { ReactNode } from 'react';

export type Currency = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'RUB';
export type AssetType = 'crypto' | 'stock' | 'commodity' | 'forex';

export interface FinanceItem {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  high24h?: number;
  low24h?: number;
  volume24h?: string | number;
  marketCap?: string | number;
  sparkline?: number[];
  icon?: ReactNode;
  type?: AssetType;
}

export interface FinanceWidgetProps {
  /** Widget title */
  title?: string;
  /** List of financial assets to track */
  items?: FinanceItem[];
  /** Initially or currently selected asset symbol */
  selectedSymbol?: string;
  /** Callback when an asset is selected */
  onSelectAsset?: (symbol: string) => void;
  /** Currency code for price formatting */
  currency?: Currency;
  /** Callback when currency is changed */
  onCurrencyChange?: (currency: Currency) => void;
  /** Show SVG sparkline mini-chart */
  showSparkline?: boolean;
  /** Show 24h metrics (high, low, volume, market cap) */
  showDetails?: boolean;
  /** AI market analysis / generator callback */
  onAiGenerate?: (prompt: string) => Promise<void>;
  /** Loading state */
  loading?: boolean;
  /** Optional additional class name */
  className?: string;
}

