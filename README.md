# 🍽️ Ce Mănânc Azi?

**Intelligent Weekly Menu Generator & Shopping List Manager**

[![Vercel Deployed](https://img.shields.io/badge/deployed%20on-Vercel-000000?logo=vercel)](https://ezmenugenerator.vercel.app)
[![Live](https://img.shields.io/badge/status-live-brightgreen)](https://ezmenugenerator.vercel.app)
[![Redis](https://img.shields.io/badge/database-Redis-DC382D?logo=redis)](https://vercel.com)

**Tech Stack:**
![Vercel](https://img.shields.io/badge/Vercel-000?logo=vercel)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?logo=redis&logoColor=white)
![HTML5/CSS3](https://img.shields.io/badge/HTML5%2FCSS3-E34C26?logo=html5&logoColor=white)

---

## 📋 Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Deployment](#deployment)
- [API Documentation](#api-documentation)

---

## ✨ Features

### Menu Generation
- 📅 **7-Day Menu Generator** - AI-powered meal suggestions
- 🍽️ **Dietary Restrictions** - Respect allergies & preferences
- 🥗 **Protein Management** - Intelligent frequency balancing
- 📝 **Complete Recipes** - View full ingredients & instructions

### Shopping List
- 📦 **Auto-Generated Lists** - Built from menu selections
- ✅ **Smart Tracking** - Check off items while shopping
- 📊 **Real-time Stats** - Total/bought/remaining counts
- 🔗 **Shareable Links** - Share lists with family
- 💾 **Cloud Sync** - Data persists across devices via Redis
- ↶ **Undo on Delete** - 5-second undo popup

### User Experience
- 📱 **Fully Responsive** - Desktop, tablet, mobile optimized
- 🎨 **Beautiful UI** - Smooth animations & modern design
- ⚡ **Instant Loading** - Serverless CDN global deployment
- 🔄 **Multi-Device Sync** - Same sessionId = same data everywhere
- 💾 **State Persistence** - Collapsed categories remember state
- 🎯 **Zero Lag** - Optimized rendering on mobile

---

## 📁 Project Structure

```
.
├── api/
│   ├── shopping-list.js      # Redis persistence endpoint
│   ├── recipes.js            # Recipe API endpoint
│   └── menu.js               # Menu generation endpoint
├── frontend/
│   └── index.html            # Single-page app (HTML/CSS/JS)
├── data/
│   ├── RETETE.txt           # Recipe database
│   ├── RESTRICTII.txt       # Dietary restrictions
│   └── LISTA CU INGREDIENTE.txt
├── docs/                     # Archive of development docs
├── package.json              # Dependencies (redis client)
├── README.md                 # This file
└── vercel.json              # Vercel config (Redis integration)
```

---

## 🚀 Installation

### Prerequisites
- Node.js 16+ (for local testing)
- npm or yarn
- Vercel account (for deployment)

### Local Development

```bash
# Clone & setup
git clone <repo>
cd dieta
npm install

# Run locally
npm run dev

# Visit: http://localhost:3000
```

### Environment Variables

Create `.env.local`:
```
STORAGE_REDIS_URL=redis://default:PASSWORD@HOST:PORT
```

---

## 💻 Usage

### Generate Weekly Menu
1. Click **"📅 Menu Săptămânal"** tab
2. Click **"GENEREAZĂ MENIU"** button
3. View 7-day meal plan
4. Click recipes to search online
5. Menu recipes auto-populate shopping list

### Manage Shopping List
1. Click **"🛒 Lista de Cumpărături"** tab
2. **Add items**: Select category → Type product → Click ➕
3. **Track progress**: Check off items while shopping
4. **Collapse categories**: Click category header (state persists!)
5. **Undo deletes**: 5-second popup when deleting items
6. **Share list**: Click 🔗 button to generate shareable link
7. **Sync devices**: Use same URL = same data on phone/tablet

#### Multi-Device Features
- Same sessionId automatically syncs every 5 seconds
- Data persists in Redis (30-day expiration)
- Collapsed category state saved per device
- Works offline (uses localStorage backup)

---

## 🌐 Deployment

### Deploy to Vercel

```bash
# Push to main branch
git push origin main

# Vercel auto-deploys
# Build log: https://vercel.com/projects

# Check Redis status in Vercel Dashboard:
# Project → Storage → "ezmenu"
```

### Verify Deployment
```bash
# Check API
curl https://ezmenugenerator.vercel.app/api/shopping-list?sessionId=test

# Check Redis
npm run dev  # Local testing with Redis
```

---

## 🔌 API Documentation

### Shopping List Endpoint

**Base URL:** `/api/shopping-list`

#### POST - Save Shopping List
```javascript
POST /api/shopping-list
Content-Type: application/json

{
  "sessionId": "session_1234567890",
  "data": {
    "🥬 Legume/Fructe": {
      "Banane 🍌": { "checked": false, "quantity": 1 }
    }
  },
  "timestamp": 1674507600000
}

Response:
{
  "success": true,
  "message": "Shopping list saved to Redis",
  "lastUpdated": 1674507600000
}
```

#### GET - Fetch Shopping List
```javascript
GET /api/shopping-list?sessionId=session_1234567890

Response:
{
  "data": { "🥬 Legume/Fructe": { ... } },
  "lastUpdated": 1674507600000,
  "isNew": false
}
```

#### DELETE - Clear Shopping List
```javascript
DELETE /api/shopping-list

{
  "sessionId": "session_1234567890"
}
```

---

## 🔧 Technical Details

### Frontend Architecture
- **Single Page App** (HTML + CSS + Vanilla JS)
- **No framework** = ultra-lightweight (~1600 lines)
- **LocalStorage** for backup + fast initial load
- **Fetch API** for server communication
- **CSS Grid/Flexbox** for responsive layout

### Backend Architecture
- **Vercel Serverless Functions** (Node.js)
- **Redis on Vercel KV** for persistent storage
- **Session-based** data isolation
- **30-day** automatic expiration per session
- **Error handling** with fallback to localStorage

### Data Flow
```
User Action
  ↓
Save to localStorage (fast)
  ↓
POST to /api/shopping-list (Redis save)
  ↓
Every 5 sec: GET /api/shopping-list (sync check)
  ↓
If newer data: Update UI + localStorage
```

---

## 📊 Performance Metrics

- **Initial Load**: < 2 seconds (global CDN)
- **Menu Generation**: < 1 second
- **Sync Latency**: < 100ms (Redis)
- **Mobile Toggle**: < 50ms (optimized rendering)
- **Scrollable Categories**: 70vh (no content cutoff)

---

## 🐛 Known Issues & Fixes

| Issue | Status | Solution |
|-------|--------|----------|
| Stats not updating on load | ✅ Fixed | Call updateStats() on DOMContentLoaded |
| Mobile toggle lag | ✅ Fixed | Optimized saveSingleCategoryState() |
| Sync HTTP 500 errors | ✅ Fixed | Use redis npm client + STORAGE_REDIS_URL |
| Category items cut off | ✅ Fixed | Changed max-height to 70vh + overflow-y auto |
| Delete without undo | ✅ Fixed | Added 5-second undo popup |
| Data lost on refresh | ✅ Fixed | Redis persistence + localStorage backup |

---

## 📝 License

Created for personal use. Feel free to fork & customize!

---

## 👤 Author

**Eduard** - Full Stack Developer  
📧 Contact via GitHub

---

**Last Updated:** January 23, 2026  
**Version:** 2.0 (Redis Integration + Multi-Device Sync)

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
