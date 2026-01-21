# 🍽️ Diet Menu Generator - Vercel Edition

Quick deployment to Vercel!

## 🚀 Quick Start

### Option 1: Deploy via Git (Recommended)

1. Push your code to GitHub/GitLab/Bitbucket
2. Visit [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your repository
5. Vercel auto-detects settings from `vercel.json`
6. Click Deploy!

### Option 2: Deploy via CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Deploy from project directory
vercel
```

## 🏠 Project Structure

```
.
├── api/                  # Serverless API functions
│   ├── menu.js          # Weekly menu generation
│   └── recipes.js       # Recipe list
├── frontend/            # Static website files
│   └── index.html
├── vercel.json          # Vercel config
├── package.json
└── VERCEL_MIGRATION.md  # Full migration details
```

## 🔧 Local Development

```bash
# Install dependencies
npm install

# Start local dev server
npm run dev
```

Visit `http://localhost:3000` to preview your app!

## 📝 Environment Variables

Currently no environment variables needed. All data is embedded in the code.

To add variables later:
1. Go to Vercel Dashboard → Settings → Environment Variables
2. Add your variables
3. They'll be available in `process.env` in your functions

## 📚 Documentation

See [VERCEL_MIGRATION.md](./VERCEL_MIGRATION.md) for detailed migration info.

## 🎯 Features

- ✅ Generate random 7-day menu
- ✅ Respects protein frequency limits
- ✅ Shows ingredients for each recipe
- ✅ Responsive design
- ✅ Search recipes online
- ✅ Zero-config Vercel deployment

## 🛠 What Changed from Netlify

- Function format: Netlify → Vercel Node.js
- Routes: `/.netlify/functions/*` → `/api/*`
- Config: `netlify.toml` → `vercel.json`
- Backend: Flask removed (now serverless)

## 🤝 Need Help?

Check:
- [Vercel Docs](https://vercel.com/docs)
- [VERCEL_MIGRATION.md](./VERCEL_MIGRATION.md)
- Vercel Dashboard logs for errors

---

**Made with ❤️ for your weekly menu needs** 🍽️
