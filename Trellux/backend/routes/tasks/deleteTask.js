const express = require('express');
const router = express.Router();
const { getPool } = require('../../server'); 
const { authenticateToken } = require('../../middlewares/auth');

router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const pool = getPool();
        
        const [result] = await pool.execute(
            'DELETE FROM todo WHERE id = ? AND user_id = ?',
            [req.params.id, req.user.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Todo not found or unauthorized'
            });
        }

        res.json({ success: true, message: 'Todo deleted successfully' });
    } catch (err) {
        console.error('[!] Erreur DELETE /todos/:id', err);
        res.status(500).json({
            success: false,
            message: 'Failed to delete todo: ' + err.message
        });
    }
});

router.get('/', authenticateToken, async (req, res) => {
    try {
        const pool = getPool();
        const [rows] = await pool.execute('SELECT * FROM todo');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch todos' });
    }
});


module.exports = router;

