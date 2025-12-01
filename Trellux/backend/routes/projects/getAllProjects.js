const express       = require('express');
const router        = express.Router();
const { getPool }   = require('../../server');
const { authenticateToken } = require('../../middlewares/auth');

router.get('/', authenticateToken, async(req, res) => {
    try {
        const pool      = getPool();
        const [rows] = await pool.execute(
            'SELECT * FROM project WHERE user_id = ?',
            [req.user.id]
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch projects' });
    }
});

module.exports = router;