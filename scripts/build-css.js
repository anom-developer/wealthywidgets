#!/usr/bin/env node
/**
 * Compiles all component SCSS into dist/styles.css via sass JS API.
 * Called automatically during build.
 */
const fs   = require('fs');
const path = require('path');
const sass = require('sass');

const root   = path.resolve(__dirname, '..');
const entry  = path.join(root, 'scripts', 'styles-entry.scss');
const outDir = path.join(root, 'dist');
const out    = path.join(outDir, 'styles.css');

// Generate the entry file
const components = [
  'Button', 'Card', 'Input', 'Modal', 'Dropdown',
  'ProgressBar', 'Tooltip', 'ActivityWidget', 'WeatherWidget',
  'CodeWidget', 'Badge', 'Toast', 'FinanceWidget', 'Ticker',
];

const lines = components
  .map(name => `@forward '../src/components/${name}/${name}';`)
  .join('\n');

fs.writeFileSync(entry, lines + '\n');
fs.mkdirSync(outDir, { recursive: true });

try {
  const result = sass.compile(entry, {
    loadPaths: [root],
    style: 'compressed',
    sourceMap: false,
  });

  const extraCss = `
.dark-mode .ww-finance, [data-theme="dark"] .ww-finance, .ww-finance--dark { background: #1e293b; border-color: #334155; color: #f8fafc; }
.dark-mode .ww-finance__title, [data-theme="dark"] .ww-finance__title { color: #f8fafc; }
.dark-mode .ww-finance__tab, [data-theme="dark"] .ww-finance__tab { background: #0f172a; border-color: #334155; color: #94a3b8; }
.dark-mode .ww-activity, [data-theme="dark"] .ww-activity, .ww-activity--dark { background: #1e293b; border-color: #334155; color: #f8fafc; }
.dark-mode .ww-activity__title, [data-theme="dark"] .ww-activity__title { color: #f8fafc; }
.dark-mode .ww-activity__label, [data-theme="dark"] .ww-activity__label { color: #e2e8f0; }
`;

  fs.writeFileSync(out, result.css + '\n' + extraCss);
  const size = (fs.statSync(out).size / 1024).toFixed(1);
  console.log(`dist/styles.css  ${size} kb`);

  const docsDist = path.join(root, 'docs', 'dist', 'styles.css');
  if (fs.existsSync(path.dirname(docsDist))) {
    fs.copyFileSync(out, docsDist);
  }
} catch (e) {
  console.error('Error compiling SCSS:', e);
  process.exit(1);
} finally {
  if (fs.existsSync(entry)) {
    fs.unlinkSync(entry);
  }
}
