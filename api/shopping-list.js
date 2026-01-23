// Redis integration for persistent shopping lists
import { kv } from '@vercel/kv';

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method === 'POST') {
        const { sessionId, data, timestamp } = req.body;
        
        if (!sessionId || !data) {
            return res.status(400).json({ 
                error: 'Missing sessionId or data' 
            });
        }

        try {
            const now = Date.now();
            
            // Save current state to Redis with undo history
            const key = `shopping:${sessionId}`;
            const storeData = {
                data,
                lastUpdated: now,
                timestamp: timestamp || now
            };
            
            // Save to Redis with 30-day expiration
            await kv.setex(key, 30 * 24 * 60 * 60, JSON.stringify(storeData));
            
            console.log(`[REDIS] Saved shopping list for ${sessionId}`);

            return res.status(200).json({ 
                success: true, 
                message: 'Shopping list saved to Redis',
                sessionId,
                lastUpdated: now
            });
        } catch (error) {
            console.error('[REDIS ERROR]', error.message);
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

        try {
            const key = `shopping:${sessionId}`;
            const stored = await kv.get(key);
            
            if (!stored) {
                // Return empty list if not found (first time)
                return res.status(200).json({
                    data: {},
                    lastUpdated: 0,
                    timestamp: 0,
                    isNew: true
                });
            }

            const parsed = typeof stored === 'string' ? JSON.parse(stored) : stored;
            
            console.log(`[REDIS] Retrieved shopping list for ${sessionId}`);

            return res.status(200).json({
                data: parsed.data,
                lastUpdated: parsed.lastUpdated,
                timestamp: parsed.timestamp
            });
        } catch (error) {
            console.error('[REDIS ERROR]', error.message);
            return res.status(500).json({ 
                error: 'Failed to retrieve shopping list',
                details: error.message 
            });
        }
    }

    if (req.method === 'DELETE') {
        const { sessionId } = req.body;
        
        if (!sessionId) {
            return res.status(400).json({ 
                error: 'Missing sessionId' 
            });
        }

        try {
            const key = `shopping:${sessionId}`;
            await kv.del(key);
            
            console.log(`[REDIS] Deleted shopping list for ${sessionId}`);

            return res.status(200).json({ 
                success: true, 
                message: 'Shopping list deleted'
            });
        } catch (error) {
            console.error('[REDIS ERROR]', error.message);
            return res.status(500).json({ 
                error: 'Failed to delete shopping list',
                details: error.message 
            });
        }
    }

    res.status(405).json({ error: 'Method not allowed' });
}
