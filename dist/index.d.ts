import * as react from 'react';
import react__default, { ButtonHTMLAttributes, ReactNode, HTMLAttributes, InputHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /** Visual style variant */
    variant?: ButtonVariant;
    /** Button size */
    size?: ButtonSize;
    /** Show loading spinner and disable interaction */
    loading?: boolean;
    /** Icon placed before the label */
    leftIcon?: ReactNode;
    /** Icon placed after the label */
    rightIcon?: ReactNode;
    /** Stretch button to fill its container */
    fullWidth?: boolean;
    /** Render as pill shape */
    rounded?: boolean;
    /** Button label */
    children: ReactNode;
}

/**
 * Button — interactive element with multiple style variants and sizes.
 *
 * @example
 * // Primary button
 * <Button variant="primary" size="md" onClick={handleClick}>Save</Button>
 *
 * @example
 * // Loading state
 * <Button variant="primary" loading>Saving...</Button>
 *
 * @example
 * // With icons
 * <Button variant="outline" leftIcon={<SearchIcon />}>Search</Button>
 */
declare const Button: react.ForwardRefExoticComponent<ButtonProps & react.RefAttributes<HTMLButtonElement>>;

type CardVariant = 'default' | 'elevated' | 'outlined' | 'filled';
interface CardProps extends HTMLAttributes<HTMLDivElement> {
    /** Card title */
    title?: string;
    /** Subtitle below the title */
    subtitle?: string;
    /** Image URL displayed at the top of the card */
    imageSrc?: string;
    /** Alt text for the image */
    imageAlt?: string;
    /** Image aspect ratio */
    imageAspectRatio?: '16/9' | '4/3' | '1/1' | '3/2';
    /** Card body text */
    description?: string;
    /** Action area — typically buttons */
    actions?: ReactNode;
    /** Extra content slot (badges, tags, etc.) rendered in the header */
    headerExtra?: ReactNode;
    /** Card style variant */
    variant?: CardVariant;
    /** Remove padding from the card body */
    noPadding?: boolean;
    /** Make the card look clickable (hover effect) */
    clickable?: boolean;
    /** Custom children override (replaces description) */
    children?: ReactNode;
}

/**
 * Card — flexible content container with image, title, description and actions.
 *
 * @example
 * // Basic card
 * <Card
 *   title="Article Title"
 *   subtitle="Category"
 *   imageSrc="/cover.jpg"
 *   imageAlt="Cover"
 *   description="A brief summary of the article content."
 *   actions={<Button size="sm">Read more</Button>}
 * />
 *
 * @example
 * // Elevated clickable card
 * <Card variant="elevated" clickable onClick={() => navigate('/details')}>
 *   <CustomContent />
 * </Card>
 */
declare const Card: react.ForwardRefExoticComponent<CardProps & react.RefAttributes<HTMLDivElement>>;

type InputSize = 'sm' | 'md' | 'lg';
type InputStatus = 'default' | 'error' | 'success' | 'warning';
interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    /** Input label */
    label?: string;
    /** Hint / helper text shown below the input */
    hint?: string;
    /** Validation / status message */
    message?: string;
    /** Validation status — controls colours */
    status?: InputStatus;
    /** Icon displayed on the left side */
    leftIcon?: ReactNode;
    /** Icon or element on the right side (e.g. clear button, eye toggle) */
    rightElement?: ReactNode;
    /** Input size */
    size?: InputSize;
    /** Stretch input to fill its container */
    fullWidth?: boolean;
    /** Make the field read-only with styled appearance */
    readOnly?: boolean;
    /** Enable the AI ✦ button — called with the current input value as prompt */
    onAiGenerate?: (prompt: string) => Promise<string | void>;
    /** Show loading spinner on the AI button */
    aiLoading?: boolean;
}

/**
 * Input — text field with icon, hint, and validation support.
 *
 * @example
 * // Basic usage
 * <Input label="Email" type="email" placeholder="you@example.com" />
 *
 * @example
 * // With icon and validation
 * <Input
 *   label="Username"
 *   leftIcon={<UserIcon />}
 *   status="error"
 *   message="Username already taken"
 *   value={username}
 *   onChange={e => setUsername(e.target.value)}
 * />
 *
 * @example
 * // With hint
 * <Input label="Password" type="password" hint="At least 8 characters" />
 */
declare const Input: react.ForwardRefExoticComponent<InputProps & react.RefAttributes<HTMLInputElement>>;

