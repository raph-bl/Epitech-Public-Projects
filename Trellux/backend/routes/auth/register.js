const express       = require('express');
const router        = express.Router();
const { getPool }   = require('../../server'); 
const bcrypt        = require('bcryptjs');

async function addUser(email, password, name, firstname) {
    try {
        const pool      = getPool();
        const salt      = await bcrypt.genSalt(10);
        const secPass   = await bcrypt.hash(password, salt); 

        const [result] = await pool.execute(
            'INSERT INTO user (email, password, name, firstname) VALUES (?, ?, ?, ?)',
            [email, secPass, name, firstname]
        );
        return result;
    } catch (err) {
        console.log("[!] Database error: ", err);
        throw err;
    }
}

router.post('/register', async (req, res) => {
    try {
        console.log('[*] Requête register reçue:', req.body);
        
        const { email, password, name, firstname } = req.body;
        
        if (!email || !password || !name || !firstname) {
            return res.status(400).json({ 
                success: false,
                message: 'Tous les champs sont requis' 
            });
        }
        
        const result = await addUser(email, password, name, firstname);
        
        return res.json({
            success: true,
            userId: result.insertId,
            message: 'User registered successfully'
        });
    } catch (err) {
        console.error('[!] Register error:', err);
        
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ 
                success: false,
                message: 'Cet email est déjà utilisé' 
            });
        }
        
        return res.status(500).json({ 
            success: false,
            message: 'Failed to register user: ' + err.message
        });
    }
});

module.exports = router;