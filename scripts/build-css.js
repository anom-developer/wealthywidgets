#!/usr/bin/env node
/**
 * Compiles all component SCSS into dist/styles.css via sass CLI.
 * Called automatically during build.
 */
const { execSync } = require('child_process');
const fs   = require('fs');
const path = require('path');

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
  execSync(
    `node_modules/.bin/sass --load-path=. --style=compressed --no-source-map "${entry}" "${out}"`,
    { cwd: root, stdio: 'inherit' }
  );
  const size = (fs.statSync(out).size / 1024).toFixed(1);
  console.log(`dist/styles.css  ${size} kb`);
} catch (e) {
  process.exit(1);
} finally {
  fs.unlinkSync(entry); // remove temp file
}
