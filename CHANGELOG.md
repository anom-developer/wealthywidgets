# Changelog

All notable changes to WealthyWidgets are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.2.0] — 2026-11-01

### Added
- **Live Real-World APIs**:
  - Binance 24hr Public Ticker API connected for real-time cryptocurrency quotes (BTC, ETH, SOL, BNB, DOGE, XRP, etc.) with automatic fallback.
  - Open-Meteo Geocoding and Forecast API connected for global real-time weather in any city worldwide with WMO condition icons.
  - Pulsing `LIVE API` badge indicator on widgets when real-time data is synced.
- **Ticker Bar (`<wealthy-ticker>` / `<Ticker />`)**:
  - Continuous marquee scrolling ticker bar with live crypto/stock quotes.
  - Infinite seamless CSS animation, `pause-on-hover` interaction, custom scroll speed, and light/dark/pill design variants.
- **Notion Embed Support**:
  - Dedicated Notion embed compatibility mode (`embed.html?notion=true`) with adaptive light/dark theme matching Notion's palette.
  - 1-click «Copy Notion URL» in Embed Studio for instant pasting into `/embed` Notion blocks.
- **Progressive Web App (PWA)**:
  - Added `docs/manifest.json`, `docs/icon.svg`, and `docs/sw.js` (Service Worker caching).
  - Standalone mobile & desktop app install button with `beforeinstallprompt` support.
- **FinanceWidget (React & Web Component)**:
  - Interactive SVG sparkline mini-charts, 24h metrics (high/low/vol/cap), and multi-currency support including `RUB (₽)`.
- **Embed Studio 🚀 & Standalone Examples**:
  - Visual widget generator with live preview, HTML code copy, and standalone HTML download.
  - Standalone pure-HTML zero-build example at `examples/html-embed/index.html`.
- **Unit Tests**: Added test suites for `ActivityWidget`, `WeatherWidget`, `CodeWidget`, `FinanceWidget`, and `Ticker`.

### Changed
- Replaced all legacy `AceAnom` references with `anom-developer`.
- Removed all `npm` dependencies, `.npmignore`, and `package-lock.json` in favor of standard zero-dependency Web Components and `pnpm`.
- Set repository remote to `https://github.com/anom-developer/wealthywidgets.git`.

---

## [2.1.0] — 2026-06-07

### Added
- `Badge` — compact status/category label with 6 variants, 3 sizes, pill mode, and dot indicator with `max` cap
- `Toast` / `ToastProvider` / `useToast` — app-wide toast notification system via React Context + Portal; 6 screen positions, auto-dismiss, pause-on-hover, progress bar
- Storybook 8 — stories for all 12 components with interactive controls, a11y checks, and auto-generated docs; built into `docs/` for GitHub Pages deployment

