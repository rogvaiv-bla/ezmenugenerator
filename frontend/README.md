# Dieta Menu Planner - Frontend Documentation

## Overview

Dieta Menu Planner este o aplicație web responsivă pentru planificarea meniurilor zilnice cu filtrare după preferințe dietetice, alocări și alergii.

## Features

### 1. **Menu Generation** (Tab 1)
- Generează meniuri aleatorii pentru 7 zile
- Evită repetarea rețetelor din meniul anterior
- Afișează ingredientele necesare
- Exportă meniu complet în PDF

### 2. **Shopping List** (Tab 2)
- Adaugă articole după categorie
- Controlul cantității cu +/-
- **Auto-sort**: Articolele necifrate se mută automat sus
- Salvare în localStorage și Redis pentru sincronizare multi-device
- Funcția de share - generează URL unic pentru lista partajată
- Exportare în PDF
- Sincronizare automată: PULL la 5 secunde, PUSH la 30 secunde

### 3. **User Profile** (Tab 3)
- **Autentificare**: Register/Login cu JWT
- **Preferințe dietetice**: 4 tipuri (Balanced, Vegetarian, Vegan, Keto)
- **Alergii**: Adaugă/Elimină alocări personalizate
- **Limbă**: Selectare între Română, Engleză, Franceză
- Salvare profil pe server (Redis)

### 4. **Import Recipes** (Tab 4)
- Importă rețete din CSV (format: `Nume,Ingrediente,Proteina`)
- Preview primele 3 rețete înainte de import
- Salvare în localStorage
- Integrare automată în meniu

### 5. **Analytics** (Tab 5)
- Urmărire utilizare rețete
- Afișare Top 5 rețete populare
- Statistici proteice totale
- Buton de resetare

### 6. **Calendar Planner** (Tab 6)
- Navigare calendar month/month
- Selectare zile și asignare rețete
- Afișare zile planificate cu rețete
- Exportare calendar în PDF
- Ștergere planuri

## Technology Stack

- **HTML5/CSS3** - Responsive design
- **Vanilla JavaScript** - No framework dependencies
- **localStorage** - Client-side data storage
- **jsPDF** (CDN) - PDF generation
- **Fetch API** - Backend communication
- **JWT Tokens** - Authentication (Base64 encoded)

## File Structure

```
frontend/
├── index.html          # Main SPA application (3178 lines)
├── index.html.backup   # Backup
├── index.html.bak      # Previous version
└── index.html.bak2     # Another backup
```

## Installation & Setup

### Local Development

1. **Clone/Download** the project
2. **Open** `frontend/index.html` in a web browser
3. **Backend URL**: Configure in code (default: `https://dieta-api.vercel.app`)

### Backend Required Endpoints

```
POST   /api/auth/register         - Register new user
POST   /api/auth/login            - Login
GET    /api/auth/me               - Get current user
GET    /api/recipes               - Get all recipes
GET    /api/shopping-list         - Get shopping list
POST   /api/shopping-list         - Save shopping list
GET    /api/user/preferences      - Get user preferences
PUT    /api/user/preferences      - Update preferences
```

See [API_DOCUMENTATION.md](../API_DOCUMENTATION.md) for complete API spec.

## Usage

### Generate Menu

1. Click **Tab 1 - Meniu**
2. Click **Generează Meniu Aleator**
3. View ingredients required
4. Click **Exportă Meniu PDF** to download

### Manage Shopping List

1. Click **Tab 2 - Cumpărături**
2. Select category and add items
3. Mark items as purchased (checkbox)
4. Items automatically sort (unchecked on top)
5. Click **Exportă Cumpărături PDF** or **Share** link

### User Profile & Preferences

1. Click **Login/Register** button
2. Enter email & password
3. Navigate to **Tab 3 - Profil**
4. Select diet type:
   - **Balanced** - All recipes
   - **Vegetarian** - No meat
   - **Vegan** - No animal products
   - **Keto** - Low carb focus
