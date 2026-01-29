import redis from 'redis';
import crypto from 'crypto';

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

// Verific parolă
function verifyPassword(password, hashedPassword) {
    const [salt, hash] = hashedPassword.split(':');
    const passwordHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return passwordHash === hash;
}

// Generez token JWT simplu
function generateToken(userId, email) {
    const payload = {
        userId,
        email,
        iat: Date.now(),
        exp: Date.now() + 30 * 24 * 60 * 60 * 1000 // 30 zile
    };
    return Buffer.from(JSON.stringify(payload)).toString('base64');
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email și parolă sunt obligatorii' });
    }

    try {
        const redisClient = await getRedisClient();
        if (!redisClient) {
            return res.status(500).json({ error: 'Serviciu indisponibil' });
        }

        // Caut utilizatorul după email
        const userId = await redisClient.get(`user:email:${email}`);
        if (!userId) {
            return res.status(401).json({ error: 'Email sau parolă incorectă' });
        }

        // Obțin datele utilizatorului
        const userData = await redisClient.get(`user:${userId}`);
        if (!userData) {
            return res.status(401).json({ error: 'Utilizator nu găsit' });
        }

        const user = JSON.parse(userData);

        // Verific parola
        if (!verifyPassword(password, user.password)) {
            return res.status(401).json({ error: 'Email sau parolă incorectă' });
        }

        // Generez token
        const token = generateToken(userId, email);
        await redisClient.set(`token:${token}`, userId, { EX: 30 * 24 * 60 * 60 });

        res.status(200).json({
            success: true,
            userId,
            token,
            email,
            preferences: user.preferences,
            message: 'Logat cu succes'
        });

    } catch (error) {
        console.error('[LOGIN ERROR]', error.message);
        res.status(500).json({ error: 'Eroare server' });
    }
}
