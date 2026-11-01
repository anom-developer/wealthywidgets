#!/usr/bin/env bash
# =============================================================================
# setup-github.sh  —  Initialise git repo and push to GitHub
#
# Prerequisites:
#   git + GitHub CLI (https://cli.github.com/)
#   Run: gh auth login   (once, before this script)
#
# Usage:
#   chmod +x setup-github.sh
#   ./setup-github.sh
# =============================================================================
set -euo pipefail

REPO_NAME="wealthywidgets"
DESCRIPTION="A collection of ready-to-use React UI widgets for rapid prototyping"
VISIBILITY="public"   # public | private

echo "==> Initialising git repository…"
git init
git add .
git commit -m "feat: initial commit — WealthyWidgets v2.1.0

12 self-contained React UI components:
- Button        (variants, sizes, loading, icons)
- Card          (image, title, description, actions)
- Input         (icon, hint, validation, AI generation)
- Modal         (Portal, Escape, scroll-lock, focus management)
- Dropdown      (search, multi-select, keyboard-accessible tags)
- ProgressBar   (status colours, label positions, striped, animated)
- Tooltip       (4 placements, 3 variants, delays)
- Badge         (status labels, dot indicators, pill shape)
- Toast         (ToastProvider + useToast hook, 6 positions, auto-dismiss)
- ActivityWidget (timeline, relative timestamps, AI feed generation)
- WeatherWidget  (conditions, forecast, AI data generation)
- CodeWidget     (syntax highlight, line numbers, editable, AI snippets)

TypeScript strict · SCSS BEM · 94 Jest tests · GitHub Actions CI"

echo ""
echo "==> Creating GitHub repository via GitHub CLI…"
if command -v gh &>/dev/null; then
  gh repo create "$REPO_NAME" \
    --description "$DESCRIPTION" \
    --"$VISIBILITY" \
    --source=. \
    --remote=origin \
    --push
  echo ""
  echo "✅  Repository created and pushed!"
  GITHUB_USER=$(gh api user -q .login)
  echo "    https://github.com/$GITHUB_USER/$REPO_NAME"
else
  echo "⚠️  GitHub CLI (gh) not found."
  echo ""
  echo "Manual steps:"
  echo "  1. Create repo at https://github.com/new  (name: $REPO_NAME)"
  echo "  2. Then run:"
  echo "     git remote add origin https://github.com/anom-developer/$REPO_NAME.git"
  echo "     git branch -M main"
  echo "     git push -u origin main"
fi

echo ""
echo "==> Next steps:"
echo "  1. pnpm install  →  pnpm test  →  pnpm run build"
