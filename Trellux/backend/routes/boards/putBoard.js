const express = require('express');
const router = express.Router();
const { getPool } = require('../../server');
const { authenticateToken } = require('../../middlewares/auth');

router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const pool = getPool();
    const userId = req.user.id;
    const boardId = req.params.id;
    const { title, position } = req.body;

    const [boardRows] = await pool.execute(
      `SELECT b.* FROM board b
       JOIN project p ON b.project_id = p.id
       WHERE b.id = ? AND p.user_id = ?`,
      [boardId, userId]
    );

    if (boardRows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Board non trouvé ou vous n'y avez pas accès"
      });
    }

    const updates = [];
    const values = [];

    if (title !== undefined) {
      updates.push('title = ?');
      values.push(title);
    }

    if (position !== undefined) {
      updates.push('position = ?');
      values.push(position);
    }

    if (updates.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Aucune donnée à mettre à jour"
      });
    }

    values.push(boardId);

    await pool.execute(
      `UPDATE board SET ${updates.join(', ')} WHERE id = ?`,
      values
    );

    return res.json({
      success: true,
      message: 'Board mis à jour avec succès'
    });

  } catch (err) {
    console.error('[!] Erreur PUT /boards/:id', err);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur : ' + err.message
    });
  }
});

module.exports = router;
