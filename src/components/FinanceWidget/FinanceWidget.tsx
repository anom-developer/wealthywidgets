import { useState, useId } from 'react';
import { FinanceWidgetProps, FinanceItem, Currency } from './FinanceWidget.types';
import './FinanceWidget.scss';

const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  RUB: '₽',
};

const DEFAULT_ITEMS: FinanceItem[] = [
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    price: 64280.5,
    change24h: 3.42,
    high24h: 65100.0,
    low24h: 62800.0,
    volume24h: '$28.4B',
    marketCap: '$1.26T',
    sparkline: [62800, 63100, 62900, 63500, 63800, 64100, 64280],
    icon: '₿',
    type: 'crypto',
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    price: 3450.2,
    change24h: -1.18,
    high24h: 3520.0,
    low24h: 3410.0,
    volume24h: '$14.2B',
    marketCap: '$415B',
    sparkline: [3510, 3500, 3480, 3430, 3420, 3440, 3450],
    icon: 'Ξ',
    type: 'crypto',
  },
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 228.45,
    change24h: 1.85,
    high24h: 229.8,
    low24h: 226.1,
    volume24h: '$6.8B',
    marketCap: '$3.49T',
    sparkline: [226.1, 226.8, 227.4, 227.0, 228.1, 228.45],
    icon: '',
    type: 'stock',
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corp.',
    price: 138.2,
    change24h: 4.62,
    high24h: 139.5,
    low24h: 133.0,
    volume24h: '$18.9B',
    marketCap: '$3.38T',
    sparkline: [133.0, 134.2, 135.5, 136.0, 137.8, 138.2],
    icon: '🟢',
    type: 'stock',
  },
];

function formatPrice(val: number, currency: Currency): string {
  const sym = CURRENCY_SYMBOLS[currency] || '$';
  const decimals = val >= 1000 ? 2 : val >= 1 ? 2 : 4;
  return `${sym}${val.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}`;
}

