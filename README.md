<div align="center">

# 🧩 wealthywidgets

**A production-ready React component library with AI-powered generation built in.**

[![CI](https://github.com/anom-developer/wealthywidgets/actions/workflows/ci.yml/badge.svg)](https://github.com/anom-developer/wealthywidgets/actions/workflows/ci.yml)
[![Storybook](https://img.shields.io/badge/Storybook-live-ff4785?logo=storybook&logoColor=white)](https://anom-developer.github.io/wealthywidgets/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.x-blue.svg)](https://www.typescriptlang.org/)

</div>

---

## ✨ What's inside

| Component        | Description                                                          | AI-powered |
| ---------------- | -------------------------------------------------------------------- | :--------: |
| `Button`         | Interactive element with variants, sizes, icons, and loading state   |            |
| `Card`           | Flexible content container with image, header, body, and actions     |            |
| `Input`          | Text field with icon, validation, hint, and **inline AI generation** |     ✦      |
| `Modal`          | Accessible dialog with backdrop, keyboard handling, and size presets |            |
| `Dropdown`       | Single / multi-select with search and option descriptions            |            |
| `ProgressBar`    | Status-coloured progress indicator with label and striped mode       |            |
| `Tooltip`        | Lightweight hover hint with placement and variant options            |            |
| `ActivityWidget` | Scrollable event timeline with live AI feed generation               |     ✦      |
| `WeatherWidget`  | Current conditions + 7-day forecast card with AI data generation     |     ✦      |
| `CodeWidget`     | Syntax-highlighted code block with editing and AI snippet generation |     ✦      |
| `FinanceWidget`  | Real-time portfolio & market tracker with sparkline chart & AI insights|     ✦      |
| `Ticker`         | Continuous marquee ticker bar with live crypto/stock quotes & hover-pause |  ✦ (Live) |
| `Badge`          | Compact status/category label with dot indicator for notifications   |            |
| `Toast`          | `ToastProvider` + `useToast` hook for app-wide toast notifications   |            |

> 📖 **[Live Interactive Showcase →](https://anom-developer.github.io/wealthywidgets/)** — deploy `docs/` via GitHub Pages: Settings → Pages → Source: Deploy from branch → `/docs`

Every widget is:

- ✅ **Independent** — import only what you need, zero forced bundle
- ✅ **Live Data Ready** — Connected to Binance 24hr API (crypto) & Open-Meteo (weather) with offline fallback
- ✅ **PWA Ready** — Installable as a native app on iOS, Android, and Desktop with offline Service Worker
- ✅ **Accessible** — ARIA roles, keyboard nav, focus traps where needed
- ✅ **Multi-Currency** — Native support for `USD ($)`, `EUR (€)`, `GBP (£)`, `JPY (¥)`, `RUB (₽)`
- ✅ **Fully typed** — complete TypeScript definitions for props and slots
- ✅ **Tested** — Jest + React Testing Library
- ✅ **Customisable** — props + SCSS variables

---

## 🚀 How to Use These Widgets

You can use WealthyWidgets in **two ways**:
1. **Zero-Build Web Components / HTML Embed** (any website, WordPress, Webflow, static HTML)
2. **React & TypeScript Component Library** (Next.js, Vite, Create React App)

---

### Option 1: Pure HTML & Web Components (Zero Setup)

Embed interactive widgets directly on any website with just a `<script>` tag:

```html
<!-- 1. Include stylesheet & bundle -->
<link rel="stylesheet" href="https://anom-developer.github.io/wealthywidgets/dist/styles.css" />
<script src="https://anom-developer.github.io/wealthywidgets/dist/wealthywidgets.js"></script>

<!-- 2. Drop widgets anywhere in your body -->
<wealthy-ticker symbols="BTC,ETH,SOL,BNB,DOGE,AAPL,NVDA" currency="USD" speed="25"></wealthy-ticker>
<wealthy-finance asset="BTC" currency="USD" live="true"></wealthy-finance>
<wealthy-weather city="Tokyo" temp="22" unit="C" live="true"></wealthy-weather>
<wealthy-activity title="Recent Activity"></wealthy-activity>
<wealthy-code title="app.ts">console.log("Hello world!");</wealthy-code>
```

> 💡 **Visual Configurator**: Open `docs/index.html` → **Embed Studio 🚀** to visually configure any widget, preview it in real time, and copy ready-to-paste embed code or download standalone HTML files!

---

### 📌 Notion Embed (/embed)

Embed interactive live widgets directly into your **Notion** workspaces and dashboards:

1. In Notion, type `/embed` on any page and press Enter.
2. Paste the link for your desired widget:
   - **Live Crypto Tracker**: `https://anom-developer.github.io/wealthywidgets/embed.html?widget=finance&asset=BTC&curr=USD&notion=true`
   - **Market Ticker Bar**: `https://anom-developer.github.io/wealthywidgets/embed.html?widget=ticker&symbols=BTC,ETH,SOL,BNB,DOGE&curr=USD&notion=true`
   - **Live Weather Forecast**: `https://anom-developer.github.io/wealthywidgets/embed.html?widget=weather&city=Tokyo&unit=C&notion=true`
   - **Project Activity Feed**: `https://anom-developer.github.io/wealthywidgets/embed.html?widget=activity&title=Project%20Updates&notion=true`
3. Click **Embed link** and freely resize the block!
   - Seamlessly blends into Notion's dark and light backgrounds.
   - Automatically adapts when you resize columns or view on Notion Mobile app.

---

### Option 2: React & TypeScript

Install in your project:

```bash
pnpm add wealthywidgets
# or
yarn add wealthywidgets
```

Import styles and use components anywhere in your React tree:

```tsx
import { Ticker, FinanceWidget, WeatherWidget, Button, Card } from 'wealthywidgets';
import 'wealthywidgets/dist/styles.css';

export default function App() {
  return (
    <div>
      {/* Real-time Ticker Bar across the header */}
      <Ticker speed={25} currency="USD" live={true} />

      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', padding: '24px' }}>
        <FinanceWidget title="Crypto Portfolio" currency="USD" />
        <WeatherWidget location="San Francisco, CA" temperature={23} />
      </div>
    </div>
  );
}
```

---

## ⚡ Live Real-World APIs & Offline Fallback

WealthyWidgets connects to official, public, zero-key REST APIs for real-time live data:
- **Cryptocurrency Live Quotes**: Binance Public 24hr ticker (`https://api.binance.com/api/v3/ticker/24hr?symbol=...`). Streams real-time prices, 24h highs/lows, and percentage changes.
- **Global Weather Forecasts**: Open-Meteo Geocoding & High-Resolution Forecast (`https://geocoding-api.open-meteo.com` & `https://api.open-meteo.com`). Fetches actual temperatures, WMO weather codes, wind speeds, and relative humidity for any city worldwide.
- **Graceful Offline Fallback**: If network is unavailable or rate-limited, all widgets instantly render built-in realistic mock data with zero disruption.

---

## 📱 Progressive Web App (PWA)

WealthyWidgets documentation and showcase is a certified Progressive Web App:
- Open `docs/index.html` in Chrome, Safari, or Edge.
- Click **"Install PWA App"** (or Safari Share → *Add to Home Screen*).
- Launches in standalone full-screen window with custom violet theme and app icon.
- Full offline support powered by `docs/sw.js` (Service Worker cache).

---

## 📖 Components

### Button

```tsx
import { Button } from 'wealthywidgets';

// Variants: primary | secondary | outline | ghost | danger | success
// Sizes:    xs | sm | md | lg | xl

<Button variant="primary" size="md" onClick={handleSave}>Save</Button>
<Button variant="outline" loading>Saving…</Button>
<Button variant="danger" rounded leftIcon={<TrashIcon />}>Delete</Button>
```

| Prop        | Type            | Default     | Description                       |
| ----------- | --------------- | ----------- | --------------------------------- |
| `variant`   | `ButtonVariant` | `'primary'` | Visual style                      |
| `size`      | `ButtonSize`    | `'md'`      | Size preset                       |
| `loading`   | `boolean`       | `false`     | Show spinner, disable interaction |
| `leftIcon`  | `ReactNode`     | —           | Icon before the label             |
| `rightIcon` | `ReactNode`     | —           | Icon after the label              |
| `fullWidth` | `boolean`       | `false`     | Stretch to container              |
| `rounded`   | `boolean`       | `false`     | Pill shape                        |

---

### Card

```tsx
import { Card } from 'wealthywidgets';

<Card
  title="Article Title"
  subtitle="Technology"
  imageSrc="/cover.jpg"
  imageAlt="Cover photo"
  description="A brief summary of the article."
  variant="elevated"
  clickable
  onClick={() => navigate('/article')}
  actions={<Button size="sm">Read more</Button>}
/>;
```

| Prop               | Type                                    | Default     | Description                |
| ------------------ | --------------------------------------- | ----------- | -------------------------- |
| `title`            | `string`                                | —           | Card heading               |
| `subtitle`         | `string`                                | —           | Sub-heading                |
| `imageSrc`         | `string`                                | —           | Header image URL           |
| `imageAspectRatio` | `string`                                | `'16/9'`    | CSS aspect ratio           |
| `description`      | `string`                                | —           | Body text                  |
| `actions`          | `ReactNode`                             | —           | Footer slot (buttons etc.) |
| `headerExtra`      | `ReactNode`                             | —           | Top-right header slot      |
| `variant`          | `'default' \| 'elevated' \| 'outlined'` | `'default'` | Visual variant             |
| `noPadding`        | `boolean`                               | `false`     | Remove body padding        |
| `clickable`        | `boolean`                               | `false`     | Add hover/pointer styles   |

---

### Input ✦

The Input widget supports **AI-powered content generation** via `onAiGenerate`. When provided, a ✦ button appears inside the field. Clicking it calls your handler with the current value as a prompt.

```tsx
import { Input } from 'wealthywidgets';

// Basic
<Input label="Email" type="email" placeholder="you@example.com" />

// Validation
<Input
  label="Username"
  status="error"
  message="Username already taken"
  value={username}
  onChange={e => setUsername(e.target.value)}
/>

// ✦ AI-powered autocomplete
<Input
  label="Product description"
  placeholder="Start typing or click ✦ to generate…"
  value={desc}
  onChange={e => setDesc(e.target.value)}
  onAiGenerate={async (prompt) => {
    const result = await myAI.complete(prompt);
    return result; // returned string replaces the field value
  }}
  aiLoading={loading}
/>
```

| Prop           | Type                                          | Default     | Description                         |
| -------------- | --------------------------------------------- | ----------- | ----------------------------------- |
| `label`        | `string`                                      | —           | Field label                         |
| `hint`         | `string`                                      | —           | Helper text below field             |
| `message`      | `string`                                      | —           | Validation message                  |
| `status`       | `InputStatus`                                 | `'default'` | `'error' \| 'success' \| 'warning'` |
| `leftIcon`     | `ReactNode`                                   | —           | Leading icon                        |
| `rightElement` | `ReactNode`                                   | —           | Trailing element                    |
| `size`         | `'sm' \| 'md' \| 'lg'`                        | `'md'`      | Size preset                         |
| `fullWidth`    | `boolean`                                     | `false`     | Stretch to container                |
| `onAiGenerate` | `(prompt: string) => Promise<string \| void>` | —           | AI generate handler                 |
| `aiLoading`    | `boolean`                                     | `false`     | Loading state on AI button          |

---

### Modal

```tsx
import { Modal, Button } from 'wealthywidgets';

<Modal
  isOpen={open}
  onClose={() => setOpen(false)}
  title="Confirm deletion"
  description="This action cannot be undone."
  size="sm"
  footer={
    <>
      <Button variant="ghost" onClick={() => setOpen(false)}>
        Cancel
      </Button>
      <Button variant="danger" onClick={handleDelete}>
        Delete
      </Button>
    </>
  }
>
  <p>Are you sure you want to delete this item?</p>
</Modal>;
```

| Prop                   | Type                                     | Default | Description                  |
| ---------------------- | ---------------------------------------- | ------- | ---------------------------- |
| `isOpen`               | `boolean`                                | —       | Visibility toggle            |
| `onClose`              | `() => void`                             | —       | Close handler                |
| `title`                | `string`                                 | —       | Dialog heading               |
| `description`          | `string`                                 | —       | Sub-heading                  |
| `footer`               | `ReactNode`                              | —       | Action buttons               |
| `size`                 | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'`  | Width preset                 |
| `disableBackdropClose` | `boolean`                                | `false` | Prevent backdrop-click close |
| `hideCloseButton`      | `boolean`                                | `false` | Hide × button                |

---

### Dropdown

```tsx
import { Dropdown } from 'wealthywidgets';

const options = [
  { value: 'react', label: 'React', description: 'UI library' },
  { value: 'vue', label: 'Vue', description: 'Progressive framework' },
  { value: 'svelte', label: 'Svelte', icon: <SvelteIcon /> },
];

// Single select
<Dropdown
  label="Framework"
  options={options}
  value={selected}
  onChange={val => setSelected(val as string)}
  searchable
  placeholder="Choose framework…"
/>

// Multi-select
<Dropdown
  options={options}
  multiple
  value={selections}
  onChange={vals => setSelections(vals as string[])}
/>
```

| Prop          | Type                 | Default | Description              |
| ------------- | -------------------- | ------- | ------------------------ |
| `options`     | `DropdownOption[]`   | —       | Available options        |
| `value`       | `string \| string[]` | —       | Selected value(s)        |
| `onChange`    | `(value) => void`    | —       | Selection change handler |
| `multiple`    | `boolean`            | `false` | Enable multi-select      |
| `searchable`  | `boolean`            | `false` | Show search field        |
| `placeholder` | `string`             | —       | Empty-state text         |
| `label`       | `string`             | —       | Field label              |
| `disabled`    | `boolean`            | `false` | Disable control          |
| `fullWidth`   | `boolean`            | `false` | Stretch to container     |

---

### ProgressBar

```tsx
import { ProgressBar } from 'wealthywidgets';

<ProgressBar value={65} />
<ProgressBar value={90} status="danger" showLabel title="Disk usage" />
<ProgressBar value={40} status="info" striped showLabel labelPosition="right" />
```

| Prop            | Type                           | Default     | Description                                    |
| --------------- | ------------------------------ | ----------- | ---------------------------------------------- |
| `value`         | `number`                       | —           | Progress 0–100                                 |
| `max`           | `number`                       | `100`       | Maximum value                                  |
| `status`        | `ProgressBarStatus`            | `'default'` | `'success' \| 'warning' \| 'danger' \| 'info'` |
| `size`          | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'`      | Bar thickness                                  |
| `showLabel`     | `boolean`                      | `false`     | Display percentage                             |
| `labelPosition` | `'right' \| 'top' \| 'inside'` | `'right'`   | Label placement                                |
| `title`         | `string`                       | —           | Text above bar                                 |
| `striped`       | `boolean`                      | `false`     | Animated shimmer                               |
| `formatLabel`   | `(value, max) => string`       | —           | Custom label format                            |

---

### Tooltip

```tsx
import { Tooltip, Button } from 'wealthywidgets';

<Tooltip content="Save your work" placement="top">
  <Button>Save</Button>
</Tooltip>

<Tooltip content={<span><b>Shortcut:</b> ⌘S</span>} placement="right" variant="light">
  <InfoIcon />
</Tooltip>
```

| Prop        | Type                                     | Default  | Description             |
| ----------- | ---------------------------------------- | -------- | ----------------------- |
| `content`   | `ReactNode`                              | —        | Tooltip text or element |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'`  | Preferred placement     |
| `variant`   | `'dark' \| 'light'`                      | `'dark'` | Colour scheme           |
| `showDelay` | `number`                                 | `300`    | ms before show          |
| `hideDelay` | `number`                                 | `100`    | ms before hide          |
| `disabled`  | `boolean`                                | `false`  | Disable tooltip         |
| `maxWidth`  | `number \| string`                       | `240`    | Max bubble width        |

---

### ActivityWidget ✦

A scrollable timeline of activity events. Pass `onAiGenerate` to let users describe the feed they want and have it generated on the fly.

```tsx
import { ActivityWidget } from 'wealthywidgets';

const [items, setItems] = useState([
  { id: 1, label: 'PR merged', description: 'feat: dark mode', status: 'success', timestamp: '3m ago' },
  { id: 2, label: 'Build failed', status: 'danger', timestamp: new Date() },
  { id: 3, label: 'Deploy started', status: 'info', timestamp: '12m ago' },
]);

// Static
<ActivityWidget title="Recent Activity" items={items} maxVisible={3} />

// ✦ AI-powered
<ActivityWidget
  title="Team Activity"
  items={items}
  onAiGenerate={async (prompt) => {
    const generated = await myAI.generateActivity(prompt);
    setItems(generated);
  }}
  bordered
/>
```

| Prop           | Type                                | Default      | Description              |
| -------------- | ----------------------------------- | ------------ | ------------------------ |
| `items`        | `ActivityItem[]`                    | —            | Timeline entries         |
| `title`        | `string`                            | `'Activity'` | Widget heading           |
| `compact`      | `boolean`                           | `false`      | Reduced vertical spacing |
| `bordered`     | `boolean`                           | `false`      | Left-border item style   |
| `maxVisible`   | `number`                            | `5`          | Items before "show more" |
| `onAiGenerate` | `(prompt: string) => Promise<void>` | —            | AI generate handler      |
| `loading`      | `boolean`                           | `false`      | Loading state            |

**`ActivityItem` shape:**

```ts
interface ActivityItem {
  id: string | number;
  label: string;
  description?: string;
  timestamp?: string | Date; // Date auto-formatted as relative time
  icon?: ReactNode;
  status?: 'success' | 'warning' | 'danger' | 'info' | 'default';
}
```

---

### WeatherWidget ✦

Current conditions card with a 7-day forecast strip. The condition drives a beautiful gradient background. Pass `onAiGenerate` to let users request weather for any city or scenario.

```tsx
import { WeatherWidget } from 'wealthywidgets';

// Static
<WeatherWidget
  location="San Francisco, CA"
  temperature={18}
  unit="C"
  condition="partly-cloudy"
  feelsLike={15}
  humidity={72}
  windSpeed={14}
  showForecast
  forecast={[
    { day: 'Mon', high: 19, low: 12, condition: 'sunny' },
    { day: 'Tue', high: 16, low: 10, condition: 'rainy' },
    { day: 'Wed', high: 21, low: 14, condition: 'partly-cloudy' },
  ]}
/>

// ✦ AI-powered
<WeatherWidget
  location={city}
  temperature={temp}
  condition={cond}
  onAiGenerate={async (prompt) => {
    const data = await myAI.getWeather(prompt);
    applyWeather(data);
  }}
/>
```

| Prop           | Type                                | Default         | Description           |
| -------------- | ----------------------------------- | --------------- | --------------------- |
| `location`     | `string`                            | `'My Location'` | City / place name     |
| `temperature`  | `number`                            | —               | Current temp          |
| `unit`         | `'C' \| 'F'`                        | `'C'`           | Temperature unit      |
| `condition`    | `WeatherCondition`                  | `'sunny'`       | Current condition     |
| `feelsLike`    | `number`                            | —               | Perceived temperature |
| `humidity`     | `number`                            | —               | Humidity %            |
| `windSpeed`    | `number`                            | —               | Wind speed            |
| `windUnit`     | `string`                            | `'km/h'`        | Wind speed unit label |
| `visibility`   | `number`                            | —               | Visibility km         |
| `uvIndex`      | `number`                            | —               | UV index              |
| `forecast`     | `WeatherForecastDay[]`              | `[]`            | 7-day forecast data   |
| `showForecast` | `boolean`                           | `false`         | Show forecast strip   |
| `onAiGenerate` | `(prompt: string) => Promise<void>` | —               | AI generate handler   |
| `loading`      | `boolean`                           | `false`         | Loading state         |

**Available conditions:** `sunny` · `cloudy` · `partly-cloudy` · `rainy` · `stormy` · `snowy` · `windy` · `foggy` · `hail`

---

### CodeWidget ✦

A dark-themed code viewer with macOS-style toolbar, line numbers, copy button, and optional inline editing. The AI bar lets users describe snippets they want generated.

```tsx
import { CodeWidget } from 'wealthywidgets';

const snippet = `import { useState } from 'react';

export function useCounter(initial = 0) {
  const [count, setCount] = useState(initial);
  return { count, inc: () => setCount(c => c + 1) };
}`;

// Read-only with copy
<CodeWidget
  title="useCounter.ts"
  language="typescript"
  code={snippet}
  showCopy
  showLineNumbers
  highlightLines={[4]}
/>

// Editable pad
<CodeWidget
  language="python"
  code={code}
  editable
  onChange={setCode}
  maxHeight="500px"
/>

// ✦ AI-powered snippet generator
<CodeWidget
  title="Generated snippet"
  language="typescript"
  code={snippet}
  showCopy
  onAiGenerate={async (prompt) => {
    const result = await myAI.generateCode(prompt);
    setSnippet(result);
  }}
/>
```

| Prop              | Type                                | Default       | Description                    |
| ----------------- | ----------------------------------- | ------------- | ------------------------------ |
| `code`            | `string`                            | `''`          | Source code                    |
| `language`        | `CodeLanguage`                      | `'plaintext'` | Language badge                 |
| `title`           | `string`                            | —             | File name in toolbar           |
| `showCopy`        | `boolean`                           | `true`        | Show copy button               |
| `showLineNumbers` | `boolean`                           | `false`       | Line number gutter             |
| `maxHeight`       | `string`                            | `'400px'`     | Scroll container height        |
| `highlightLines`  | `number[]`                          | `[]`          | Lines to highlight (1-indexed) |
| `editable`        | `boolean`                           | `false`       | Inline editable textarea       |
| `onChange`        | `(code: string) => void`            | —             | Edit change handler            |
| `onAiGenerate`    | `(prompt: string) => Promise<void>` | —             | AI generate handler            |
| `loading`         | `boolean`                           | `false`       | Loading state                  |

**Supported languages:** `typescript` · `javascript` · `python` · `rust` · `go` · `bash` · `json` · `css` · `html` · `sql` · `plaintext`

---

### FinanceWidget ✦

A real-time financial market & portfolio tracker with sparkline charts, currency switcher, 24h gain/loss indicator, and AI-powered market insight generation.

```tsx
import { FinanceWidget } from 'wealthywidgets';

// Basic usage with default assets (BTC, ETH, AAPL, NVDA)
<FinanceWidget
  title="Market Watch"
  currency="USD"
  showSparkline
  showDetails
/>

// With AI financial analysis
<FinanceWidget
  title="Portfolio Intelligence"
  currency="USD"
  onAiGenerate={async (prompt) => {
    const analysis = await myAI.analyzeMarket(prompt);
    showInsight(analysis);
  }}
/>
```

| Prop               | Type                                | Default          | Description                     |
| ------------------ | ----------------------------------- | ---------------- | ------------------------------- |
| `title`            | `string`                            | `'Market Watch'` | Widget heading                  |
| `items`            | `FinanceItem[]`                     | default assets   | List of assets (BTC, ETH, etc.) |
| `selectedSymbol`   | `string`                            | `'BTC'`          | Currently selected asset symbol |
| `onSelectAsset`    | `(symbol: string) => void`          | —                | Callback when asset changes     |
| `currency`         | `'USD' \| 'EUR' \| 'GBP' \| 'JPY'`  | `'USD'`          | Currency format code            |
| `onCurrencyChange` | `(currency: Currency) => void`      | —                | Callback when currency changes  |
| `showSparkline`    | `boolean`                           | `true`           | Render SVG sparkline chart      |
| `showDetails`      | `boolean`                           | `true`           | Render 24h high/low/volume stats|
| `onAiGenerate`     | `(prompt: string) => Promise<void>` | —                | AI market analysis handler      |
| `loading`          | `boolean`                           | `false`          | Loading state                   |

---

### Badge

Compact label for status, category, or notification count indicators.

```tsx
import { Badge } from 'wealthywidgets';

// Status label
<Badge variant="success">Active</Badge>
<Badge variant="danger" pill>Critical</Badge>
<Badge variant="warning" size="sm">Beta</Badge>

// Dot indicator on an icon
<Badge dot count={5}>
  <BellIcon />
</Badge>

// Cap at max
<Badge dot count={150} max={99}>
  <BellIcon />
</Badge>
```

| Prop      | Type           | Default     | Description                                    |
| --------- | -------------- | ----------- | ---------------------------------------------- |
| `variant` | `BadgeVariant` | `'default'` | `default` · `primary` · `success` · `warning` · `danger` · `info` |
| `size`    | `BadgeSize`    | `'md'`      | `'sm'` · `'md'` · `'lg'`                      |
| `pill`    | `boolean`      | `false`     | Fully rounded (capsule) shape                  |
| `dot`     | `boolean`      | `false`     | Render as notification dot wrapper             |
| `count`   | `number`       | —           | Number shown in the dot indicator              |
| `max`     | `number`       | `99`        | Cap value — displays `{max}+` when exceeded    |

---

### Toast

App-wide toast notifications via React Context. Wrap your app once with `<ToastProvider>`, then call `useToast()` anywhere inside.

```tsx
import { ToastProvider, useToast } from 'wealthywidgets';

// 1. Wrap your app (once, at the root)
function App() {
  return (
    <ToastProvider position="top-right" defaultDuration={4000}>
      <YourApp />
    </ToastProvider>
  );
}

// 2. Call from any component
function SaveButton() {
  const { toast, dismiss, dismissAll } = useToast();

  const handleSave = async () => {
    try {
      await save();
      toast({ message: 'Changes saved!', variant: 'success' });
    } catch {
      toast({
        title: 'Save failed',
        message: 'Please try again.',
        variant: 'danger',
        duration: 0, // stays until manually dismissed
      });
    }
  };

  return <Button onClick={handleSave}>Save</Button>;
}
```

**`ToastProvider` props:**

| Prop              | Type            | Default       | Description                             |
| ----------------- | --------------- | ------------- | --------------------------------------- |
| `position`        | `ToastPosition` | `'top-right'` | Screen position for the toast stack     |
| `defaultDuration` | `number`        | `4000`        | Auto-dismiss delay in ms. `0` = manual  |

**`toast()` options:**

| Field      | Type           | Default     | Description                                    |
| ---------- | -------------- | ----------- | ---------------------------------------------- |
| `message`  | `ReactNode`    | —           | Toast body (required)                          |
| `title`    | `string`       | —           | Bold heading above the message                 |
| `variant`  | `ToastVariant` | `'default'` | `default` · `success` · `warning` · `danger` · `info` |
| `duration` | `number`       | —           | Override default duration. `0` = no auto-dismiss |
| `icon`     | `ReactNode`    | —           | Replace the default variant icon               |

**`useToast()` returns:**

| Method       | Signature                | Description              |
| ------------ | ------------------------ | ------------------------ |
| `toast`      | `(item) => string`       | Show a toast, returns id |
| `dismiss`    | `(id: string) => void`   | Dismiss one toast by id  |
| `dismissAll` | `() => void`             | Dismiss all toasts       |

**Available positions:** `top-right` · `top-left` · `top-center` · `bottom-right` · `bottom-left` · `bottom-center`

---

## 🎨 Customisation

### SCSS variables

Override variables before importing the library:

```scss
// your-theme.scss
$color-primary: #7c3aed;
$color-primary-hover: #6d28d9;
$font-family-base: 'Geist', sans-serif;
$radius-md: 0.5rem;

@use 'wealthywidgets/src/styles/variables' as *;
```

---

## 🤖 AI Integration Pattern

All AI-powered widgets follow the same `onAiGenerate` interface — you supply the async handler, we supply the UI:

```tsx
// 1. User types a description in the ✦ prompt bar
// 2. onAiGenerate is called with their prompt
// 3. Your handler fetches / generates data and updates state
// 4. The widget re-renders with the new data

async function generateActivity(prompt: string) {
  const res = await fetch('/api/ai/activity', {
    method: 'POST',
    body: JSON.stringify({ prompt }),
  });
  const data = await res.json();
  setItems(data.items);
}

<ActivityWidget items={items} onAiGenerate={generateActivity} />;
```

This pattern is provider-agnostic — use OpenAI, Anthropic, a local model, or any API.

---

## 🛠 Development

```bash
# Install dependencies
pnpm install

# Build the library
pnpm run build

# Run tests
pnpm test

# Watch mode
pnpm run test:watch

# Static documentation site
pnpm run storybook
```

### Project structure

```
src/
├── components/
│   ├── ActivityWidget/
│   ├── Badge/
│   ├── Button/
│   ├── Card/
│   ├── CodeWidget/
│   ├── Dropdown/
│   ├── FinanceWidget/
│   ├── Input/
│   ├── Modal/
│   ├── ProgressBar/
│   ├── Toast/
│   ├── Tooltip/
│   └── WeatherWidget/
├── styles/
│   └── _variables.scss
└── index.ts
```

Each component folder contains: `Component.tsx` · `Component.types.ts` · `Component.scss` · `Component.test.tsx` · `index.ts`

---

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on adding new components, SCSS conventions, and the testing requirements.

---

## 📄 License

MIT © [anom-developer](https://github.com/anom-developer)
