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
            return null;
        }
        return payload;
    } catch (error) {
        return null;
    }
}

async function getUserIdFromToken(redisClient, token) {
    const payload = decodeToken(token);
    if (!payload) return null;

    const userId = await redisClient.get(`token:${token}`);
    return userId;
}

export default async function handler(req, res) {
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

        const userId = await getUserIdFromToken(redisClient, token);
        if (!userId) {
            return res.status(401).json({ error: 'Token invalid sau expirat' });
        }

        if (req.method === 'GET') {
            // Obțin preferințele utilizatorului
            const userData = await redisClient.get(`user:${userId}`);
            if (!userData) {
                return res.status(404).json({ error: 'Utilizator nu găsit' });
            }

            const user = JSON.parse(userData);
            res.status(200).json({
                success: true,
                preferences: user.preferences
            });

        } else if (req.method === 'PUT') {
            // Actualizez preferințele
            const { dietType, allergies, restrictions, language } = req.body;

            // Validare
            const validDietTypes = ['balanced', 'vegetarian', 'vegan', 'keto'];
            if (dietType && !validDietTypes.includes(dietType)) {
                return res.status(400).json({ error: 'Tip de dietă invalid' });
            }

            const userData = await redisClient.get(`user:${userId}`);
            if (!userData) {
                return res.status(404).json({ error: 'Utilizator nu găsit' });
            }

            const user = JSON.parse(userData);

            // Actualizez preferințele
            if (dietType) user.preferences.dietType = dietType;
            if (allergies) user.preferences.allergies = allergies;
            if (restrictions) user.preferences.restrictions = restrictions;
            if (language) user.preferences.language = language;

            // Salvez în Redis
            await redisClient.set(
                `user:${userId}`,
                JSON.stringify(user),
                { EX: 30 * 24 * 60 * 60 }
            );

            res.status(200).json({
                success: true,
                preferences: user.preferences,
                message: 'Preferințe actualizate cu succes'
            });

        } else {
            res.status(405).json({ error: 'Method not allowed' });
        }

    } catch (error) {
        console.error('[PREFERENCES ERROR]', error.message);
        res.status(500).json({ error: 'Eroare server' });
    }
}