type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';
interface ModalProps {
    /** Controls visibility */
    isOpen: boolean;
    /** Called when the modal should close (Escape key, backdrop click, close button) */
    onClose: () => void;
    /** Modal title */
    title?: string;
    /** Optional description shown below the title */
    description?: string;
    /** Modal body content */
    children?: ReactNode;
    /** Footer content — typically action buttons */
    footer?: ReactNode;
    /** Modal width preset */
    size?: ModalSize;
    /** Prevent closing on backdrop click */
    disableBackdropClose?: boolean;
    /** Hide the close (×) button */
    hideCloseButton?: boolean;
    /** Additional class on the modal panel */
    className?: string;
    /** aria-labelledby id — auto-generated if omitted */
    labelId?: string;
}

/**
 * Modal — accessible dialog with title, body, and footer buttons.
 *
 * The modal is rendered via a React Portal so it always escapes stacking contexts.
 * Focus is trapped inside while open and restored to the trigger element on close.
 *
 * @example
 * // Basic usage
 * const [open, setOpen] = useState(false);
 * <Button onClick={() => setOpen(true)}>Open</Button>
 * <Modal
 *   isOpen={open}
 *   onClose={() => setOpen(false)}
 *   title="Confirm deletion"
 *   description="This action cannot be undone."
 *   footer={
 *     <>
 *       <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
 *       <Button variant="danger" onClick={handleDelete}>Delete</Button>
 *     </>
 *   }
 * >
 *   Are you sure you want to delete this item?
 * </Modal>
 */
declare function Modal({ isOpen, onClose, title, description, children, footer, size, disableBackdropClose, hideCloseButton, className, labelId: labelIdProp, }: ModalProps): react.ReactPortal | null;
declare namespace Modal {
    var displayName: string;
}

interface DropdownOption {
    /** Unique value */
    value: string;
    /** Display label */
    label: string;
    /** Descriptive text shown beneath the label */
    description?: string;
    /** Leading icon or thumbnail */
    icon?: ReactNode;
    /** Prevent selection */
    disabled?: boolean;
}
interface DropdownProps {
    /** Available options */
    options: DropdownOption[];
    /** Selected value(s). Pass string[] when multiple=true */
    value?: string | string[];
    /** Called with the new selected value(s) */
    onChange?: (value: string | string[]) => void;
    /** Placeholder shown when nothing is selected */
    placeholder?: string;
    /** Allow selecting more than one option */
    multiple?: boolean;
    /** Show search field inside the dropdown */
    searchable?: boolean;
    /** Placeholder inside the search field */
    searchPlaceholder?: string;
    /** Field label */
    label?: string;
    /** Disable the control */
    disabled?: boolean;
    /** Text shown when the filtered list is empty */
    emptyMessage?: string;
    /** Stretch to fill its container */
    fullWidth?: boolean;
    /** Additional class */
    className?: string;
}

/**
 * Dropdown — select menu with optional search and multi-select.
 *
 * @example
 * // Single select
 * <Dropdown
 *   label="Country"
 *   options={[{ value: 'us', label: 'United States' }, { value: 'uk', label: 'United Kingdom' }]}
 *   value={country}
 *   onChange={v => setCountry(v as string)}
 * />
 *
 * @example
 * // Multi-select with search
 * <Dropdown
 *   label="Skills"
 *   multiple
 *   searchable
 *   options={skillOptions}
 *   value={skills}
 *   onChange={v => setSkills(v as string[])}
 * />
 */
declare function Dropdown({ options, value, onChange, placeholder, multiple, searchable, searchPlaceholder, label, disabled, emptyMessage, fullWidth, className, }: DropdownProps): react.JSX.Element;
declare namespace Dropdown {
    var displayName: string;
}

type ProgressBarStatus = 'default' | 'success' | 'warning' | 'danger' | 'info';
type ProgressBarSize = 'xs' | 'sm' | 'md' | 'lg';
interface ProgressBarProps {
    /** Progress value, 0–100 */
    value: number;
    /** Maximum value (default: 100) */
    max?: number;
    /** Visual colour status */
    status?: ProgressBarStatus;
    /** Bar thickness */
    size?: ProgressBarSize;
    /** Show numeric percentage label */
    showLabel?: boolean;
    /** Label position relative to bar */
    labelPosition?: 'right' | 'top' | 'inside';
    /** Custom label format function */
    formatLabel?: (value: number, max: number) => string;
    /** Text label shown above the bar */
    title?: string;
    /** Animate bar fill on mount */
    animated?: boolean;
    /** Animate with a shimmer effect (for indeterminate / loading state) */
    striped?: boolean;
    /** Accessible label */
    ariaLabel?: string;
    /** Additional class */
    className?: string;
}

