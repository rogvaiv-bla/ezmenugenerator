# v3.1 Bug Fix Testing Guide

## How to Test the Fixes

### Issue #1: PDF Export Corruption

**Step 1: Navigate to Shopping List Tab**
1. Open the application
2. Click "🛒 Lista de Cumpărături" tab
3. Add some items (they should contain Romanian characters like ă, â, ș, etc.)
   - Example: "Banane", "Mere", "Brânză", "Ciocolată"

**Step 2: Export Shopping List PDF**
1. Scroll to the bottom of Shopping List tab
2. Click "📥 Export to PDF"
3. A PDF file will download: `lista-cumparaturi-YYYY-MM-DD.pdf`

**Step 3: Verify Content**
- Open the PDF in any reader (Adobe, browser, etc.)
- **Expected:** Text should be readable ASCII (ă→a, â→a, etc.)
- **Expected:** No corrupted characters like "Ø>Ýl", "=ÞÒ", spaces between letters
- **Format:** Courier/monospace font used consistently

---

**Step 4: Test Menu PDF Export**
1. Click "📅 Menu Săptămânal" tab
2. Generate or view a menu (should show recipe names with Romanian characters)
3. Scroll down and click "Export Menu to PDF"
4. File downloads: `meniu-YYYY-MM-DD.pdf`

**Step 5: Verify Menu PDF**
- Open and check formatting
- **Expected:** Recipe names readable (not corrupted)
- **Expected:** Ingredient lists clear and complete
- **Expected:** Courier font throughout

---

**Step 6: Test Calendar PDF Export**
1. Click "📆 Calendar" tab
2. Add some planned recipes to dates
3. Click "Export Calendar to PDF" button (if visible)
4. File downloads: `calendar-plan.pdf`

**Step 5: Verify Calendar PDF**
- **Expected:** Dates and recipe names readable
- **Expected:** Proper formatting with Courier font

---

### Issue #2: Header Button Overlap

**Step 1: Desktop View (1200px+ width)**
1. Open the application in desktop browser
2. Look at top-right corner
3. You should see:
   - Language selector (🇷🇴 Română / 🇬🇧 English / 🇫🇷 Français)
   - Login button (👤 Login)
4. **Expected:** Buttons are side-by-side with clear spacing
5. **Expected:** NO overlapping text
6. **Expected:** Both clickable and easily distinguishable

**Step 2: Tablet View (768px width)**
1. Resize browser to tablet width (768px)
2. Check header buttons
3. **Expected:** Still properly spaced
4. **Expected:** Text visible and not cut off

**Step 3: Mobile View (375px width)**
1. Resize to mobile width or open on phone
2. **Expected:** Buttons properly arranged
3. **Expected:** White background header bar visible
4. **Expected:** No overlap between elements

---

## What Changed

### PDF Export Functions
Three functions now use Courier font with comprehensive character cleaning:

```javascript
// All three functions now:
1. Set font explicitly: doc.setFont('courier', 'bold');
2. Clean all text: cleanText(variableName)
3. Support 28+ special character conversions
```

### Header CSS
```css
#headerBar {
    left: 0;              /* NEW - spans full width */
    right: 0;             /* proper spacing */
    width: 100%;          /* NEW - explicit full width */
    justify-content: flex-end;  /* NEW - proper alignment */
    box-sizing: border-box;     /* NEW - padding included in width */
}
```

---

## Expected Behavior

### ✅ What Should Work Now

| Feature | Before | After |
|---------|--------|-------|
| PDF Shopping List | Corrupted chars | Clean ASCII text |
| PDF Menu | Garbled recipe names | Readable recipe names |
| PDF Calendar | Broken dates | Proper date format |
| Header Buttons | Overlapping | Spaced correctly |
| Romanian chars | ș→garbage | ș→s in PDFs |
| Font consistency | Mixed | Courier throughout |

---

## Troubleshooting

### If PDFs Still Show Corrupted Text
1. **Clear browser cache** - Ctrl+Shift+Delete (Windows) or Cmd+Shift+Delete (Mac)
2. **Hard refresh page** - Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)
3. **Check PDF viewer** - Try opening in different PDF reader
4. **Check browser console** - Press F12, look for errors in console tab

### If Header Buttons Still Overlap
1. **Clear cache** - Browser caches CSS, old styles might be loaded
2. **Hard refresh** - Force reload with Cmd/Ctrl+Shift+R
3. **Check responsive design** - Resize window while watching header
4. **Test in different browser** - Verify issue isn't browser-specific

---

## Files Modified

- `frontend/index.html`
  - Lines 1080-1098: Header CSS fix
  - Lines 2797-2930: Shopping List PDF export
  - Lines 2692-2795: Menu PDF export  
  - Lines 3206-3276: Calendar PDF export

---

## Performance Impact

✅ No performance degradation
- Character replacement is instant
- Font switching has negligible impact
- CSS changes are minimal

---

## Browser Compatibility

Tested/Compatible with:
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

**Questions or Issues?**
Check the browser console (F12) for error messages
Review the fix summary in BUG_FIX_SUMMARY_v3.1.md