function buildSparklinePath(points: number[], width: number, height: number): { path: string; fillPath: string } {
  if (!points || points.length < 2) return { path: '', fillPath: '' };
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;

  const coords = points.map((p, i) => {
    const x = (i / (points.length - 1)) * width;
    const y = height - ((p - min) / range) * (height - 8) - 4;
    return [x, y];
  });

  const path = coords.reduce((acc, [x, y], i) => (i === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`), '');
  const fillPath = `${path} L ${width} ${height} L 0 ${height} Z`;

  return { path, fillPath };
}

/**
 * FinanceWidget — real-time portfolio & market tracker with sparkline charts and AI insights.
 *
 * @example
 * <FinanceWidget
 *   title="Market Watch"
 *   currency="USD"
 *   showSparkline
 *   showDetails
 *   onAiGenerate={async (prompt) => {
 *     const analysis = await fetchAnalysis(prompt);
 *     setInsight(analysis);
 *   }}
 * />
 */
export function FinanceWidget({
  title = 'Market Watch',
  items = DEFAULT_ITEMS,
  selectedSymbol,
  onSelectAsset,
  currency = 'USD',
  onCurrencyChange,
  showSparkline = true,
  showDetails = true,
  onAiGenerate,
  loading = false,
  className = '',
}: FinanceWidgetProps) {
  const [activeSymbol, setActiveSymbol] = useState(selectedSymbol || items[0]?.symbol || 'BTC');
  const [curr, setCurr] = useState<Currency>(currency);
  const [prompt, setPrompt] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const widgetId = useId();

  const currentItem = items.find((i) => i.symbol === activeSymbol) || items[0];

  const handleSelect = (sym: string) => {
    setActiveSymbol(sym);
    onSelectAsset?.(sym);
  };

  const handleCurrencyChange = (c: Currency) => {
    setCurr(c);
    onCurrencyChange?.(c);
  };

  const handleAiSubmit = async () => {
    if (!prompt.trim() || !onAiGenerate) return;
    setAiLoading(true);
    try {
      await onAiGenerate(prompt.trim());
      setPrompt('');
    } finally {
      setAiLoading(false);
    }
  };

  const isPositive = (currentItem?.change24h ?? 0) >= 0;
  const strokeColor = isPositive ? '#10b981' : '#ef4444';
  const fillColor = isPositive ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)';

  const sparklinePaths = currentItem?.sparkline
    ? buildSparklinePath(currentItem.sparkline, 360, 48)
    : { path: '', fillPath: '' };

  const rootClasses = ['ww-finance', className].filter(Boolean).join(' ');

  return (
    <div className={rootClasses} role="region" aria-label={title}>
      {/* Header */}
      <div className="ww-finance__header">
        <h3 className="ww-finance__title">{title}</h3>
        <select
          className="ww-finance__currency-select"
          value={curr}
          onChange={(e) => handleCurrencyChange(e.target.value as Currency)}
          aria-label="Select currency"
        >
          <option value="USD">USD ($)</option>
          <option value="EUR">EUR (€)</option>
          <option value="GBP">GBP (£)</option>
          <option value="JPY">JPY (¥)</option>
          <option value="RUB">RUB (₽)</option>
        </select>
      </div>

      {/* Asset Switcher Tabs */}
      {items.length > 1 && (
        <div className="ww-finance__tabs" role="tablist" aria-label="Financial Assets">
          {items.map((item) => {
            const active = item.symbol === activeSymbol;
            return (
              <button
                key={item.symbol}
                type="button"
                role="tab"
                aria-selected={active}
                className={`ww-finance__tab ${active ? 'ww-finance__tab--active' : ''}`}
                onClick={() => handleSelect(item.symbol)}
              >
                {item.icon && <span>{item.icon}</span>}
                <span>{item.symbol}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Main Asset Card */}
      {currentItem ? (
        <div className="ww-finance__card">
          <div className="ww-finance__asset-info">
            <div className="ww-finance__name-group">
              {currentItem.icon && <span className="ww-finance__icon">{currentItem.icon}</span>}
              <div>
                <div className="ww-finance__asset-name">{currentItem.name}</div>
                <div className="ww-finance__asset-symbol">{currentItem.symbol}</div>
              </div>
            </div>
            <span
              className={`ww-finance__change-badge ww-finance__change-badge--${isPositive ? 'positive' : 'negative'}`}
            >
              {isPositive ? '▲ +' : '▼ '}
              {currentItem.change24h.toFixed(2)}%
            </span>
          </div>

          <div className="ww-finance__price-row">
            <span className="ww-finance__price">{formatPrice(currentItem.price, curr)}</span>
          </div>

          {/* Sparkline chart */}
          {showSparkline && sparklinePaths.path && (
            <div className="ww-finance__sparkline-container" aria-hidden="true">
              <svg className="ww-finance__sparkline" viewBox="0 0 360 48" preserveAspectRatio="none">
                <defs>
                  <linearGradient id={`spark-grad-${widgetId}`} x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor={strokeColor} stopOpacity="0.4" />
                    <stop offset="100%" stopColor={strokeColor} stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path d={sparklinePaths.fillPath} fill={`url(#spark-grad-${widgetId})`} />
                <path d={sparklinePaths.path} fill="none" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
          )}

          {/* Details 24h */}
          {showDetails && (
            <div className="ww-finance__details">
              {currentItem.high24h !== undefined && (
                <div className="ww-finance__detail-item">
                  <span className="ww-finance__detail-label">24h High</span>
                  <span className="ww-finance__detail-value">{formatPrice(currentItem.high24h, curr)}</span>
                </div>
              )}
              {currentItem.low24h !== undefined && (
                <div className="ww-finance__detail-item">
                  <span className="ww-finance__detail-label">24h Low</span>
                  <span className="ww-finance__detail-value">{formatPrice(currentItem.low24h, curr)}</span>
                </div>
              )}
              {currentItem.volume24h && (
                <div className="ww-finance__detail-item">
                  <span className="ww-finance__detail-label">24h Volume</span>
                  <span className="ww-finance__detail-value">{currentItem.volume24h}</span>
                </div>
              )}
              {currentItem.marketCap && (
                <div className="ww-finance__detail-item">
                  <span className="ww-finance__detail-label">Market Cap</span>
                  <span className="ww-finance__detail-value">{currentItem.marketCap}</span>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="ww-finance__empty">No financial data available.</div>
      )}

      {/* AI Market Analysis Bar */}
      {onAiGenerate && (
        <div className="ww-finance__ai-bar">
          <span className="ww-finance__ai-prefix">✦</span>
          <input
            className="ww-finance__ai-input"
            type="text"
            placeholder="Ask AI… e.g. 'Analyze 24h trend for Bitcoin'"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') void handleAiSubmit();
            }}
            disabled={aiLoading || loading}
            aria-label="AI financial prompt"
          />
          <button
            type="button"
            className="ww-finance__ai-btn"
            onClick={() => {
              void handleAiSubmit();
            }}
            disabled={!prompt.trim() || aiLoading || loading}
            aria-label="Analyze with AI"
          >
            {aiLoading ? <span className="ww-finance__spinner" /> : 'Analyze'}
          </button>
        </div>
      )}
    </div>
  );
}

FinanceWidget.displayName = 'FinanceWidget';

