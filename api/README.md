# API Endpoints

## 1. Menu Generation

**Endpoint**: `GET /api/v1/menu`

Generates a random 7-day weekly menu respecting:
- Protein frequency limits
- No duplicate recipes in the same week
- Balanced meal planning

**Headers**:
```
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json
```

**Query Parameters**:
| Parametru | Tip | Descriere | Exemplu |
|-----------|-----|-----------|---------|
| `restrictions` | string | Restricții dietare (csv) | `?restrictions=vegan,nut-allergy` |
| `excludeRecipes` | string | Rețete de exclus (csv) | `?excludeRecipes=recipe1,recipe2` |
| `cache` | boolean | Folosire cache | `?cache=true` |

**Response** (Status 200):
```json
{
  "1": "Pui copt cu cartofi la cuptor și legume",
  "2": "Somon la cuptor cu legume",
  "3": "Paste Carbonara",
  "4": "Cotlet de pui la cuptor cu orez",
  "5": "Peste alb la cuptor cu lămâie",
  "6": "Ciorba de legume cu orez",
  "7": "Pui cu smântână și ciuperci",
  "cacheExpiry": "2026-01-24T10:30:00Z",
  "cacheTTL": 3600
}
```

**Error Responses**:
```json
// 400 Bad Request
{
  "error": "Invalid restriction parameter",
  "message": "Restricția 'invalid' nu este suportată"
}
```

```json
// 401 Unauthorized
{
  "error": "Missing or invalid API key"
}
```

```json
// 500 Internal Server Error
{
  "error": "Failed to generate menu",
  "message": "Eroare la procesarea rețetelor"
}
```

---

## 2. Filtrare după Restricții Dietare

**Endpoint**: `GET /api/v1/menu?restrictions=vegan&restrictions=gluten-free`

Suportă restricții dietare predefinite:
- `vegan` - fără produse de origine animală
- `vegetarian` - fără carne
- `gluten-free` - fără gluten
- `dairy-free` - fără lactate
- `nut-allergy` - fără alune/fructe cu coajă
- `keto` - dietă ketogenă

**Response**:
```json
{
  "1": "Salată cu tofu și legume",
  "2": "Somon la cuptor (gluten-free)",
  "restrictions": ["vegan", "gluten-free"],
  "appliedFilters": true
}
```

---

## 3. Shopping List (Lista de Cumpărături)

**Endpoint**: `GET /api/v1/shopping-list`

Returns all ingredients needed for the weekly menu with quantities.

**Query Parameters**:
| Parametru | Tip | Descriere |
|-----------|-----|-----------|
| `week` | number | Săptămâna pentru care să genereze lista |
| `format` | string | `json` sau `csv` |

**Response** (Status 200):
```json
{
  "ingredients": [
    {
      "name": "pui",
      "quantity": 1.5,
      "unit": "kg",
      "emoji": "🍗",
      "estimatedPrice": "€8.50"
    },
    {
      "name": "somon",
      "quantity": 400,
      "unit": "g",
      "emoji": "🐟",
      "estimatedPrice": "€12.00"
    },
    {
      "name": "cartofi",
      "quantity": 2,
      "unit": "kg",
      "emoji": "🥔",
      "estimatedPrice": "€2.50"
    }
  ],
  "totalEstimatedCost": "€45.50",
  "currency": "EUR",
  "generatedFor": "2026-01-23",
  "validUntil": "2026-01-30"
}
```

---

## 5. API Versioning

Endpoint-urile folosesc versioning pentru scalabilitate viitoare:

```
/api/v1/menu          → versiunea curentă
/api/v1/recipes       → versiunea curentă
/api/v1/shopping-list → versiunea curentă
```

**Beneficii**:
- Backward compatibility
- Deprecation path clar
- Migrație treptată pentru clienți

---

## 6. HTTP Status Codes

| Code | Descriere | Exemplu |
|------|-----------|---------|
| **200** | OK - Cerere reușită | Menu generat cu succes |
| **400** | Bad Request - Date invalide | Restricție nerecunoscută |
| **401** | Unauthorized - API Key lipsă/invalidă | Header Authorization absent |
| **404** | Not Found - Resursă inexistentă | Recipe ID inexistent |
| **429** | Too Many Requests - Rate limit depășit | Prea multe cereri în 1 minut |
| **500** | Internal Server Error - Eroare server | Eroare la procesarea datelor |
| **503** | Service Unavailable - Serviciu indisponibil | Database downtime |

---

## 7. Error Handling

Toate răspunsurile de eroare urmează structura standardizată:

```json
{
  "error": "ERROR_CODE",
  "message": "Descriere în limba română",
  "timestamp": "2026-01-23T10:30:00Z",
  "requestId": "req_12345abcde"
}
```

**Exemple de erori specifice**:

```json
// 400 - Invalid Filter
{
  "error": "INVALID_RESTRICTION",
  "message": "Restricția 'invalid' nu este suportată. Restricții valide: vegan, vegetarian, gluten-free, dairy-free, nut-allergy, keto",
  "timestamp": "2026-01-23T10:30:00Z",
  "requestId": "req_12345abcde"
}
```

```json
// 401 - Missing API Key
{
  "error": "UNAUTHORIZED",
  "message": "API Key lipsă. Adaugă header: Authorization: Bearer YOUR_API_KEY",
  "timestamp": "2026-01-23T10:30:00Z",
  "requestId": "req_12345abcde"
}
```

