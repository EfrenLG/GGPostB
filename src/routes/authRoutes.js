const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

//POST
router.post('/check', authController.check);
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router; 