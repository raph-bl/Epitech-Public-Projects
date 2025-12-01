const express   = require('express');
const router    = express.Router();
const { getPool } = require('../../server'); 
const { authenticateToken } = require('../../middlewares/auth');

router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const pool = getPool();
        const { id } = req.params;
        const userId = req.user.id;

        const [result] = await pool.execute(
            'DELETE FROM project WHERE id = ? AND user_id = ?', [id, userId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Project not found or unauthorized.' });
        }

        res.status(200).json({ message: 'Project deleted successfully.' });
    } catch(err) {
        console.error('[!] Delete project error:', err);
        res.status(500).json({ message: '[!] Failed to delete project.' });
    }
});

module.exports = router;