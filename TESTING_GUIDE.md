# 🧪 Testing Guide - Dieta Menu Planner

## Quick Test Checklist

### Tab 1: Menu Generation ✅
```
1. Click "Menu" tab
2. Click "Generează Meniu Aleator"
3. ✓ Should show 7 days of recipes
4. ✓ Each day has ingredients listed
5. ✓ Click another recipe to see different menu
6. ✓ Space key generates new menu (shortcut)
7. Click "Exportă Meniu PDF" - should download PDF
```

### Tab 2: Shopping List ✅
```
1. Click "Shopping" tab
2. Select category from dropdown
3. Type product name
4. Click "➕ Adaugă"
5. ✓ Item appears in category
6. Checkbox = mark purchased
7. ✓ Unchecked items should move to TOP (auto-sort)
8. Click "×" to delete
9. ✓ 5-second undo popup appears
10. Click "📄 Exportă Cumpărături PDF" - download
11. Click "🔗 Share" - should generate URL
```

### Tab 3: User Profile ✅
**First, Register:**
```
1. Click "Login" button (top-right)
2. Click "Register" mode
3. Enter valid email (test@example.com)
4. Enter password (6+ chars)
5. Click "Înregistrare"
6. ✓ Should show "Conectat!" message
7. Click "Profil" tab
```

**Then, Update Preferences:**
```
1. Select diet type:
   - Try "Vegetarian"
2. Add allergy:
   - Type "gluten"
   - Click "➕ Adaugă"
   - ✓ Should appear in list
3. Remove allergy:
   - Click "×" next to gluten
   - ✓ Should disappear
4. Change language to "English"
5. Click "Salvează Preferințe"
6. ✓ Should show "Preferințe salvate!"
7. Generate menu - should NOT include meat
```

### Tab 4: CSV Import ✅
```
1. Create test CSV file with content:
   ---
   Nume,Ingrediente,Proteina
   Orez cu Pui,orez|pui|sare,28g
   Salată Cesar,brânză|pâine|dressing,15g
   Paste Carbonara,paste|ouă|bacon,24g
   ---

2. Click "Import" tab
3. Click file input
4. Select CSV file
5. ✓ Preview shows first 3 recipes
6. Click "Importă Rețete"
7. ✓ Should show "Rețete importate!"
8. Generate menu - new recipes should appear
```

### Tab 5: Analytics ✅
```
1. Click "Analytics" tab
2. ✓ Initially might be empty (first time)
3. Generate menu multiple times
4. ✓ Top 5 recipes should update
5. ✓ Total protein count increases
6. View stats
7. Click "Resetează Statistici"
8. ✓ Data cleared
```

### Tab 6: Calendar ✅
```
1. Click "Calendar" tab
2. Click "Luna Următoare →"
3. ✓ Month changes
4. Click "← Luna Anterioară"
5. ✓ Month changes back
6. Click any date in calendar
7. ✓ Dropdown appears with recipes
8. Select recipe and click "Adaugă"
9. ✓ Date highlights in light blue
10. ✓ Recipe appears in "Zile Planificate:" list
11. Click "×" to remove recipe
12. ✓ Removed from plan
13. Click "📄 Export Calendar PDF"
14. ✓ PDF downloads with all plans
15. Click "🗑️ Șterge Planuri"
16. ✓ Confirm dialog appears
17. ✓ All plans cleared
```

### Multi-Device Sync ✅
```
1. Add shopping item on device A
2. Wait 5 seconds
3. Open app on device B (same URL)
4. ✓ Item appears automatically
5. Delete item on device B
6. Wait 5 seconds
7. ✓ Item gone on device A too
```

### Language Switching ✅
```
1. Go to Profile tab
2. Select "English"
3. Click "Salvează Preferințe"
4. ✓ All UI changes to English
5. Try "Français"
6. ✓ All UI in French
7. Back to "Română"
8. ✓ All UI in Romanian
```

### PDF Export ✅
```
1. Generate menu
2. Click "Exportă Meniu PDF"
3. ✓ File downloads as "meniu.pdf"
4. Open PDF - should have:
   - Title, date, user info
   - 7 days with recipes & ingredients

5. Add shopping items
6. Click "Exportă Cumpărături PDF"
7. ✓ File downloads as "cumparaturi.pdf"
8. Open PDF - should have:
   - Categories with checkboxes
   - Items in each category

9. Plan calendar
10. Click "Export Calendar PDF"
11. ✓ File downloads as "calendar-plan.pdf"
12. Open PDF - should have:
    - All planned dates
    - Recipes for each date
```

---

## Browser DevTools Testing