5. Add allergies (e.g., "gluten", "lactose")
6. Select language (RO/EN/FR)
7. Click **Salvează Preferințe**

### Import Recipes from CSV

1. Click **Tab 4 - Import Rețete**
2. Choose CSV file with format:
   ```
   Nume,Ingrediente,Proteina
   Pui Copt,pui|brânză|sare,35g
   Salată,roșii|castraveți|ulei,5g
   ```
3. Review preview (first 3)
4. Click **Importă Rețete**
5. Recipes integrate into menu generation

### View Analytics

1. Click **Tab 5 - Analize**
2. See **Top 5 Rețete** (most used)
3. View total protein statistics
4. Click **Resetează Statistici** to clear

### Plan with Calendar

1. Click **Tab 6 - Calendar**
2. Use **← Luna Anterioară** / **Luna Următoare →** to navigate
3. Click a date to select
4. Choose recipe and click **Adaugă**
5. View planned days below
6. Click **📄 Export Calendar PDF** to download
7. Click **🗑️ Șterge Planuri** to clear all

## Responsive Breakpoints

```css
Mobile:  max-width: 480px
Tablet:  max-width: 768px
Desktop: max-width: 100% (2-column layout)
```

## Accessibility Features

- ✅ Title attributes on all buttons
- ✅ ARIA labels on form inputs
- ✅ Keyboard navigation support (Tab, Enter)
- ✅ Semantic HTML structure
- ✅ Color contrast meets WCAG AA standards
- ✅ Proper heading hierarchy

## Data Storage

### localStorage
```javascript
{
  "sessionId": "xyz...",
  "authToken": "base64encoded...",
  "userEmail": "user@example.com",
  "userPreferences": { dietType, allergies, language },
  "shoppingList": { categories: {} },
  "csvRecipes": [ ... ],
  "recipeUsageStats": { recipeName: count },
  "calendarPlans": { "2026-02-15": [ recipes ] },
  "lastSyncTime": 1234567890
}
```

### Redis (Server-side)
```
user:{userId} -> { email, preferences, passwordHash }
shopping-list:{sessionId} -> { items, lastUpdated }
```

## API Authentication

All protected endpoints require:
```
Authorization: Bearer <TOKEN>
```

Token format: Base64 encoded JSON
```json
{
  "userId": "uuid",
  "email": "user@example.com",
  "exp": 1234567890
}
```

## Multilingual Support

Supported languages:
- 🇷🇴 **Română** (default)
- 🇬🇧 **English**
- 🇫🇷 **Français**

Language preference saved in `userPreferences.language`

## Performance Optimization

- ✅ Single HTML file (no build step required)
- ✅ CDN loaded jsPDF (lightweight)
- ✅ Lazy loading of tabs
- ✅ Efficient DOM manipulation
- ✅ localStorage caching
- ✅ Automatic sync intervals (5s pull, 30s push)

## Browser Support

- Chrome/Chromium 60+
- Firefox 55+
- Safari 11+
- Edge 79+

## Known Limitations

- localStorage has 5-10MB limit per domain
- CSV import limited to pipe-separated ingredients
- Calendar only supports single recipes per day initially
- PDFs generated client-side (requires jsPDF)

## Debugging

Open browser DevTools (F12) for console logs:
```
[SYNC UP] ✓ Shopping list saved
[PULL] → Fetching from server
[SYNC DOWN] ✓ Data updated from server!
```

## Future Enhancements

- [ ] Meal prep suggestions
- [ ] Nutritional calculator
- [ ] Recipe ratings/reviews
- [ ] Social sharing
- [ ] Barcode scanner for shopping
- [ ] Voice commands
- [ ] Offline mode with service workers
- [ ] Multi-user collaboration

## Security Notes

⚠️ **Development Mode**
- JWT tokens use Base64 (not cryptographically signed)
- Passwords hashed with PBKDF2 on server
- Use HTTPS in production
- Never commit API keys to version control

## Support & Contributing

For issues or feature requests, contact the development team.

## License

All rights reserved. 2026.
