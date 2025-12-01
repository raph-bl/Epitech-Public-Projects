const express = require('express');
const router = express.Router();
const { getPool, generateToken } = require('../../server');
const bcrypt = require('bcryptjs')

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email et mot de passe requis'
            });
        }

        const pool = getPool();
        const [rows] = await pool.execute(
            'SELECT * FROM user WHERE email = ?',
            [email]
        );

        if (rows.length === 0) {
            return res.status(401).json({
                success: false,
                message: 'Email ou mot de passe incorrect'
            });
        }

        const user = rows[0];

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Email ou mot de passe incorrect'
            });
        }

        const token = generateToken(user);

        res.cookie('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: 24 * 60 * 60 * 1000 // 24h
        });

        return res.json({
            success: true,
            userId: user.id,
            message: 'Connexion réussie',
            user: {
                id: user.id,
                email: user.email,
                firstname: user.firstname,
                name: user.name
            }
        });

    } catch (err) {
        console.error('[!] Login error:', err);
        return res.status(500).json({
            success: false,
            message: 'Erreur serveur lors de la connexion'
        });
    }
});

module.exports = router;