```json
// 429 - Rate Limit Exceeded
{
  "error": "RATE_LIMIT_EXCEEDED",
  "message": "Ai depășit limita de 100 cereri pe minut",
  "retryAfter": 60,
  "resetAt": "2026-01-23T10:31:00Z"
}
```

---

## 8. Validare Input - Parametri Query

**Reguli de validare**:

```javascript
// GET /api/v1/menu?restrictions=vegan&excludeRecipes=recipe1,recipe2&cache=true

// restrictions
✓ Tip: string (csv)
✓ Valori valide: vegan, vegetarian, gluten-free, dairy-free, nut-allergy, keto
✗ Exemplu invalid: ?restrictions=invalid_diet

// excludeRecipes
✓ Tip: string (csv cu recipe IDs)
✓ Max 10 recipe-uri
✗ Exemplu invalid: ?excludeRecipes=recipe1,recipe2,recipe3,...,recipe11

// cache
✓ Tip: boolean
✓ Valori: true, false
✗ Exemplu invalid: ?cache=maybe
```

**Cerere validă**:
```bash
curl "http://localhost:3000/api/v1/menu?restrictions=vegan,gluten-free&cache=true&excludeRecipes=recipe5,recipe10" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**Răspuns la validare eșuată** (400):
```json
{
  "error": "INVALID_PARAMETERS",
  "message": "Parametri invalizi în cerere",
  "details": [
    {
      "parameter": "restrictions",
      "value": "invalid_diet",
      "message": "Valoare nerecunoscută. Valide: vegan, vegetarian, gluten-free, dairy-free, nut-allergy, keto"
    },
    {
      "parameter": "excludeRecipes",
      "value": "recipe1,recipe2,...,recipe11",
      "message": "Maxim 10 recipe-uri pot fi excluse"
    }
  ]
}
```

---

## 9. Caching Strategy

Endpoint-ul `/api/v1/menu` implementează caching inteligent:

**Configurare**:
| Setare | Valoare | Descriere |
|--------|---------|-----------|
| **TTL Default** | 3600 sec (1 oră) | Timp de viață default cache |
| **Max Age** | 86400 sec (24 ore) | Timp maxim de cache |
| **Cache Key** | `menu:{restrictions}:{excludeRecipes}` | Cheie unică per combinație |
| **Cache Control** | `public, max-age=3600` | Header HTTP |

**Response Headers**:
```
Cache-Control: public, max-age=3600
ETag: "W/abc123def456"
Last-Modified: Wed, 23 Jan 2026 10:30:00 GMT
Expires: Wed, 23 Jan 2026 11:30:00 GMT
X-Cache: HIT (served from cache)
X-Cache-Age: 245 (cached 245 seconds ago)
```

**Invalidare Cache**:
```bash
# Forțează regenerare (bypass cache)
curl "http://localhost:3000/api/v1/menu?cache=false" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**Exemplu Response cu info cache**:
```json
{
  "menu": {
    "1": "Pui copt cu cartofi la cuptor și legume",
    "2": "Somon la cuptor cu legume",
    "3": "Paste Carbonara",
    "4": "Cotlet de pui la cuptor cu orez",
    "5": "Peste alb la cuptor cu lămâie",
    "6": "Ciorba de legume cu orez",
    "7": "Pui cu smântână și ciuperci"
  },
  "cache": {
    "hit": true,
    "age": 245,
    "expiresAt": "2026-01-23T11:30:00Z",
    "ttl": 3315
  }
}
```

---

## Recipes List

**Endpoint**: `GET /api/v1/recipes`

Returns the complete list of available recipes with ingredients and dietary information.

**Response**:
```json
[
  {
    "id": "recipe_001",
    "Nume": "Pui copt cu cartofi la cuptor și legume",
    "Ingrediente": ["🍗 pui", "🥔 cartofi", "🥕 morcovi", "🥦 broccoli", "🫒 ulei", "🧄 ață"],
    "Proteina": "carne de pasare",
    "Porcii": 4,
    "TimpPreparare": "45 min",
    "Dificultate": "ușor",
    "restrictii": ["vegetarian-friendly"]
  }
]
```

---

## Protein Frequency Limits

The menu generator ensures balanced nutrition:
- 🥩 **Carne roșie**: max 1 meal/week
- 🍗 **Carne de pasare**: max 2 meals/week  
- 🐟 **Pește**: max 2 meals/week
- 🥚 **Ouă**: max 5 meals/week
- 🥩 **Mezeluri**: max 0.5 meals/week
- 🫘 **Legume uscate**: max 2 meals/week

---

## Local Testing

```bash
# Start dev server
npm run dev

# Test Menu Generation
curl "http://localhost:3000/api/v1/menu" \
  -H "Authorization: Bearer test-key"

# Test with Restrictions
curl "http://localhost:3000/api/v1/menu?restrictions=vegan,gluten-free" \
  -H "Authorization: Bearer test-key"

# Test Shopping List
curl "http://localhost:3000/api/v1/shopping-list" \
  -H "Authorization: Bearer test-key"

# Test Recipes
curl "http://localhost:3000/api/v1/recipes" \
  -H "Authorization: Bearer test-key"
```

---

## Rate Limiting

API-ul implementează rate limiting pentru protecție:
- **Gratuit**: 100 cereri/minut
- **Premium**: 1000 cereri/minut
- **Enterprise**: unlimited

Headers de răspuns:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 87
X-RateLimit-Reset: 1705948260
```
