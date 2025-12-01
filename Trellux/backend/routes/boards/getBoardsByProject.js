const express = require('express');
const router = express.Router();
const { getPool } = require('../../server');
const { authenticateToken } = require('../../middlewares/auth');

router.get('/project/:projectId', authenticateToken, async (req, res) => {
  try {
    const pool = getPool();
    const userId = req.user.id;
    const projectId = req.params.projectId;

    const [projectRows] = await pool.execute(
      'SELECT * FROM project WHERE id = ? AND user_id = ?',
      [projectId, userId]
    );

    if (projectRows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Projet non trouvé ou vous n'y avez pas accès"
      });
    }

    const [boardRows] = await pool.execute(
      'SELECT * FROM board WHERE project_id = ? ORDER BY position ASC, created_at ASC',
      [projectId]
    );

    const boardsWithTodos = await Promise.all(
      boardRows.map(async (board) => {
        const [todoRows] = await pool.execute(
          'SELECT * FROM todo WHERE board_id = ? ORDER BY created_at DESC',
          [board.id]
        );

        return {
          ...board,
          todos: todoRows
        };
      })
    );

    return res.json({
      success: true,
      boards: boardsWithTodos,
      project: projectRows[0]
    });

  } catch (err) {
    console.error('[!] Erreur GET /boards/project/:projectId', err);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur : ' + err.message
    });
  }
});

module.exports = router;