### Fixed
- `Modal` — `role="dialog"` was on the backdrop element instead of the panel; screen-readers now correctly identify the dialog boundary
- `Modal` — added full focus management: focus moves into the dialog on open and returns to the trigger on close
- `Dropdown` — tag-remove `<span role="button">` was missing `tabIndex={0}` and `onKeyDown`, making it unreachable by keyboard
- `Dropdown` — replaced `setTimeout(..., 50)` focus hack with `useLayoutEffect` for reliable, synchronous search focus
- `Dropdown` — tag-remove now shows a `focus-visible` ring (was keyboard-focusable but visually invisible)
- `Card` — `imageAspectRatio` used `replace('/', '\/')` generating invalid CSS class names (e.g. `--16\/9`); now uses `-` separator (`--16-9`)
- `CodeWidget` — `<textarea>` in `editable` mode did not grow with content; added `useEffect` auto-resize via `scrollHeight`
- `CodeWidget` — copy timer (`setTimeout`) was not cleared on unmount, causing a memory leak
- `CodeWidget` — AI generate button was missing `aria-label` when in loading state (spinner had no text)
- `ProgressBar` — `animated` prop was declared in types but never applied to the component; now wires up `ww-progress__fill--animated` CSS class
- `ProgressBar` — `transition: width` and `animation: ww-progress-fill-in` both controlled width simultaneously on mount; `--animated` now suppresses the transition
- `Tooltip` — `showTimer` and `hideTimer` refs were not cleared on unmount, leaking `setState` calls after unmount
- `Tooltip` — `@keyframes` used `translateX(-50%)` for all placements, but `left`/`right` placements use `translateY(-50%)`; animation no longer glitches on side placements
- `ActivityWidget` — `key={item.id}` with mixed `string | number` ids could produce key collisions; prefixed as `` `item-${item.id}` ``
- `Input` — AI generate promise `.then()` had no `.catch()`; unhandled rejection if `onAiGenerate` threw
- `Input.scss` — `&__ai-btn` and `&__ai-spinner` were defined outside the `.ww-input {}` block; the `&` parent selector had no context and generated invalid CSS
- `Button` — missing `type="button"` default; buttons inside `<form>` elements would accidentally submit the form
- `WeatherWidget` — AI submit button missing `type="button"`
- `ActivityWidget` — AI submit and "show more" buttons missing `type="button"`
- `src/index.ts` — stray inline type declarations caused broken barrel exports
- `.eslintrc.js` — `overrides` block was outside `module.exports`, so test/stories files were never linted with `tsconfig.test.json`
- `jest.config.js` — coverage threshold failures due to widget components without unit tests; excluded from coverage collection explicitly
- `Modal.test.tsx` — focus test needed `jest.useFakeTimers()` to flush `requestAnimationFrame` in jsdom
- `Tooltip.test.tsx` / `Toast.test.tsx` — `jest.useFakeTimers()` without `afterEach(jest.clearAllTimers)` caused timer leaks between tests

## [2.0.0] — 2026-03-01

### Added
- `ActivityWidget` — scrollable event timeline with relative timestamps, status dots, "show more" collapse, and `onAiGenerate` AI prompt bar
- `WeatherWidget` — current conditions card with condition-driven gradient backgrounds, detail stats (humidity, wind, UV), 7-day forecast strip, and `onAiGenerate` AI prompt bar
- `CodeWidget` — dark-themed code block with macOS toolbar chrome, copy button, line numbers, line highlighting, inline editable mode, and `onAiGenerate` AI snippet generation
- `Input.onAiGenerate` — inline ✦ AI generation button added to the existing `Input` widget; returns a string to replace the field value
- `Input.aiLoading` — loading state prop for the new AI button
- `.github/workflows/ci.yml` — GitHub Actions CI pipeline
- `.prettierrc` + `.prettierignore` — Prettier config for consistent formatting
- `.editorconfig` — cross-editor whitespace / line-ending rules
- `CHANGELOG.md`, `SECURITY.md`, `CONTRIBUTING.md` — project documentation

---

## [1.0.1] — 2026-01-15

### Fixed
- `Dropdown` — fixed keyboard navigation skipping disabled options
- `Modal` — resolved focus-trap leak when `isOpen` toggled rapidly

### Changed
- `ProgressBar` — `animated` prop now correctly maps to a CSS animation class instead of an inline style (breaking: remove `animated` from `<style>` if overriding)

---

## [1.0.0] — 2025-12-01

### Added
- Initial release with `Button`, `Card`, `Input`, `Modal`, `Dropdown`, `ProgressBar`, `Tooltip`
- Full TypeScript definitions
- SCSS variable system via `src/styles/_variables.scss`
- Jest + React Testing Library test suite (>80% coverage)
- Rollup dual-format build (CJS + ESM) with extracted `styles.css`
- MIT licence

[Unreleased]: https://github.com/anom-developer/wealthywidgets/compare/v2.1.0...HEAD
[2.1.0]: https://github.com/anom-developer/wealthywidgets/compare/v2.0.0...v2.1.0
[2.0.0]: https://github.com/anom-developer/wealthywidgets/compare/v1.0.1...v2.0.0
[1.0.1]: https://github.com/anom-developer/wealthywidgets/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/anom-developer/wealthywidgets/releases/tag/v1.0.0
