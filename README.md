# 🍽️ EZMENUGENERATOR

**Transforming Menus, Elevating Dining Experiences Instantly**

[![Vercel Deployed](https://img.shields.io/badge/deployed%20on-Vercel-000000?logo=vercel)]()
[![Live](https://img.shields.io/badge/status-live-brightgreen)]()
[![Language](https://img.shields.io/badge/language-JavaScript-F7DF1E?logo=javascript)]()

**Built with:**
![Vercel](https://img.shields.io/badge/Vercel-000?logo=vercel)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34C26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Live Demo](#live-demo)
- [Quick Start](#quick-start)
- [Deployment](#deployment)

## Overview

**ezmenugenerator** is a modern, serverless menu generation app that creates intelligent weekly meal plans. It respects dietary restrictions and protein frequency limits while providing an interactive UI for discovering recipes.

Built with serverless architecture on Vercel for instant global deployment.

## Features

- 🎯 **Smart Menu Generation**: Random 7-day menus respecting protein frequency limits
- 🔍 **Recipe Search Integration**: Click to search recipes online
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- 🎨 **Beautiful UI**: Clean, modern interface with smooth animations
- ⚡ **Serverless**: Deployed on Vercel for instant scaling and 99.9% uptime
- 🌍 **Global CDN**: Fast loading anywhere in the world
- 📦 **Ingredients List**: View all ingredients for each recipe

## Live Demo

🌐 **Live Application**: https://ezmenugenerator.vercel.app

## Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Start local dev server (requires Vercel CLI)
npm run dev

# Visit http://localhost:3000
```

### Deploy to Vercel

**Option 1: Via Git (Recommended)**
1. Push code to GitHub
2. Visit https://vercel.com
3. Click "New Project" and import your repository
4. Deploy!

**Option 2: Via CLI**
```bash
npm install -g vercel
vercel
```

## Deployment

This project is configured for Vercel deployment:

- **Configuration**: `vercel.json`
- **API Routes**: `/api/menu.js` and `/api/recipes.js`
- **Frontend**: `/frontend/` directory
- **Auto-deploys**: On every push to main branch

### Project Structure

```
.
├── api/                     # Serverless API functions
│   ├── menu.js             # Menu generation endpoint
│   └── recipes.js          # Recipe list endpoint
├── frontend/               # Static website
│   └── index.html
├── data/                   # Data files (recipes, restrictions)
├── vercel.json            # Vercel configuration
├── package.json
└── README.md
```

## How It Works

1. **Generate Menu**: Click "GENEREAZĂ MENIU" button
2. **Expand Card**: Click any day to see ingredients
3. **Search Recipe**: Click recipe name with 🔍 icon
4. **Save/Share**: Screenshot or bookmark your menu

---

**Made with ❤️ for better meal planning** 🍽️
