// In-memory storage for shopping lists (in production, use a database)
const shoppingListStore = {};

export default function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method === 'POST') {
        const { sessionId, data } = req.body;
        
        if (!sessionId || !data) {
            return res.status(400).json({ 
                error: 'Missing sessionId or data' 
            });
        }

        try {
            // Store the shopping list with timestamp
            shoppingListStore[sessionId] = {
                data,
                lastUpdated: new Date().toISOString()
            };

            return res.status(200).json({ 
                success: true, 
                message: 'Shopping list saved',
                sessionId 
            });
        } catch (error) {
            return res.status(500).json({ 
                error: 'Failed to save shopping list',
                details: error.message 
            });
        }
    }

    if (req.method === 'GET') {
        const { sessionId } = req.query;
        
        if (!sessionId) {
            return res.status(400).json({ 
                error: 'Missing sessionId' 
            });
        }

        const stored = shoppingListStore[sessionId];
        if (!stored) {
            return res.status(404).json({ 
                error: 'Shopping list not found' 
            });
        }

        return res.status(200).json(stored);
    }

    res.status(405).json({ error: 'Method not allowed' });
}
