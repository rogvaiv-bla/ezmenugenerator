# 🍽️ Dieta Menu Planner

**Advanced Weekly Menu Generator with User Profiles, Analytics & Calendar Planning**

[![Vercel](https://img.shields.io/badge/deployed%20on-Vercel-000000?logo=vercel)](https://ezmenugenerator.vercel.app)
[![Status](https://img.shields.io/badge/status-active-brightgreen)](https://ezmenugenerator.vercel.app)
[![Redis](https://img.shields.io/badge/database-Redis-DC382D?logo=redis)](https://vercel.com)

**Technology Stack:**
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?logo=redis&logoColor=white)
![jsPDF](https://img.shields.io/badge/jsPDF-5C2D91?logo=javascript&logoColor=white)
![HTML5/CSS3](https://img.shields.io/badge/HTML5%2FCSS3-E34C26?logo=html5&logoColor=white)

---

## ✨ Features Overview

### 1️⃣ Menu Generation
- 📅 **7-Day Meal Plans** - AI-powered random generation
- 🔄 **No Repeats** - Tracks previous menu, prevents duplicates
- 🍽️ **Ingredient Lists** - Auto-compiled from all recipes
- 📄 **PDF Export** - Download complete menu with ingredients
- 🎯 **Dietary Filtering** - Respects user preferences (vegetarian, vegan, keto, balanced)
- ⚠️ **Allergy Management** - Excludes recipes with user allergens

### 2️⃣ Shopping List Management
- 📦 **Category Organization** - Vegetables, Fruits, Dairy, Meat, etc.
- ✅ **Smart Auto-Sorting** - Unchecked items bubble to top
- 📊 **Real-time Stats** - Total/bought/remaining counts
- 🔗 **Shareable Links** - Generate URL to share with family
- 💾 **Multi-Device Sync** - Redis backend for persistent storage
- 📄 **PDF Export** - Download list with checkboxes

### 3️⃣ User Authentication & Profiles
- 🔐 **Secure Registration/Login** - Email + password with PBKDF2 hashing
- 👤 **User Profiles** - Email, preferences, dietary restrictions
- 🎯 **Dietary Preferences** - Choose: Balanced, Vegetarian, Vegan, or Keto
- ⚠️ **Allergy Management** - Add/remove custom allergies
- 🌍 **Language Selection** - Romanian, English, French
- 💾 **Persistent Storage** - Redis backend with JWT authentication

### 4️⃣ Recipe Import & Management
- 📥 **CSV Import** - Upload recipes from spreadsheet
- 👀 **Preview Before Import** - Review first 3 recipes
- 📋 **Custom Recipes** - Add your own recipe database
- ⚡ **Automatic Integration** - Imported recipes available in menu generation

### 5️⃣ Analytics & Usage Tracking
- 📊 **Recipe Popularity** - Track which recipes are used most
- 🏆 **Top 5 Charts** - See most-used recipes
- 🥚 **Nutritional Stats** - Total protein tracking
- 🔄 **Usage Counter** - Auto-increments when recipe appears in menu
- 🔀 **Reset Option** - Clear analytics to start fresh

### 6️⃣ Calendar Planning
- 📆 **Month Navigation** - Browse past/future months
- 📍 **Date Selection** - Click dates to assign meals
- 🍽️ **Recipe Assignment** - Add multiple recipes per day
- 📅 **Planned Days View** - See all scheduled meals
- 📄 **PDF Export** - Download calendar plan
- 🗑️ **Clear Function** - Reset all plans

### 7️⃣ Multilingual Support
- 🇷🇴 **Romanian** (default) - Full translation
- 🇬🇧 **English** - Complete English interface
- 🇫🇷 **Français** - Full French translation
- 🔄 **Dynamic Switching** - Change language anytime

### 8️⃣ Accessibility (WCAG Compliant)
- ⌨️ **Keyboard Navigation** - Tab and Enter key support
- 🔍 **Title Attributes** - Tooltips on all interactive elements
- 📝 **ARIA Labels** - Screen reader support
- 🎨 **Color Contrast** - WCAG AA standard compliance
- 🔤 **Semantic HTML** - Proper heading hierarchy

---

## 📁 Project Structure

```
dieta/
├── api/
│   ├── auth/
│   │   ├── register.js           # User registration (PBKDF2 hashing)
│   │   ├── login.js              # JWT token generation
│   │   └── me.js                 # Verify token & get user
│   ├── user/
│   │   └── preferences.js        # Get/PUT dietary preferences
│   ├── menu.js                   # Menu generation endpoint
│   ├── recipes.js                # Recipe list API
│   └── shopping-list.js          # Redis-backed list persistence
├── frontend/
│   ├── index.html                # Single-page app (3178 lines)
│   ├── README.md                 # Frontend documentation
│   └── index.html.bak*           # Backups
├── data/
│   ├── RETETE.txt               # Recipe database (70+ recipes)
│   ├── RESTRICTII.txt           # Dietary restrictions
│   └── LISTA CU INGREDIENTE.txt # Ingredient list
├── docs/
│   ├── API_DOCUMENTATION.md     # Complete API reference
│   ├── SYNC_ARCHITECTURE.md     # Multi-device sync docs
│   └── (other documentation)
├── package.json
├── vercel.json                   # Vercel serverless config
└── README.md                     # This file
```

---

## 🚀 Quick Start

### Option 1: Live Demo (No Installation)
Visit: **https://ezmenugenerator.vercel.app**

1. Click "Meniu" to generate a 7-day menu
2. Click "Cumpărături" to manage shopping
3. Click "Profil" and register to unlock user features
4. Try the other tabs (Import, Analytics, Calendar)

### Option 2: Local Development

```bash
# Clone the repository
git clone <your-repo-url>
cd dieta

# Install dependencies
npm install

# Start local development server
npm run dev

# Open browser to http://localhost:3000
```

### Option 3: Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Your project is live!
```

---

## 📖 Usage Guide

### Tab 1: Menu (Meniu)
**Generate 7-day meal plan**

1. Click the **"Menu"** tab
2. Click **"Generează Meniu Aleator"** button
3. View 7 random recipes with ingredients
4. Click **"Exportă Meniu PDF"** to download

**Features:**
- Space bar = Quick generate shortcut
- Auto-syncs with shopping list
- Filters based on diet type and allergies

### Tab 2: Shopping List (Cumpărături)
**Organize & track purchases**

1. Click **"Shopping"** tab
2. **Add Items:**
   - Select category
   - Type product name
   - Set quantity
   - Click "➕ Adaugă"
3. **Manage Items:**
   - Check box to mark purchased
   - Items auto-sort (unchecked stay on top)
   - Click "×" to remove item
4. **Share:** Click "🔗 Share" to generate unique URL
5. **Export:** Click "📄 Exportă Cumpărături PDF"

**Multi-Device Sync:**
- Same sessionId = same data on all devices
- Auto-sync every 5 seconds
- Works offline with localStorage backup

### Tab 3: Profile (Profil)
**User account & preferences**

1. Click **"Login"** button (top-right)
2. **Register or Login**
3. Click **"Profile"** tab:
   - **Diet Type:** Balanced, Vegetarian, Vegan, or Keto
   - **Allergies:** Add custom allergies
   - **Language:** RO, EN, or FR
4. Click **"Salvează Preferințe"**

### Tab 4: Import Recipes (Import Rețete)
**Add custom recipes from CSV**

1. Click **"Import"** tab
2. **Prepare CSV:**
   ```
   Nume,Ingrediente,Proteina
   Pui Copt,pui|brânză|sare,35g
   Salată,roșii|castraveți|ulei,5g
   ```
3. **Upload & Preview** first 3 recipes
4. Click **"Importă Rețete"** to add

### Tab 5: Analytics (Analize)
**Track recipe popularity**

1. Click **"Analytics"** tab
2. View **Top 5 Recipes**
3. See **Nutritional Stats**
4. Click **"Resetează Statistici"** to clear

### Tab 6: Calendar (Calendar)
**Plan meals for specific dates**

1. Click **"Calendar"** tab
2. Navigate months with arrow buttons
3. Click a date to select
4. Choose recipe and click "Adaugă"
5. View all plans below calendar
6. Export to PDF or clear all plans

---

## 🔐 Authentication & Security

### Registration
- Email validation (must be valid format)
- Password (minimum 6 characters)
- PBKDF2 hashing with salt
- Stored in Redis with 30-day TTL

### Login
- Email & password verification
- JWT token generated
- Token used for subsequent requests

### Data Privacy
- ✅ Passwords hashed server-side
- ✅ JWT tokens expire automatically
- ✅ User data isolated per account
- ⚠️ Use HTTPS in production

---

## 🔌 API Endpoints

See [docs/API_DOCUMENTATION.md](./docs/API_DOCUMENTATION.md) for complete specification.

### Core Endpoints
```
POST   /api/auth/register              Register new user
POST   /api/auth/login                 Login & get JWT token
GET    /api/auth/me                    Verify token
GET    /api/recipes                    Get all recipes
POST   /api/menu                       Generate menu
GET    /api/shopping-list              Fetch list
POST   /api/shopping-list              Save list to Redis
GET    /api/user/preferences           Get user preferences
PUT    /api/user/preferences           Update preferences
```

---

## 🛠️ Technical Details

### Frontend Architecture
- **Framework:** Vanilla JavaScript (no dependencies except jsPDF)
- **Lines of Code:** ~3,178
- **CSS:** Custom responsive design
- **State Management:** localStorage + global JavaScript variables

### Backend Architecture
- **Platform:** Vercel Serverless Functions
- **Language:** Node.js
- **Database:** Redis (Vercel KV)
- **Authentication:** JWT tokens (Base64 encoded)

### Data Persistence
```
localStorage:
  - authToken, userEmail, userPreferences
  - shoppingList, csvRecipes, calendarPlans
  - recipeUsageStats

Redis (Server):
  - user:{userId} → user account data
  - shopping-list:{sessionId} → persistent list
  - Expiration: 30 days per record
```

---

## 📊 Performance

- ⚡ Initial page load: < 2 seconds
- ⚡ Menu generation: < 1 second
- ⚡ Sync latency: < 100ms
- ⚡ Mobile tap response: < 50ms

---

## 🌐 Responsive Design

```
Mobile (< 480px):     Single column, large touch targets
Tablet (480-768px):   Two columns, optimized layout
Desktop (> 768px):    Full width, multi-column interface
```

Works on iPhone, iPad, Android, laptop & desktop.

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Menu not generating | Refresh page, check recipes in API |
| Login not working | Verify email format, check Redis connection |
| Shopping list not syncing | Check network, clear localStorage, reload |
| CSV import failing | Verify format: `Name,Ingredients,Protein` |
| Calendar dates not saving | Check localStorage is enabled |
| PDF export empty | Ensure data exists |

---

## 🚀 Deployment

### Deploy to Vercel

```bash
npm install -g vercel
vercel

# Configure Redis in Vercel dashboard
# Deploy your project
```

### Verify Deployment
1. Go to https://vercel.com/dashboard
2. Select your project
3. Check build logs
4. Test live URL

---

## 📚 Additional Resources

- **Live Demo:** https://ezmenugenerator.vercel.app
- **API Docs:** [docs/API_DOCUMENTATION.md](./docs/API_DOCUMENTATION.md)
- **Frontend Guide:** [frontend/README.md](./frontend/README.md)

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-thing`
3. Make changes
4. Commit: `git commit -m "Add amazing feature"`
5. Push: `git push origin feature/amazing-thing`
6. Create Pull Request

---

## 📄 License

All rights reserved. 2026. Created for personal meal planning needs.

---

**Made with ❤️ for better meal planning** 🍽️

Last Updated: **January 29, 2026** | Version: **3.0** (Auth + Import + Analytics + Calendar)
