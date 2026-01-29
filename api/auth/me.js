import redis from 'redis';

let client = null;

async function getRedisClient() {
    if (client && client.isOpen) {
        return client;
    }
    
    try {
        const redisUrl = process.env.STORAGE_REDIS_URL;
        if (!redisUrl) {
            return null;
        }
        
        client = redis.createClient({ url: redisUrl });
        
        client.on('error', (err) => {
            console.error('[REDIS ERROR]', err.message);
            client = null;
        });
        
        await client.connect();
        return client;
    } catch (error) {
        console.error('[REDIS] Failed to create client:', error.message);
        return null;
    }
}

// Decodez token
function decodeToken(token) {
    try {
        const payload = JSON.parse(Buffer.from(token, 'base64').toString('utf-8'));
        if (payload.exp < Date.now()) {
            return null; // Token expirat
        }
        return payload;
    } catch (error) {
        return null;
    }
}

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Token necesar' });
    }

    const token = authHeader.substring(7);

    try {
        const redisClient = await getRedisClient();
        if (!redisClient) {
            return res.status(500).json({ error: 'Serviciu indisponibil' });
        }

        // Decodez și verific token
        const payload = decodeToken(token);
        if (!payload) {
            return res.status(401).json({ error: 'Token invalid sau expirat' });
        }

        const userId = await redisClient.get(`token:${token}`);
        if (!userId) {
            return res.status(401).json({ error: 'Token invalid' });
        }

        // Obțin datele utilizatorului
        const userData = await redisClient.get(`user:${userId}`);
        if (!userData) {
            return res.status(404).json({ error: 'Utilizator nu găsit' });
        }

        const user = JSON.parse(userData);

        res.status(200).json({
            success: true,
            userId: user.userId,
            email: user.email,
            preferences: user.preferences,
            createdAt: user.createdAt
        });

    } catch (error) {
        console.error('[ME ERROR]', error.message);
        res.status(500).json({ error: 'Eroare server' });
    }
}
