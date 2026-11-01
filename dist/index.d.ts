import { FC, ReactNode, ButtonHTMLAttributes, InputHTMLAttributes, CSSProperties } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  rounded?: boolean;
  children: ReactNode;
}
export declare const Button: FC<ButtonProps>;

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
  title?: string;
  items?: FinanceItem[];
  selectedSymbol?: string;
  onSelectAsset?: (symbol: string) => void;
  currency?: Currency;
  onCurrencyChange?: (currency: Currency) => void;
  showSparkline?: boolean;
  showDetails?: boolean;
  onAiGenerate?: (prompt: string) => Promise<void>;
  loading?: boolean;
  className?: string;
}
export declare const FinanceWidget: FC<FinanceWidgetProps>;

export type WeatherCondition = 'sunny' | 'cloudy' | 'partly-cloudy' | 'rainy' | 'stormy' | 'snowy' | 'windy' | 'foggy' | 'hail';
export type TemperatureUnit = 'C' | 'F';
export interface WeatherForecastDay {
  day: string;
  high: number;
  low: number;
  condition: WeatherCondition;
}
export interface WeatherWidgetProps {
  location?: string;
  temperature?: number;
  unit?: TemperatureUnit;
  condition?: WeatherCondition;
  feelsLike?: number;
  humidity?: number;
  windSpeed?: number;
  windUnit?: string;
  visibility?: number;
  uvIndex?: number;
  forecast?: WeatherForecastDay[];
  showForecast?: boolean;
  onAiGenerate?: (prompt: string) => Promise<void>;
  loading?: boolean;
  className?: string;
}
export declare const WeatherWidget: FC<WeatherWidgetProps>;

export type ActivityStatus = 'success' | 'danger' | 'warning' | 'info' | 'default';
export interface ActivityItem {
  id: string | number;
  label: string;
  description?: string;
  status?: ActivityStatus;
  timestamp?: string | Date;
  icon?: ReactNode;
}
export interface ActivityWidgetProps {
  items: ActivityItem[];
  title?: string;
  compact?: boolean;
  bordered?: boolean;
  maxVisible?: number;
  onAiGenerate?: (prompt: string) => Promise<void>;
  loading?: boolean;
  className?: string;
}
export declare const ActivityWidget: FC<ActivityWidgetProps>;

export type CodeLanguage = 'typescript' | 'javascript' | 'python' | 'rust' | 'go' | 'bash' | 'json' | 'css' | 'html' | 'sql' | 'plaintext';
export interface CodeWidgetProps {
  code?: string;
  language?: CodeLanguage;
  title?: string;
  showCopy?: boolean;
  showLineNumbers?: boolean;
  maxHeight?: string;
  highlightLines?: number[];
  editable?: boolean;
  onChange?: (code: string) => void;
  onAiGenerate?: (prompt: string) => Promise<void>;
  loading?: boolean;
  className?: string;
}
export declare const CodeWidget: FC<CodeWidgetProps>;

export interface CardProps {
  title?: string;
  subtitle?: string;
  imageSrc?: string;
  imageAlt?: string;
  imageAspectRatio?: string;
  description?: string;
  actions?: ReactNode;
  headerExtra?: ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
  noPadding?: boolean;
  clickable?: boolean;
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
}
export declare const Card: FC<CardProps>;

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: ReactNode;
  footer?: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  disableBackdropClose?: boolean;
  hideCloseButton?: boolean;
  className?: string;
  labelId?: string;
}
export declare const Modal: FC<ModalProps>;

export interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
  icon?: ReactNode;
  description?: string;
}
export interface DropdownProps {
  options: DropdownOption[];
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  placeholder?: string;
  multiple?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
  label?: string;
  disabled?: boolean;
  emptyMessage?: string;
  fullWidth?: boolean;
  className?: string;
}
export declare const Dropdown: FC<DropdownProps>;

export interface ProgressBarProps {
  value: number;
  max?: number;
  status?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  labelPosition?: 'right' | 'top' | 'inside';
  formatLabel?: (value: number, max: number) => string;
  title?: string;
  striped?: boolean;
  animated?: boolean;
  ariaLabel?: string;
  className?: string;
}
export declare const ProgressBar: FC<ProgressBarProps>;

export interface TooltipProps {
  children: ReactNode;
  content: ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  variant?: 'dark' | 'light';
  showDelay?: number;
  hideDelay?: number;
  disabled?: boolean;
  maxWidth?: number;
  className?: string;
}
export declare const Tooltip: FC<TooltipProps>;

export interface BadgeProps {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md' | 'lg';
  pill?: boolean;
  dot?: boolean;
  count?: number;
  max?: number;
  className?: string;
  children?: ReactNode;
}
export declare const Badge: FC<BadgeProps>;

export interface ToastItem {
  id: string;
  message: ReactNode;
  title?: string;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  duration?: number;
  icon?: ReactNode;
}
export interface ToastContextValue {
  toast: (item: Omit<ToastItem, 'id'>) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}
export interface TickerItem {
  symbol: string;
  name?: string;
  price: number;
  change24h: number;
  icon?: ReactNode;
}
export interface TickerProps {
  items?: TickerItem[];
  currency?: Currency;
  speed?: number;
  pauseOnHover?: boolean;
  variant?: 'default' | 'pill' | 'minimal';
  theme?: 'dark' | 'light' | 'auto';
  live?: boolean;
  onItemClick?: (item: TickerItem) => void;
  className?: string;
}
export declare const Ticker: FC<TickerProps>;

export declare const ToastProvider: FC<{ children: ReactNode; position?: string; defaultDuration?: number }>;
export declare function useToast(): ToastContextValue;
