const express = require('express');
const router = express.Router();
const { getPool } = require('../../server'); 
const { authenticateToken } = require('../../middlewares/auth');

router.put('/:id', authenticateToken, async (req, res) => {
    const id = Number(req.params.id);
    const { title, description, dueTime, status, priority } = req.body;

    console.log('[*] PUT /todos/:id - ID:', id);
    console.log('[*] PUT /todos/:id - Body:', { title, description, dueTime, status, priority });

    if (!title && !description && !dueTime && !status && !priority) {
        return res.status(400).json({
            success: false,
            message: 'No fields to update'
        });
    }

    try {
        const pool = getPool();

        const updates = [];
        const values = [];

        if (title !== undefined) {
            updates.push('title = ?');
            values.push(title);
        }
        if (description !== undefined) {
            updates.push('description = ?');
            values.push(description);
        }
        if (dueTime !== undefined) {
            updates.push('due_time = ?');
            values.push(dueTime);
        }
        if (status !== undefined) {
            updates.push('status = ?');
            values.push(status);
        }
        if (priority !== undefined) {
            updates.push('priority = ?');
            values.push(priority);
        }

        values.push(id);

        const [result] = await pool.execute(
            `UPDATE todo SET ${updates.join(', ')} WHERE id = ?`,
            values
        );

        console.log('[*] Update result:', result);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Todo not found'
            });
        }

        res.json({
            success: true,
            message: 'Todo updated successfully'
        });
    } catch (err) {
        console.error('[!] Erreur PUT /todos/:id', err);
        res.status(500).json({
            success: false,
            message: 'Failed to update todo: ' + err.message
        });
    }
});

module.exports = router;
