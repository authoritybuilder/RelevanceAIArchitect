#
# Auto-deploys Agent Architect to GitHub Pages on every push to main.
#
# One-time setup (after first push):
#   1. Repo Settings → Pages → "Build and deployment"
#   2. Source: select "GitHub Actions"
#   3. Push to main, OR manually run from Actions tab
#   4. Live link: https://YOUR_USERNAME.github.io/REPO_NAME/
#
# Works regardless of repo name (relative base path in vite.config.js).
#

name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Set up Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci || npm install

      - name: Build
        run: npm run build

      - name: Copy 404.html for SPA routing
        run: cp dist/index.html dist/404.html

      - name: Upload Pages artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
