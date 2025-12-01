// routes/tasks/getTasksByProject.js
const express = require('express');
const router = express.Router();
const { getPool } = require('../../server');
const { authenticateToken } = require('../../middlewares/auth');

router.get('/project/:projectId', authenticateToken, async (req, res) => {
  try {
    const pool = getPool();
    const userId = req.user.id;
    const projectId = req.params.projectId;
    
    // Vérifier que le projet appartient à l'utilisateur
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
    
    // Récupérer les tâches du projet
    const [todoRows] = await pool.execute(
      'SELECT * FROM todo WHERE project_id = ? ORDER BY created_at DESC', 
      [projectId]
    );
    
    return res.json({
      success: true,
      todos: todoRows,
      project: projectRows[0]
    });
    
  } catch (err) {
    console.error('[!] Erreur GET /tasks/project/:projectId', err);
    res.status(500).json({ 
      success: false, 
      message: 'Erreur serveur : ' + err.message 
    });
  }
});

module.exports = router;