### Check Console (F12 → Console)
```javascript
// Should see sync logs:
[SYNC UP] ✓ Shopping list saved
[PULL] → Fetching from server
[SYNC DOWN] ✓ Data updated from server!

// No errors should appear
// All logs should show success (✓)
```

### Check localStorage (F12 → Application → localStorage)
```javascript
Keys should include:
- sessionId: "..."
- authToken: "base64encoded..."
- userEmail: "..."
- userPreferences: {...}
- shoppingList: {...}
- csvRecipes: [...]
- recipeUsageStats: {...}
- calendarPlans: {...}
- lastSyncTime: 1234567890
- categoryStates: {...}
```

### Check Network (F12 → Network)
```
When you interact, should see:
GET  /api/shopping-list?sessionId=...
POST /api/shopping-list
GET  /api/auth/me
PUT  /api/user/preferences
POST /api/auth/login
POST /api/auth/register

All should return 200 OK
```

---

## Edge Cases to Test

### 1. Mobile Responsiveness
- [ ] Test on iPhone (375px width)
- [ ] Test on iPad (768px width)
- [ ] Test on Android phone
- [ ] Test on desktop (1920px)
- [ ] All tabs should be readable
- [ ] Buttons should be touch-friendly
- [ ] No horizontal scrolling

### 2. Authentication
- [ ] Register with invalid email - should fail
- [ ] Register with short password - should fail
- [ ] Login with wrong password - should fail
- [ ] Login then refresh page - should stay logged in
- [ ] Click Logout - should clear token
- [ ] Try accessing Profile without login - should redirect

### 3. Shopping List
- [ ] Add 10+ items - should handle
- [ ] Items in multiple categories
- [ ] Check/uncheck multiple items
- [ ] Delete all items - clear list
- [ ] Share link - open in different browser

### 4. Menu Generation
- [ ] Generate 5+ menus - no duplicates
- [ ] Menu respects diet type
- [ ] Menu respects allergies
- [ ] PDF has all ingredients
- [ ] Ingredients deduplicated

### 5. Calendar
- [ ] Add recipe to past date
- [ ] Add recipe to future date (2+ years)
- [ ] Add multiple recipes per day
- [ ] Export with 30+ days planned
- [ ] Clear plans multiple times

---

## Performance Testing

### Load Time
```
1. Open DevTools (F12)
2. Network tab
3. Reload page
4. Check "DOMContentLoaded": should be < 2s
5. Check "Finish": should be < 2s
```

### Generation Speed
```
1. Open DevTools (F12)
2. Open Console
3. Click "Generate Menu"
4. Should complete in < 1 second
```

### Sync Speed
```
1. Add shopping item
2. Check Network tab
3. POST should complete in < 100ms
```

---

## Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| PDF not downloading | Check browser's download settings |
| Sync not working | Check network connection, clear localStorage |
| Login fails | Verify email format, check password length |
| CSV import fails | Verify format: `Name,Ingredients,Protein` |
| Calendar not saving | Enable localStorage in browser settings |
| Language not changing | Clear localStorage and refresh |
| Menu has repeated recipes | This shouldn't happen - report bug |

---

## Test Report Template

```
Date: ___________
Tester: ___________
Browser: ___________
Device: ___________ (mobile/tablet/desktop)
OS: ___________

Features Tested:
[ ] Menu Generation
[ ] Shopping List
[ ] User Profile
[ ] CSV Import
[ ] Analytics
[ ] Calendar
[ ] Multi-device Sync
[ ] Language Switching
[ ] PDF Export
[ ] Accessibility (keyboard nav)

Issues Found:
1. ___________
2. ___________

Overall Status: ✅ PASS / ❌ FAIL
```

---

## Production Checklist

Before deploying:
- [ ] All 6 tabs functional
- [ ] No console errors (F12)
- [ ] Login/register working
- [ ] Shopping list syncing
- [ ] PDF exports generate properly
- [ ] Calendar saves to localStorage
- [ ] CSV import working
- [ ] Analytics tracking recipes
- [ ] Mobile responsive on 375px
- [ ] All buttons have title attributes
- [ ] Keyboard navigation works (Tab key)
- [ ] HTTPS in production

---

## Automated Testing (Optional)

Can add testing frameworks later:
- **Jest** - Unit tests
- **Cypress** - E2E tests
- **Lighthouse** - Accessibility/performance

Example test:
```javascript
test('Menu generates without errors', () => {
  generateMenu();
  const menu = document.getElementById('menu-content');
  expect(menu.textContent).toContain('Ziua 1');
});
```

---

**Happy Testing!** 🧪✨
