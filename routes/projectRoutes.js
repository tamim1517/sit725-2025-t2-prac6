const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

router.get('/api/projects', projectController.getAllProjects);

router.get('/add', projectController.addNumbers);

module.exports = router;
