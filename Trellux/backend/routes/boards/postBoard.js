const express = require('express');
const router = express.Router();
const { getPool } = require('../../server');
const { authenticateToken } = require('../../middlewares/auth');

router.post('/', authenticateToken, async (req, res) => {
  try {
    const pool = getPool();
    const userId = req.user.id;
    const { project_id, title, position } = req.body;

    if (!project_id || !title) {
      return res.status(400).json({
        success: false,
        message: "Champs requis manquants : project_id et title"
      });
    }

    const [projectRows] = await pool.execute(
      'SELECT * FROM project WHERE id = ? AND user_id = ?',
      [project_id, userId]
    );

    if (projectRows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Projet non trouvé ou vous n'y avez pas accès"
      });
    }

    let boardPosition = position;
    if (boardPosition === undefined || boardPosition === null) {
      const [maxPositionRows] = await pool.execute(
        'SELECT COALESCE(MAX(position), -1) as maxPos FROM board WHERE project_id = ?',
        [project_id]
      );
      boardPosition = maxPositionRows[0].maxPos + 1;
    }

    const [result] = await pool.execute(
      'INSERT INTO board (project_id, title, position) VALUES (?, ?, ?)',
      [project_id, title, boardPosition]
    );

    return res.json({
      success: true,
      boardId: result.insertId,
      message: 'Board créé avec succès'
    });

  } catch (err) {
    console.error('[!] Erreur POST /boards', err);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur : ' + err.message
    });
  }
});

module.exports = router;
