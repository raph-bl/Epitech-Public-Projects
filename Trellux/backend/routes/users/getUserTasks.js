const express = require('express');
const router = express.Router();
const { getPool } = require('../../server'); 
const { authenticateToken } = require('../../middlewares/auth');

router.get('/user/:userId', authenticateToken, async (req, res) => {
  try {
    const pool = getPool();
    const userId = req.user.id;

    
    const [userRows] = await pool.execute('SELECT * FROM user WHERE id = ?', [userId]);
    if (userRows.length === 0) {
      return res.status(404).json({ success: false, message: "Utilisateur non trouvé" });
    }

    
    const [todoRows] = await pool.execute('SELECT * FROM todo WHERE user_id = ?', [userId]);

    return res.json({
      success: true,
      todos: todoRows
    });

  } catch (err) {
    console.error('[!] Erreur GET /todo/user/:userId', err);
    res.status(500).json({ success: false, message: 'Erreur serveur : ' + err.message });
  }
});

module.exports = router;
