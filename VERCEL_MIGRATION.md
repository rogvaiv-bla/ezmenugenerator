# Vercel Migration Guide

Your project has been successfully migrated from Netlify to Vercel! Here's what changed:

## What's New

### 1. **vercel.json** - New Vercel Configuration
- Replaces `netlify.toml`
- Configures API routes rewriting
- Sets up headers for API responses
- Configures environment variables

### 2. **api/** Directory - API Routes
- `api/menu.js` - Generates weekly menu (replaces Netlify function)
- `api/recipes.js` - Returns list of recipes (replaces Netlify function)
- Uses Node.js/JavaScript for serverless functions (Vercel standard)

### 3. **Frontend Updates**
- Updated API endpoints from `/.netlify/functions/*` to `/api/*`
- Works seamlessly with Vercel's API routing

### 4. **package.json Updates**
- Added build and dev scripts
- Added Vercel CLI as dev dependency

## Removed Files
- `netlify.toml` - No longer needed
- `netlify/functions/` - Replaced by `api/` directory
- `backend/app.py` - Replaced by serverless functions

Note: The Flask backend (`backend/app.py`) is not needed anymore since all functionality has been moved to serverless functions.

## Deployment Steps

1. **Install Vercel CLI (optional for local development)**:
   ```bash
   npm install -g vercel
   ```

2. **Connect to Vercel**:
   - Push your code to GitHub/GitLab/Bitbucket
   - Go to https://vercel.com and sign up
   - Import your repository
   - Vercel will auto-detect the configuration from `vercel.json`
   - Click Deploy!

3. **Local Development (optional)**:
   ```bash
   npm install
   npm run dev
   ```
   This starts a local Vercel environment on `http://localhost:3000`

## Project Structure for Vercel

```
project-root/
├── api/                    # API routes (serverless functions)
│   ├── menu.js            # Menu generation endpoint
│   └── recipes.js         # Recipes list endpoint
├── frontend/              # Static files (published directory)
│   ├── index.html
│   └── ...
├── vercel.json            # Vercel configuration
├── package.json
└── README.md
```

## Key Differences from Netlify

| Feature | Netlify | Vercel |
|---------|---------|--------|
| Config File | netlify.toml | vercel.json |
| Functions Dir | netlify/functions | api/ |
| Function Format | Netlify format | Standard Node.js |
| Rewrites Syntax | Different | Different |
| Environment Vars | .env file | Project settings |

## Notes

- All recipes are now embedded directly in the serverless functions
- No external file reading needed (data files moved to code)
- The menu generation algorithm remains the same
- The frontend is served as static files from the `frontend/` directory

## Support

If you encounter any issues:
1. Check Vercel's dashboard for deployment logs
2. Verify that `vercel.json` is in your project root
3. Ensure `api/` directory contains your functions
4. Check that `frontend/` contains your HTML files

Happy hosting! 🚀
