const express               = require('express');
const router                = express.Router();
const { getPool }           = require('../../server');
const { authenticateToken } = require('../../middlewares/auth')

async function addProject(userId, title) {
    try {
        const pool      = getPool();
        const [result]  = await pool.execute(
            'INSERT INTO project(title, user_id) VALUES (?, ?)',
            [title, userId]
        );
        return result;
    } catch(err) {
        console.error("[!] Database error (addProject):", err);
        throw err;
    }
}

router.post('/', authenticateToken, async (req, res) => {
    try {
        const { title } = req.body;
        
        if (!title) {
            return res.status(400).json({
                success: false,
                message: 'Champs manquants'
            });
        }

        const result = await addProject(req.user.id, title);
        
        res.json({
            success: true,
            projectId: result.insertId,
            message: 'Project created successfully'
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to create project: ' + err.message
        });
    }
});

module.exports = router;