/**
 * ProgressBar — status-coloured progress indicator.
 *
 * @example
 * // Basic
 * <ProgressBar value={65} />
 *
 * @example
 * // Danger with label
 * <ProgressBar value={90} status="danger" showLabel title="Disk usage" />
 *
 * @example
 * // Striped loading bar
 * <ProgressBar value={40} status="info" striped showLabel labelPosition="right" />
 *
 * @example
 * // Animated fill on mount
 * <ProgressBar value={70} animated />
 */
declare function ProgressBar({ value, max, status, size, showLabel, labelPosition, formatLabel, title, striped, animated, ariaLabel, className, }: ProgressBarProps): react.JSX.Element;
declare namespace ProgressBar {
    var displayName: string;
}

type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';
type TooltipVariant = 'dark' | 'light' | 'primary';
interface TooltipProps {
    /** The element that triggers the tooltip */
    children: ReactNode;
    /** Tooltip content */
    content: ReactNode;
    /** Preferred placement */
    placement?: TooltipPlacement;
    /** Visual style */
    variant?: TooltipVariant;
    /** Delay before showing (ms) */
    showDelay?: number;
    /** Delay before hiding (ms) */
    hideDelay?: number;
    /** Disable the tooltip */
    disabled?: boolean;
    /** Max width of the tooltip bubble */
    maxWidth?: number | string;
    /** Additional class on the tooltip bubble */
    className?: string;
}

/**
 * Tooltip — lightweight hover hint with placement and variant options.
 *
 * @example
 * // Basic
 * <Tooltip content="Save your work">
 *   <Button>Save</Button>
 * </Tooltip>
 *
 * @example
 * // Bottom placement, light variant
 * <Tooltip content="More info here" placement="bottom" variant="light">
 *   <InfoIcon />
 * </Tooltip>
 *
 * @example
 * // Rich content
 * <Tooltip content={<span><b>Shortcut:</b> ⌘S</span>} placement="right">
 *   <span>Hover me</span>
 * </Tooltip>
 */
declare function Tooltip({ children, content, placement, variant, showDelay, hideDelay, disabled, maxWidth, className, }: TooltipProps): react.JSX.Element;
declare namespace Tooltip {
    var displayName: string;
}

type ActivityStatus = 'success' | 'warning' | 'danger' | 'info' | 'default';
interface ActivityItem {
    /** Unique identifier */
    id: string | number;
    /** Primary label / title of the event */
    label: string;
    /** Supporting detail text */
    description?: string;
    /** Timestamp — string (e.g. "2 min ago") or Date object */
    timestamp?: string | Date;
    /** Optional icon rendered in the dot area */
    icon?: ReactNode;
    /** Colour of the timeline dot */
    status?: ActivityStatus;
}
interface ActivityWidgetProps {
    /** Activity feed items */
    items: ActivityItem[];
    /** Widget heading */
    title?: string;
    /** Compact mode: reduces vertical spacing */
    compact?: boolean;
    /** Show a coloured left border on each item */
    bordered?: boolean;
    /** Max items to display before "show more" */
    maxVisible?: number;
    /** Callback when user asks the AI to generate items */
    onAiGenerate?: (prompt: string) => Promise<void>;
    /** Loading state for AI generation */
    loading?: boolean;
    /** Additional className */
    className?: string;
}

/**
 * ActivityWidget — scrollable activity / event timeline with optional AI-powered generation.
 *
 * @example
 * // Static feed
 * <ActivityWidget
 *   title="Recent Activity"
 *   items={[
 *     { id: 1, label: "PR merged", description: "feat: add dark mode", status: "success", timestamp: "3m ago" },
 *     { id: 2, label: "Build failed", status: "danger", timestamp: new Date() },
 *   ]}
 * />
 *
 * @example
 * // AI-powered: let users describe what they want
 * <ActivityWidget
 *   title="Team Activity"
 *   items={items}
 *   onAiGenerate={async (prompt) => {
 *     const newItems = await fetchFromAI(prompt);
 *     setItems(newItems);
 *   }}
 * />
 */
declare function ActivityWidget({ items, title, compact, bordered, maxVisible, onAiGenerate, loading, className, }: ActivityWidgetProps): react.JSX.Element;
declare namespace ActivityWidget {
    var displayName: string;
}

