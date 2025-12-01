const express = require("express");
const router = express.Router();
const { getPool } = require('../../server');
const { authenticateToken } = require('../../middlewares/auth'); 

async function getUserById(userId){
    try {
        const {getPool} = require('../../server');
        const pool = getPool();

        const [rows] = await pool.execute(
            'SELECT id, email, password, name, firstname, created_at FROM user WHERE id = ?',
            [userId]
        );
        return rows;

    }
    catch (err) {
        console.error("[!] Database error:", err);
        throw err;
    }
}

router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        console.log(`[*] Requête GET /user/${userId} reçue`);

        const rows = await getUserById(userId);

        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Utilisateur introuvable"
            });
        }

        return res.json({
            success: true,
            user: rows[0]
        });
    } catch (err) {
        console.error('[!] Erreur GET /user/:id:', err);

        return res.status(500).json({
            success: false,
            message: 'Erreur serveur: ' + err.message
        });
    }
});

module.exports = router;
