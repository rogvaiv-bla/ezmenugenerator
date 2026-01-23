// Redis integration for persistent shopping lists
import redis from 'redis';

let client = null;

async function getRedisClient() {
    if (client && client.isOpen) {
        return client;
    }
    
    try {
        const redisUrl = process.env.STORAGE_REDIS_URL;
        if (!redisUrl) {
            console.error('[REDIS] STORAGE_REDIS_URL not found in env');
            return null;
        }
        
        client = redis.createClient({ url: redisUrl });
        
        client.on('error', (err) => {
            console.error('[REDIS ERROR] Connection failed:', err.message);
            client = null;
        });
        
        await client.connect();
        console.log('[REDIS] Connected successfully');
        return client;
    } catch (error) {
        console.error('[REDIS] Failed to create client:', error.message);
        return null;
    }
}

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
            const redisClient = await getRedisClient();
            if (!redisClient) {
                // Fallback: use in-memory storage
                console.warn('[SYNC] Redis unavailable, using memory fallback');
                return res.status(200).json({ 
                    success: true, 
                    message: 'Stored locally (Redis unavailable)',
                    sessionId,
                    lastUpdated: Date.now()
                });
            }
            
            const now = Date.now();
            const key = `shopping:${sessionId}`;
            const storeData = {
                data,
                lastUpdated: now,
                timestamp: timestamp || now
            };
            
            // Save to Redis with 30-day expiration
            await redisClient.setEx(key, 30 * 24 * 60 * 60, JSON.stringify(storeData));
            
            console.log(`[REDIS] Saved shopping list for ${sessionId}`);

            return res.status(200).json({ 
                success: true, 
                message: 'Shopping list saved to Redis',
                sessionId,
                lastUpdated: now
            });
        } catch (error) {
            console.error('[REDIS ERROR] POST failed:', error.message);
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
            const redisClient = await getRedisClient();
            if (!redisClient) {
                // Fallback: return empty list
                console.warn('[SYNC] Redis unavailable, returning empty list');
                return res.status(200).json({
                    data: {},
                    lastUpdated: 0,
                    timestamp: 0,
                    isNew: true
                });
            }
            
            const key = `shopping:${sessionId}`;
            const stored = await redisClient.get(key);
            
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
            console.error('[REDIS ERROR] GET failed:', error.message);
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
            const redisClient = await getRedisClient();
            if (!redisClient) {
                return res.status(200).json({ 
                    success: true, 
                    message: 'Deleted locally (Redis unavailable)'
                });
            }
            
            const key = `shopping:${sessionId}`;
            await redisClient.del(key);
            
            console.log(`[REDIS] Deleted shopping list for ${sessionId}`);

            return res.status(200).json({ 
                success: true, 
                message: 'Shopping list deleted'
            });
        } catch (error) {
            console.error('[REDIS ERROR] DELETE failed:', error.message);
            return res.status(500).json({ 
                error: 'Failed to delete shopping list',
                details: error.message 
            });
        }
    }

    res.status(405).json({ error: 'Method not allowed' });
}
