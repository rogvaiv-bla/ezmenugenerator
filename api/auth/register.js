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

// Hash parolă cu salt
function hashPassword(password) {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return `${salt}:${hash}`;
}

// Verific parolă
function verifyPassword(password, hashedPassword) {
    const [salt, hash] = hashedPassword.split(':');
    const passwordHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return passwordHash === hash;
}

// Generez token JWT simplu (base64 encoded JSON)
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

    if (password.length < 6) {
        return res.status(400).json({ error: 'Parola trebuie să aibă cel puțin 6 caractere' });
    }

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        return res.status(400).json({ error: 'Email invalid' });
    }

    try {
        const redisClient = await getRedisClient();
        if (!redisClient) {
            return res.status(500).json({ error: 'Serviciu indisponibil' });
        }

        // Verific dacă utilizatorul deja există
        const existingUser = await redisClient.get(`user:email:${email}`);
        if (existingUser) {
            return res.status(409).json({ error: 'Email-ul este deja înregistrat' });
        }

        // Creez utilizator
        const userId = crypto.randomBytes(16).toString('hex');
        const hashedPassword = hashPassword(password);
        const token = generateToken(userId, email);

        // Salvez în Redis
        await redisClient.set(
            `user:${userId}`,
            JSON.stringify({
                userId,
                email,
                password: hashedPassword,
                createdAt: new Date().toISOString(),
                preferences: {
                    dietType: 'balanced', // balanced, vegetarian, vegan, keto
                    allergies: [],
                    restrictions: [],
                    language: 'ro'
                }
            }),
            { EX: 30 * 24 * 60 * 60 } // 30 zile
        );

        // Index pentru email
        await redisClient.set(`user:email:${email}`, userId, { EX: 30 * 24 * 60 * 60 });

        // Salvez token
        await redisClient.set(`token:${token}`, userId, { EX: 30 * 24 * 60 * 60 });

        res.status(201).json({
            success: true,
            userId,
            token,
            email,
            message: 'Cont creat cu succes'
        });

    } catch (error) {
        console.error('[REGISTER ERROR]', error.message);
        res.status(500).json({ error: 'Eroare server' });
    }
}