type WeatherCondition = 'sunny' | 'cloudy' | 'partly-cloudy' | 'rainy' | 'stormy' | 'snowy' | 'windy' | 'foggy' | 'hail';
type TemperatureUnit = 'C' | 'F';
interface WeatherForecastDay {
    /** Day label, e.g. "Mon" or a Date */
    day: string;
    high: number;
    low: number;
    condition: WeatherCondition;
}
interface WeatherWidgetProps {
    /** Location display name */
    location?: string;
    /** Current temperature */
    temperature?: number;
    /** Temperature unit */
    unit?: TemperatureUnit;
    /** Current weather condition */
    condition?: WeatherCondition;
    /** "Feels like" temperature */
    feelsLike?: number;
    /** Humidity percentage 0–100 */
    humidity?: number;
    /** Wind speed in km/h or mph */
    windSpeed?: number;
    /** Wind speed unit label */
    windUnit?: string;
    /** Visibility in km or mi */
    visibility?: number;
    /** UV Index */
    uvIndex?: number;
    /** 7-day forecast data */
    forecast?: WeatherForecastDay[];
    /** Show the 7-day forecast strip */
    showForecast?: boolean;
    /** Callback when the user requests AI-generated weather data */
    onAiGenerate?: (prompt: string) => Promise<void>;
    /** Loading state */
    loading?: boolean;
    /** Additional className */
    className?: string;
}

/**
 * WeatherWidget — current conditions + 7-day forecast card.
 * Accepts static data or an AI-powered prompt to generate mock/real weather.
 *
 * @example
 * // Static data
 * <WeatherWidget
 *   location="San Francisco, CA"
 *   temperature={18}
 *   unit="C"
 *   condition="partly-cloudy"
 *   humidity={72}
 *   windSpeed={14}
 *   forecast={forecastArray}
 *   showForecast
 * />
 *
 * @example
 * // AI-powered
 * <WeatherWidget
 *   location={city}
 *   temperature={temp}
 *   condition={cond}
 *   onAiGenerate={async (prompt) => {
 *     const data = await fetchWeatherFromAI(prompt);
 *     applyData(data);
 *   }}
 * />
 */
declare function WeatherWidget({ location, temperature, unit, condition, feelsLike, humidity, windSpeed, windUnit, visibility, uvIndex, forecast, showForecast, onAiGenerate, loading, className, }: WeatherWidgetProps): react.JSX.Element;
declare namespace WeatherWidget {
    var displayName: string;
}

type CodeLanguage = 'typescript' | 'javascript' | 'python' | 'rust' | 'go' | 'bash' | 'json' | 'css' | 'html' | 'sql' | 'plaintext';
interface CodeWidgetProps {
    /** Source code to display */
    code?: string;
    /** Programming language for syntax hint badge */
    language?: CodeLanguage;
    /** Widget heading */
    title?: string;
    /** Show copy-to-clipboard button */
    showCopy?: boolean;
    /** Show line numbers */
    showLineNumbers?: boolean;
    /** Maximum height before scroll (e.g. "300px") */
    maxHeight?: string;
    /** Highlighted line numbers (1-indexed) */
    highlightLines?: number[];
    /** Allow user to edit the code inline */
    editable?: boolean;
    /** Callback fired when editable code changes */
    onChange?: (code: string) => void;
    /** Callback fired when the user submits an AI generation prompt */
    onAiGenerate?: (prompt: string) => Promise<void>;
    /** Loading state */
    loading?: boolean;
    /** Additional className */
    className?: string;
}

/**
 * CodeWidget — syntax-highlighted code display with optional editing and AI generation.
 *
 * @example
 * // Read-only display
 * <CodeWidget
 *   title="server.ts"
 *   language="typescript"
 *   code={`import express from 'express';\nconst app = express();\napp.listen(3000);`}
 *   showCopy
 *   showLineNumbers
 * />
 *
 * @example
 * // Editable code pad with auto-growing textarea
 * <CodeWidget
 *   language="python"
 *   code={code}
 *   editable
 *   onChange={setCode}
 * />
 *
 * @example
 * // AI-powered snippet generator
 * <CodeWidget
 *   language="typescript"
 *   code={snippet}
 *   onAiGenerate={async (prompt) => {
 *     const result = await fetchSnippet(prompt);
 *     setSnippet(result);
 *   }}
 *   showCopy
 * />
 */
declare function CodeWidget({ code, language, title, showCopy, showLineNumbers, maxHeight, highlightLines, editable, onChange, onAiGenerate, loading, className, }: CodeWidgetProps): react.JSX.Element;
declare namespace CodeWidget {
    var displayName: string;
}

