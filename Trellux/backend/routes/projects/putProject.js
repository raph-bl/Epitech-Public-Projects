const express = require('express');
const router = express.Router();
const { getPool } = require('../../server');
const { authenticateToken } = require('../../middlewares/auth');

router.put('/:id', authenticateToken, async (req, res) => {
    const projectId = Number(req.params.id);
    const userId = req.user.id;
    const { title, image, due_time } = req.body;

    if (!title && !image && !due_time) {
        return res.status(400).json({
            success: false,
            message: 'No fields to update'
        });
    }

    try {
        const pool = getPool();

        const [projectRows] = await pool.execute(
            'SELECT * FROM project WHERE id = ? AND user_id = ?',
            [projectId, userId]
        );

        if (projectRows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Projet non trouv� ou vous n'y avez pas acc�s"
            });
        }

        const updates = [];
        const values = [];

        if (title !== undefined) {
            updates.push('title = ?');
            values.push(title);
        }
        if (image !== undefined) {
            updates.push('image = ?');
            values.push(image);
        }
        if (due_time !== undefined) {
            updates.push('due_time = ?');
            values.push(due_time);
        }

        values.push(projectId);

        const [result] = await pool.execute(
            `UPDATE project SET ${updates.join(', ')} WHERE id = ?`,
            values
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }

        res.json({
            success: true,
            message: 'Project updated successfully'
        });
    } catch (err) {
        console.error('[!] Erreur PUT /projects/:id', err);
        res.status(500).json({
            success: false,
            message: 'Failed to update project: ' + err.message
        });
    }
});

module.exports = router;
