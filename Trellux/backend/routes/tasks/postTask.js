const express = require('express');
const router = express.Router();
const { getPool } = require('../../server'); 
const { authenticateToken } = require('../../middlewares/auth');

async function addTodo(userId, title, description, dueTime, status, projectId, boardId, priority = 'normal') {
    try {
        const pool = getPool();
        const [result] = await pool.execute(
            'INSERT INTO todo(title, description, due_time, status, user_id, project_id, board_id, priority) VALUES(?, ?, ?, ?, ?, ?, ?, ?)',
            [title, description || '', dueTime || null, status || 'not started', userId, projectId || null, boardId || null, priority]
        );
        return result;
    } catch (err) {
        console.error("[!] Database error (addTodo):", err);
        throw err;
    }
}

router.post('/', authenticateToken, async (req, res) => {
    try {
        const { userId, title, description, dueTime, status, project_id, board_id, priority } = req.body;
        console.log('POST /todos - Body:', { userId, title, description, dueTime, status, project_id, board_id, priority });

        if (!title || !dueTime) {
            return res.status(400).json({
                success: false,
                message: "Champs requis manquants : userId, title, ou dueTime."
            });
        }

        const result = await addTodo(req.user.id, title, description, dueTime, status, project_id, board_id, priority);

        res.json({
            success: true,
            todoId: result.insertId,
            message: 'Todo created successfully'
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to create todo: ' + err.message
        });
    }
});
module.exports = router;
