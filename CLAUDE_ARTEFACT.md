#
# Auto-deploys Agent Architect to GitHub Pages on every push to main.
#
# One-time setup (after first push):
#   1. Go to your repo on GitHub
#   2. Settings → Pages → "Build and deployment"
#   3. Source: select "GitHub Actions"
#   4. Push to main, or manually run this workflow from the Actions tab
#   5. Live link: https://YOUR_USERNAME.github.io/agent-architect/
#
# If your repo name is NOT "agent-architect", update BASE_PATH below to match.
#

name: Deploy Agent Architect to GitHub Pages

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
        env:
          # Match this to your GitHub repo name. Default is /agent-architect/.
          # If you renamed the repo, update this value or override at the workflow level.
          BASE_PATH: /${{ github.event.repository.name }}/
        run: npm run build

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
