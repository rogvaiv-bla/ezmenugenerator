# 📍 Project Map - Quick Navigation

## 🎯 For Different User Types

### 👤 If You're a **User** (Want to Use the App)
1. **Quick Start:** Open [QUICK_START.md](QUICK_START.md) ⭐
2. **Live Demo:** https://ezmenugenerator.vercel.app
3. **Need Help?** Check [TESTING_GUIDE.md](TESTING_GUIDE.md)

### 👨‍💻 If You're a **Developer** (Want to Modify Code)
1. **Architecture:** Read [README.md](README.md)
2. **Backend Setup:** Check [api/README.md](api/README.md)
3. **Frontend Code:** See [frontend/README.md](frontend/README.md)
4. **API Endpoints:** Review [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
5. **Run Locally:** 
   ```bash
   npm install
   npm run dev
   ```

### 🧪 If You're a **Tester** (Want to Verify Features)
1. **Testing Guide:** Open [TESTING_GUIDE.md](TESTING_GUIDE.md)
2. **Feature List:** Check [IMPLEMENTATION_COMPLETE.md](IMPLEMENTATION_COMPLETE.md)
3. **Run Tests:** Follow procedures in testing guide

### 📦 If You're **Deploying** (Want to Go Live)
1. **Deployment:** Read [README.md](README.md) → Deployment section
2. **Environment:** Check [vercel.json](vercel.json)
3. **Redis Setup:** Configure in Vercel dashboard
4. **Deploy:** `vercel --prod`

---

## 📁 File Structure Guide

### 🎯 Main Documentation
```
README.md                      # START HERE - Project overview
QUICK_START.md                # 5-minute tutorial for users
RELEASE_NOTES.md              # What's new in v3.0
API_DOCUMENTATION.md          # Complete API reference
TESTING_GUIDE.md              # How to test everything
IMPLEMENTATION_COMPLETE.md    # Features implemented list
```

### 💻 Code Files
```
frontend/index.html           # Main app (3,178 lines)
├── HTML structure (6 tabs)
├── CSS (responsive design)
└── JavaScript (all features)

frontend/README.md            # Frontend documentation
```

### 🔌 Backend APIs
```
api/auth/
├── register.js               # User registration
├── login.js                  # User login
└── me.js                     # Token verification

api/user/
└── preferences.js            # Diet & allergy management

api/
├── recipes.js                # Get recipes
├── menu.js                   # Menu generation
└── shopping-list.js          # List persistence
```

### 📊 Data Files
```
data/
├── RETETE.txt               # Recipes database
├── RESTRICTII.txt           # Dietary restrictions
└── LISTA CU INGREDIENTE.txt # Ingredients list
```

### ⚙️ Configuration
```
package.json                  # Dependencies
vercel.json                   # Vercel config
.env.example                  # Environment template
```

---

## 🗺️ Feature Map

### Tab 1: Menu (Meniu)
- **File:** frontend/index.html lines ~400-600
- **Functions:** generateMenu(), exportMenuToPDF()
- **Uses:** recipes[], csvRecipes[], previousMenuRecipes
- **API:** GET /api/recipes, POST /api/menu

### Tab 2: Shopping (Cumpărături)
- **File:** frontend/index.html lines ~600-1000
- **Functions:** addItem(), toggleItem(), deleteItem(), shareList()
- **Uses:** shoppingList{}, categoryStates
- **API:** GET/POST /api/shopping-list

### Tab 3: Profile (Profil)
- **File:** frontend/index.html lines ~1000-1200
- **Functions:** handleLogin(), handleRegister(), updatePreferences()
- **Uses:** currentUser, userPreferences
- **API:** POST /api/auth/login, PUT /api/user/preferences

### Tab 4: Import (Import Rețete)
- **File:** frontend/index.html lines ~1200-1250
- **Functions:** parseAndPreviewCSV(), importRecipesFromCSV()
- **Uses:** csvRecipes[], selectedCSVData
- **API:** None (localStorage only)

### Tab 5: Analytics (Analize)
- **File:** frontend/index.html lines ~1250-1290
- **Functions:** trackRecipeUsage(), loadAnalytics(), resetAnalytics()
- **Uses:** recipeUsageStats{}
- **API:** None (localStorage only)

### Tab 6: Calendar (Calendar)
- **File:** frontend/index.html lines ~1290-1320
- **Functions:** renderCalendar(), selectDate(), assignRecipeToDate()
- **Uses:** calendarPlans{}, currentMonth
- **API:** None (localStorage only)

---

## 🔍 Finding Things

### "How do I...?"

#### ...Generate a Menu?
1. **User:** Click Menu tab → Click button
2. **Developer:** See generateMenu() function (line ~500)
3. **API:** POST /api/menu endpoint

#### ...Filter by Diet?
1. **User:** Register → Select diet in Profile
2. **Developer:** See filterRecipesByPreferences() function
3. **API:** GET /api/user/preferences endpoint

#### ...Export to PDF?
1. **User:** Click "Exportă ... PDF" button
2. **Developer:** See exportMenuToPDF() function
3. **Library:** jsPDF (loaded via CDN)

#### ...Sync Across Devices?
1. **User:** Login with same email on both devices
2. **Developer:** See syncWithServer() & pullFromServer()
3. **Backend:** Redis storage with sessionId key

#### ...Import Recipes?
1. **User:** Go to Import tab, upload CSV
2. **Developer:** See parseAndPreviewCSV() function
3. **Format:** Name,Ingredients,Protein

#### ...View Analytics?
1. **User:** Click Analytics tab
2. **Developer:** See trackRecipeUsage() function
3. **Storage:** localStorage recipeUsageStats

---

## 🎬 Step-by-Step Walkthroughs

### Scenario 1: First-Time User
1. Visit app → Menu tab appears
2. Click "Generate" → See 7-day menu
3. Click "Shopping" → Add items
4. Download PDF
✅ **Done without registration!**

### Scenario 2: Vegetarian User
1. Click "Login" → Register with email
2. Click "Profile" → Select "Vegetarian"
3. Save preferences
4. Generate menu → No meat recipes!
✅ **Personalized menus!**

### Scenario 3: Team Planning
1. Go to Shopping tab
2. Click "Share" → Get URL
3. Send URL to family
4. They see & edit same list
✅ **Collaborative shopping!**

### Scenario 4: Custom Recipes
1. Go to Import tab
2. Upload CSV with your recipes
3. Preview looks good?
4. Click "Import" → Recipes added
5. Generate menu → Your recipes included
✅ **Extend database!**

---

## 📊 Statistics

### Code Size
```
HTML:        280 lines
CSS:         900 lines
JavaScript: 2,000 lines
Total:     3,180 lines
```

### Documentation
```
README.md:              450 lines
API_DOCUMENTATION.md:   400 lines
frontend/README.md:     300 lines
TESTING_GUIDE.md:       350 lines
Other docs:            500+ lines
Total:              2,000+ lines
```

### Features
```
Tabs:              6 (Menu, Shopping, Profile, Import, Analytics, Calendar)
Languages:         3 (RO, EN, FR)
Diet Types:        4 (Balanced, Vegetarian, Vegan, Keto)
API Endpoints:     8 (Auth, Recipes, Preferences, Shopping, Menu)
PDF Exports:       3 (Menu, Shopping, Calendar)
```

---

## 🔗 Quick Links

### Run the App
- 🌐 **Live Demo:** https://ezmenugenerator.vercel.app
- 💻 **Local:** npm run dev
- 🚀 **Deploy:** vercel --prod

### Read Documentation
- 📖 **Main README:** [README.md](README.md)
- 🎓 **Quick Start:** [QUICK_START.md](QUICK_START.md)
- 🔌 **API Docs:** [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
- 🧪 **Testing:** [TESTING_GUIDE.md](TESTING_GUIDE.md)
- ✅ **Features:** [IMPLEMENTATION_COMPLETE.md](IMPLEMENTATION_COMPLETE.md)

### Development
- 📝 **Frontend Guide:** [frontend/README.md](frontend/README.md)
- 🔐 **API Backend:** [api/README.md](api/README.md)
- ⚙️ **Architecture:** [docs/SYNC_ARCHITECTURE.md](docs/SYNC_ARCHITECTURE.md)
- 📋 **Release Notes:** [RELEASE_NOTES.md](RELEASE_NOTES.md)

### Repository
- 📦 **Package Config:** [package.json](package.json)
- ☁️ **Vercel Config:** [vercel.json](vercel.json)
- 📊 **Project Map:** This file ([PROJECT_MAP.md](PROJECT_MAP.md))

---

## 🆘 Troubleshooting

### "I don't know where to start"
→ Open [QUICK_START.md](QUICK_START.md)

### "I want to use the app"
→ Visit https://ezmenugenerator.vercel.app

### "I want to develop features"
→ Clone repo → Read [README.md](README.md) → Check [frontend/README.md](frontend/README.md)

### "I want to test everything"
→ Open [TESTING_GUIDE.md](TESTING_GUIDE.md)

### "Something isn't working"
→ Check [TESTING_GUIDE.md](TESTING_GUIDE.md) troubleshooting section

### "I want to deploy"
→ Read [README.md](README.md) Deployment section

### "I need API reference"
→ Check [API_DOCUMENTATION.md](API_DOCUMENTATION.md)

---

## 📋 Checklists

### Before Using
- [ ] Visit https://ezmenugenerator.vercel.app
- [ ] Click Menu → Generate
- [ ] Check Shopping list
- [ ] Read QUICK_START.md

### Before Developing
- [ ] Read README.md
- [ ] Clone repository
- [ ] npm install
- [ ] npm run dev
- [ ] Check frontend/README.md

### Before Deploying
- [ ] All tabs working
- [ ] No console errors (F12)
- [ ] Responsive on mobile (375px)
- [ ] Redis configured
- [ ] Tests pass (TESTING_GUIDE.md)

---

## 🎯 Next Steps

**Choose your role:**

### 👤 User
→ Open app → Read [QUICK_START.md](QUICK_START.md)

### 👨‍💻 Developer  
→ Clone repo → Read [README.md](README.md)

### 🧪 Tester
→ Follow [TESTING_GUIDE.md](TESTING_GUIDE.md)

### 🚀 DevOps
→ Read [README.md](README.md) Deployment section

---

**Last Updated:** January 29, 2026  
**Version:** 3.0  
**Status:** ✅ Production Ready

Happy coding! 🎉
