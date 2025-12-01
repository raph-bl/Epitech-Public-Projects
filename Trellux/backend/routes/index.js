const express = require('express');
const router = express.Router();

// Auth routes
router.use('/auth', require('./auth/register'));
router.use('/auth', require('./auth/login'));
router.use('/auth', require('./auth/logout'));

// Todo routes
router.use('/todos', require('./tasks/getTask'));
router.use('/todos', require('./tasks/postTask'));
router.use('/todos', require('./tasks/putTask'));
router.use('/todos', require('./tasks/deleteTask'));
router.use('/todos', require('./tasks/getTasksByProject'));

// User routes
router.use('/users', require('./users/getUser'));
router.use('/users', require('./users/getUserTasks'));
router.use('/users', require('./users/putUser'));
router.use('/users', require('./users/deleteUser'));

// Project routes
router.use('/projects', require('./projects/getAllProjects'));
router.use('/projects', require('./projects/postProject'));
router.use('/projects', require('./projects/getProject'));
router.use('/projects', require('./projects/putProject'));
router.use('/projects', require('./projects/deleteProject'));

// Board routes
router.use('/boards', require('./boards/getBoardsByProject'));
router.use('/boards', require('./boards/postBoard'));
router.use('/boards', require('./boards/putBoard'));
router.use('/boards', require('./boards/deleteBoard'));

module.exports = router;
