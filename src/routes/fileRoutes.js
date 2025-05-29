const express = require('express');
const multer = require('multer');
const fileController = require('../controllers/fileController.js');
const postController = require('../controllers/postController.js');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Rutas para archivos
router.post('/upload/icon', upload.single('file'), fileController.uploadFile);
router.post('/upload/post', upload.single('file'), postController.uploadFile);

module.exports = router; 