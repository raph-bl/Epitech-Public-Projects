const express = require('express');
const router = express.Router();
const { getPool } = require('../../server');
const { authenticateToken } = require('../../middlewares/auth');

router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const pool = getPool();
    const userId = req.user.id;
    const boardId = req.params.id;

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

    await pool.execute('DELETE FROM board WHERE id = ?', [boardId]);

    return res.json({
      success: true,
      message: 'Board supprimé avec succès'
    });

  } catch (err) {
    console.error('[!] Erreur DELETE /boards/:id', err);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur : ' + err.message
    });
  }
});

module.exports = router;
