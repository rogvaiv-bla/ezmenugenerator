# API Endpoints

## Menu Generation

**Endpoint**: `GET /api/menu`

Generates a random 7-day weekly menu respecting:
- Protein frequency limits
- No duplicate recipes in the same week
- Balanced meal planning

**Response**:
```json
{
  "1": "Pui copt cu cartofi la cuptor și legume",
  "2": "Somon la cuptor cu legume",
  "3": "Paste Carbonara",
  "4": "Cotlet de pui la cuptor cu orez",
  "5": "Peste alb la cuptor cu lămâie",
  "6": "Ciorba de legume cu orez",
  "7": "Pui cu smântână și ciuperci"
}
```

## Recipes List

**Endpoint**: `GET /api/recipes`

Returns the complete list of available recipes with ingredients.

**Response**:
```json
[
  {
    "Nume": "Pui copt cu cartofi la cuptor și legume",
    "Ingrediente": ["🍗 pui", "🥔 cartofi", "🥕 morcovi", "🥦 broccoli", "🫒 ulei", "🧄 usturoi"],
    "Proteina": "carne de pasare"
  },
  ...
]
```

## Protein Frequency Limits

The menu generator ensures balanced nutrition:
- 🥩 **Carne roșie**: max 1 meal/week
- 🍗 **Carne de pasare**: max 2 meals/week  
- 🐟 **Pește**: max 2 meals/week
- 🥚 **Ouă**: max 5 meals/week
- 🥩 **Mezeluri**: max 0.5 meals/week
- 🫘 **Legume uscate**: max 2 meals/week

## Local Testing

```bash
# Start dev server
npm run dev

# Test endpoints
curl http://localhost:3000/api/menu
curl http://localhost:3000/api/recipes
```