type Currency = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'RUB';
type AssetType = 'crypto' | 'stock' | 'commodity' | 'forex';
interface FinanceItem {
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
interface FinanceWidgetProps {
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
declare function FinanceWidget({ title, items, selectedSymbol, onSelectAsset, currency, onCurrencyChange, showSparkline, showDetails, onAiGenerate, loading, className, }: FinanceWidgetProps): react.JSX.Element;
declare namespace FinanceWidget {
    var displayName: string;
}

interface TickerItem {
    symbol: string;
    name?: string;
    price: number;
    change24h: number;
    icon?: ReactNode;
}
interface TickerProps {
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

declare const Ticker: react__default.FC<TickerProps>;

type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
type BadgeSize = 'sm' | 'md' | 'lg';
interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    /** Visual colour variant */
    variant?: BadgeVariant;
    /** Badge size */
    size?: BadgeSize;
    /** Render as a pill (fully rounded) */
    pill?: boolean;
    /** Small numeric/dot indicator in the top-right corner */
    dot?: boolean;
    /** Number shown in the dot indicator (omit for a plain dot) */
    count?: number;
    /** Cap displayed count at this value (appends "+") */
    max?: number;
    /** Badge label */
    children?: ReactNode;
}

/**
 * Badge — compact label for status, category, or count indicators.
 *
 * @example
 * // Status badge
 * <Badge variant="success">Active</Badge>
 *
 * @example
 * // Notification dot on an icon
 * <Badge dot count={5} max={99}>
 *   <BellIcon />
 * </Badge>
 *
 * @example
 * // Pill shape
 * <Badge variant="primary" pill>New</Badge>
 */
declare function Badge({ variant, size, pill, dot, count, max, className, children, ...rest }: BadgeProps): react.JSX.Element;
declare namespace Badge {
    var displayName: string;
}

type ToastVariant = 'default' | 'success' | 'warning' | 'danger' | 'info';
type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
interface ToastItem {
    /** Unique identifier */
    id: string;
    /** Toast message */
    message: ReactNode;
    /** Visual colour variant */
    variant?: ToastVariant;
    /** Optional title displayed above the message */
    title?: string;
    /** Duration in ms before auto-dismiss. Pass 0 to disable auto-dismiss. */
    duration?: number;
    /** Icon override */
    icon?: ReactNode;
}
interface ToastProviderProps {
    children: ReactNode;
    /** Where toasts appear on screen */
    position?: ToastPosition;
    /** Default auto-dismiss duration in ms (default: 4000) */
    defaultDuration?: number;
}
interface ToastContextValue {
    /** Show a new toast. Returns the toast id. */
    toast: (item: Omit<ToastItem, 'id'>) => string;
    /** Dismiss a toast by id */
    dismiss: (id: string) => void;
    /** Dismiss all toasts */
    dismissAll: () => void;
}

/**
 * ToastProvider — wrap your app (or a subtree) to enable toasts.
 *
 * @example
 * // In your root:
 * <ToastProvider position="top-right">
 *   <App />
 * </ToastProvider>
 *
 * // In any child component:
 * const { toast } = useToast();
 * toast({ message: 'Saved!', variant: 'success' });
 */
declare function ToastProvider({ children, position, defaultDuration, }: ToastProviderProps): react.JSX.Element;
declare namespace ToastProvider {
    var displayName: string;
}
/**
 * useToast — access toast controls from any component inside ToastProvider.
 *
 * @example
 * const { toast, dismiss } = useToast();
 * toast({ message: 'Changes saved', variant: 'success', duration: 3000 });
 */
declare function useToast(): ToastContextValue;

export { ActivityWidget, Badge, Button, Card, CodeWidget, Dropdown, FinanceWidget, Input, Modal, ProgressBar, Ticker, ToastProvider, Tooltip, WeatherWidget, useToast };
export type { ActivityItem, ActivityStatus, ActivityWidgetProps, AssetType, BadgeProps, BadgeSize, BadgeVariant, ButtonProps, ButtonSize, ButtonVariant, CardProps, CardVariant, CodeLanguage, CodeWidgetProps, Currency, DropdownOption, DropdownProps, FinanceItem, FinanceWidgetProps, InputProps, InputSize, InputStatus, ModalProps, ModalSize, ProgressBarProps, ProgressBarSize, ProgressBarStatus, TemperatureUnit, TickerItem, TickerProps, ToastContextValue, ToastItem, ToastPosition, ToastProviderProps, ToastVariant, TooltipPlacement, TooltipProps, TooltipVariant, WeatherCondition, WeatherForecastDay, WeatherWidgetProps };
