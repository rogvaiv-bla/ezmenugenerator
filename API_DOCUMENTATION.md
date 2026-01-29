# 🍽️ Ce Mănânc Azi? - API Documentation

## Overview

Ce Mănânc Azi? is a meal planning and shopping list management API. Generate personalized weekly menus, manage shopping lists, and track recipe preferences.

**Base URL**: `https://dieta-app.vercel.app/api`  
**Version**: 1.0.0

---

## Table of Contents

1. [Authentication](#authentication)
2. [Menu Generation](#menu-generation)
3. [Recipes](#recipes)
4. [Shopping List](#shopping-list)
5. [User Profiles](#user-profiles)
6. [Preferences](#preferences)
7. [Error Codes](#error-codes)

---

## Authentication

### Register User

**Endpoint**: `POST /auth/register`

Create a new user account.

**Request**:
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response** (Status 201):
```json
{
  "success": true,
  "userId": "abc123def456",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "email": "user@example.com",
  "message": "Cont creat cu succes"
}
```

**Error** (Status 400):
```json
{
  "error": "Email-ul este deja înregistrat"
}
```

---

### Login

**Endpoint**: `POST /auth/login`

Authenticate and receive JWT token.

**Request**:
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response** (Status 200):
```json
{
  "success": true,
  "userId": "abc123def456",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "email": "user@example.com",
  "preferences": {
    "dietType": "vegetarian",
    "allergies": ["peanuts", "dairy"],
    "restrictions": [],
    "language": "ro"
  }
}
```

---

### Get Current User

**Endpoint**: `GET /auth/me`

**Headers**:
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

**Response** (Status 200):
```json
{
  "success": true,
  "userId": "abc123def456",
  "email": "user@example.com",
  "preferences": {
    "dietType": "balanced",
    "allergies": [],
    "restrictions": [],
    "language": "ro"
  },
  "createdAt": "2026-01-29T10:30:00Z"
}
```

---

## Menu Generation

### Generate Weekly Menu

**Endpoint**: `GET /menu`

Generates a 7-day menu respecting user preferences, dietary restrictions, and protein balance.

**Query Parameters** (Optional):
| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `dietType` | string | Dietary preference | `balanced`, `vegetarian`, `vegan`, `keto` |
| `allergies` | string | Comma-separated allergens | `peanuts,dairy` |
| `excludeRecipes` | string | Recipe names to skip | `Pasta Carbonara,Somon` |

**Response** (Status 200):
```json
{
  "1": "Pui copt cu cartofi la cuptor și legume",
  "2": "Somon la cuptor cu legume",
  "3": "Ciorba de legume cu orez",
  "4": "Cotlet de pui la cuptor cu orez",
  "5": "Peste alb la cuptor cu lămâie",
  "6": "Paste Carbonara",
  "7": "Pui cu smântână și ciuperci"
}
```

**Error** (No recipes match preferences):
```json
{
  "error": "Nu sunt rețete disponibile pentru preferințele tale"
}
```

---

## Recipes

### Get All Recipes

**Endpoint**: `GET /recipes`

Retrieve all available recipes.

**Response** (Status 200):
```json
[
  {
    "Nume": "Pui copt cu cartofi la cuptor și legume",
    "Ingrediente": ["🍗 pui", "🥔 cartofi", "🥕 morcovi", "🥦 broccoli"],
    "Proteina": "carne de pasare"
  },
  {
    "Nume": "Somon la cuptor cu legume",
    "Ingrediente": ["🐟 somon", "🥕 morcovi", "🌿 mărar"],
    "Proteina": "pește"
  }
]
```

---

## Shopping List

### Get Shopping List

**Endpoint**: `GET /shopping-list`

Retrieve the user's shopping list (synced across devices via Redis).

**Query Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| `sessionId` | string | Unique session identifier |

**Response** (Status 200):
```json
{
  "data": {
    "🥬 Legume / Fructe": {
      "Banane 🍌": { "checked": false, "quantity": 2 },
      "Roșii 🍅": { "checked": true, "quantity": 1 }
    },
    "🥛 Lactate": {
      "Lapte 🥛": { "checked": false, "quantity": 1 }
    }
  },
  "lastUpdated": 1706517000000,
  "sessionId": "sess_abc123"
}
```

---

### Update Shopping List

**Endpoint**: `POST /shopping-list`

Add or modify items in the shopping list.

**Request**:
```json
{
  "sessionId": "sess_abc123",
  "data": {
    "🥬 Legume / Fructe": {
      "Morcovi 🥕": { "checked": false, "quantity": 1 }
    }
  },
  "timestamp": 1706517000000
}
```

**Response** (Status 200):
```json
{
  "success": true,
  "lastUpdated": 1706517000000,
  "message": "Lista actualizată cu succes"
}
```

---

## User Preferences

### Get User Preferences

**Endpoint**: `GET /user/preferences`

**Headers**:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response** (Status 200):
```json
{
  "success": true,
  "preferences": {
    "dietType": "vegetarian",
    "allergies": ["gluten", "dairy"],
    "restrictions": ["low-carb"],
    "language": "en"
  }
}
```

---

### Update User Preferences

**Endpoint**: `PUT /user/preferences`

**Headers**:
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

**Request**:
```json
{
  "dietType": "vegan",
  "allergies": ["gluten", "soy"],
  "restrictions": ["low-sugar"],
  "language": "ro"
}
```

**Response** (Status 200):
```json
{
  "success": true,
  "preferences": {
    "dietType": "vegan",
    "allergies": ["gluten", "soy"],
    "restrictions": ["low-sugar"],
    "language": "ro"
  },
  "message": "Preferințele au fost salvate cu succes!"
}
```

---

## Error Codes

| Code | Status | Meaning |
|------|--------|---------|
| 200 | OK | Request successful |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Invalid parameters or missing required fields |
| 401 | Unauthorized | Missing or invalid authentication token |
| 404 | Not Found | Resource not found |
| 409 | Conflict | Resource already exists (e.g., email registered) |
| 405 | Method Not Allowed | HTTP method not supported for this endpoint |
| 500 | Server Error | Internal server error |

---

## Rate Limiting

No rate limiting currently implemented. 

**Planned for v2.0**:
- 1000 requests per hour per IP
- 10000 requests per day per authenticated user

---

## Examples

### Complete Workflow

```bash
# 1. Register
curl -X POST https://dieta-app.vercel.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"Pass123"}'

# Response:
# {
#   "token": "eyJhbGciOi...",
#   "userId": "user_123"
# }

# 2. Get current user
curl -X GET https://dieta-app.vercel.app/api/auth/me \
  -H "Authorization: Bearer eyJhbGciOi..."

# 3. Update preferences
curl -X PUT https://dieta-app.vercel.app/api/user/preferences \
  -H "Authorization: Bearer eyJhbGciOi..." \
  -H "Content-Type: application/json" \
  -d '{"dietType":"vegetarian","allergies":["peanuts"]}'

# 4. Generate menu
curl -X GET https://dieta-app.vercel.app/api/recipes

# 5. Manage shopping list
curl -X GET https://dieta-app.vercel.app/api/shopping-list?sessionId=sess_123
```

---

## Support

For issues, feature requests, or questions:

**GitHub**: https://github.com/yourusername/dieta  
**Email**: support@dieta-app.com  
**Issues**: https://github.com/yourusername/dieta/issues

---

## Version History

### v1.0.0 (2026-01-29)
- ✅ Authentication (register, login, JWT)
- ✅ Menu generation with filters
- ✅ Recipe database
- ✅ Shopping list management
- ✅ User preferences
- ✅ Multi-language support (RO, EN, FR)
- ✅ Dietary restrictions (vegetarian, vegan, keto)
- ✅ Allergen tracking
- ✅ Redis-based persistence

### v2.0.0 (Planned)
- 🔄 Advanced calendar planning
- 🔄 Recipe ratings and reviews
- 🔄 Nutritional information
- 🔄 Cost estimation
- 🔄 Mobile app (iOS/Android)
- 🔄 Rate limiting
- 🔄 Webhooks
