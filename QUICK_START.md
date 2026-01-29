# ⚡ Quick Start Guide

## 🚀 Start Using Dieta Menu Planner in 2 Minutes

### Option 1: Online (Easiest)
1. **Visit:** https://ezmenugenerator.vercel.app
2. **Start using immediately** - no installation needed!

### Option 2: Local Development
```bash
# 1. Clone repo
git clone <repo>
cd dieta

# 2. Install
npm install

# 3. Run
npm run dev

# 4. Open browser
http://localhost:3000
```

---

## 📖 5-Minute Tutorial

### Step 1: Generate a Menu (1 min)
1. Click **"Menu"** tab (top)
2. Click **"Generează Meniu Aleator"** button
3. ✅ You get 7-day meal plan!
4. See ingredients needed for the week

**Shortcut:** Press **SPACE** to generate instantly

---

### Step 2: Create Shopping List (1 min)
1. Click **"Shopping"** tab
2. Click a category (e.g., "Legume")
3. Type item name (e.g., "Roșii")
4. Click **"➕ Adaugă"**
5. ✅ Item added to list!

**Pro Tip:** Unchecked items automatically move to top

---

### Step 3: Register & Set Preferences (2 min)
1. Click **"Login"** button (top-right)
2. Click **"Register"** tab
3. Enter email: `yourname@example.com`
4. Enter password: `12345678` (6+ chars)
5. Click **"Înregistrare"**
6. ✅ Account created!

**Then set preferences:**
1. Click **"Profile"** tab
2. Select diet: **"Vegetarian"** (or Vegan/Keto)
3. Add allergy: Type **"gluten"** → Click **"➕ Adaugă"**
4. Change language: **"English"**
5. Click **"Salvează Preferințe"**
6. ✅ Menu now auto-filters for you!

---

### Step 4: Other Cool Features (1 min)

**📥 Import Recipes from CSV**
```
1. Create file: recipes.csv
2. Content:
   Nume,Ingrediente,Proteina
   Pui Copt,pui|sare,35g
   Salată,roșii|ulei,5g

3. Go to "Import" tab
4. Upload file
5. Click "Importă Rețete"
6. ✅ Recipes added to menu!
```

**📊 View Analytics**
1. Click "Analytics" tab
2. See Top 5 recipes used
3. View nutrition stats

**📆 Plan Calendar**
1. Click "Calendar" tab
2. Click a date
3. Select recipe
4. Click "Adaugă"
5. ✅ Meal planned for that date!

**📄 Export to PDF**
- Menu: Click "Exportă Meniu PDF"
- Shopping: Click "Exportă Cumpărături PDF"
- Calendar: Click "Export Calendar PDF"

---

## 🎯 Common Tasks

### Task: "I want a vegetarian menu this week"
```
1. Register (if not done)
2. Go to Profile → Select "Vegetarian"
3. Save preferences
4. Generate menu
5. ✅ No meat recipes!
```

### Task: "Share shopping list with family"
```
1. Add items to shopping list
2. Click "🔗 Share" button
3. Copy URL
4. Send to family
5. ✅ They see same list on their device!
```

### Task: "Plan meals for next month"
```
1. Go to Calendar
2. Click "Luna Următoare →"
3. Click dates you want to plan
4. Add recipes
5. Click "Export Calendar PDF"
6. ✅ Download & print!
```

### Task: "Add my own recipes"
```
1. Create CSV file (see format above)
2. Go to Import tab
3. Upload file
4. Review recipes
5. Click "Importă Rețete"
6. ✅ Use in future menus!
```

---

## 💡 Pro Tips

### Keyboard Shortcuts
- **SPACE** - Generate new menu
- **TAB** - Navigate between buttons
- **ENTER** - Confirm selections
- **ESCAPE** - Close modals

### Mobile Tips
- All features work on phone
- Touch-friendly buttons
- Responsive design
- Works offline (with cached data)

### Data Management
- **Your data is saved locally** - nothing lost on refresh
- **Register for cloud backup** - sync across devices
- **Export regularly** - Download PDFs for backup

---

## ❓ Frequently Asked Questions

**Q: Can I use without registering?**
A: Yes! Menu generation and shopping list work without account. Register for dietary filtering and multi-device sync.

**Q: How much data can I import?**
A: Unlimited CSV recipes can be imported. Each recipe = 1 line in CSV.

**Q: Can I share my shopping list?**
A: Yes! Click "🔗 Share" to generate shareable URL. Anyone can access and edit.

**Q: Does it work offline?**
A: Partially. Basic features use cached data. Registration/sync requires internet.

**Q: How long is data kept?**
A: Local data = until you clear. Server data = 30 days with account.

**Q: Can I export menus?**
A: Yes! Click "Exportă Meniu PDF" to download printable menu with ingredients.

**Q: What languages are supported?**
A: Romanian (default), English, French. More can be added.

**Q: Is my password secure?**
A: Yes! Passwords are hashed with PBKDF2 on server. Never stored in plain text.

**Q: Can I use on multiple devices?**
A: Yes! Login with same email on any device. Data syncs automatically.

---

## 🔧 Troubleshooting

**Problem: "Menu not generating"**
- Solution: Refresh page, check internet connection

**Problem: "Items not syncing to other device"**
- Solution: Make sure you're logged in same account on both devices

**Problem: "CSV import failing"**
- Solution: Verify format is `Name,Ingredients,Protein` with pipe (|) between ingredients

**Problem: "PDF not downloading"**
- Solution: Check browser's download settings, disable popup blockers

**Problem: "Can't login"**
- Solution: Verify email format, password is 6+ characters, check spelling

---

## 📞 Support

### Docs
- 📖 [README.md](./README.md) - Full documentation
- 📖 [frontend/README.md](./frontend/README.md) - Frontend guide
- 📖 [docs/API_DOCUMENTATION.md](./docs/API_DOCUMENTATION.md) - API reference

### Test It
- 🧪 [TESTING_GUIDE.md](./TESTING_GUIDE.md) - All tests to verify

---

## 🎉 You're Ready!

You now know all the basics. Start exploring:

1. **Visit:** https://ezmenugenerator.vercel.app
2. **Try features** described above
3. **Customize** your menu & shopping
4. **Enjoy** better meal planning! 🍽️

---

**Questions?** Check the full documentation or run tests to verify everything works.

**Happy cooking!** 👨‍🍳👩‍🍳
