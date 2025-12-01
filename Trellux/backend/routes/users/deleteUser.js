// routes/userdelete.js
const express = require('express');
const router = express.Router();
const { getPool } = require('../../server'); 
const { authenticateToken } = require('../../middlewares/auth');

router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const pool = getPool();
        const userId = req.user.id;

        const [existingUser] = await pool.execute(
            'SELECT * FROM user WHERE id = ?',
            [userId]
        );

        if (existingUser.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Utilisateur introuvable'
            });
        }

        await pool.execute(
            'DELETE FROM user WHERE id = ?',
            [userId]
        );

        console.log(`[*] Utilisateur ${userId} supprimé avec succès`);
        return res.json({
            success: true,
            message: 'Utilisateur supprimé avec succès'
        });
    } catch (err) {
        console.error('[!] Erreur DELETE /userdelete/:id:', err);
        return res.status(500).json({
            success: false,
            message: 'Erreur serveur: ' + err.message
        });
    }
});

module.exports = router;
