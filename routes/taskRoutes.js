const express = require('express');
const { handleTaskCreation } = require('../controllers/taskController');

const router = express.Router();

router.post('/task', handleTaskCreation);

module.exports = router;
