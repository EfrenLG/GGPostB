const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//GET
router.get('/:username', userController.getUserController);

// PUT
router.put('/icon', userController.updateUserIcon);

module.exports = router; 