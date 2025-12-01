
const express = require('express');
const router = express.Router();
const { getPool } = require('../../server');
const { authenticateToken } = require('../../middlewares/auth');
const bcrypt = require('bcryptjs');

router.put('/:id', authenticateToken, async (req, res) => {
    try {
        const pool = getPool();
        const userId = req.user.id;
        const { email, name, firstname, password } = req.body;

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

        const updates = [];
        const values = [];

        if (email !== undefined && email !== null) {
            updates.push('email = ?');
            values.push(email);
        }
        if (name !== undefined && name !== null) {
            updates.push('name = ?');
            values.push(name);
        }
        if (firstname !== undefined && firstname !== null) {
            updates.push('firstname = ?');
            values.push(firstname);
        }
        if (password !== undefined && password !== null && password !== '') {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            updates.push('password = ?');
            values.push(hashedPassword);
        }

        if (updates.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Aucun champ à mettre à jour'
            });
        }

        values.push(userId);

        // console.log(updates);
        // console.log(values);

        await pool.execute(
            `UPDATE user SET ${updates.join(', ')} WHERE id = ?`,
            values
        );

        // console.log(`${userId} maj`);
        return res.json({
            success: true,
            message: '[*] Utilisateur mis à jour avec succès'
        });
    } catch (err) {
        console.error('[!] Erreur PUT /userupdate/:id:', err);
        return res.status(500).json({
            success: false,
            message: 'Erreur serveur: ' + err.message
        });
    }
});

module.exports = router;
