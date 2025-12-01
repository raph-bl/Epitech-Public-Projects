const express = require('express');
const router = express.Router();
const { getPool } = require('../../server'); 
const { authenticateToken } = require('../../middlewares/auth');

router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const pool = getPool();
        const [rows] = await pool.execute('SELECT * FROM todo WHERE id = ?', [req.params.id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch todo' });
    }
});

module.exports = router;