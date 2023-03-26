const express = require('express');
const uploadController = require('../controllers/upload');
const upload = require('../utils/upload');

const router = express.Router();

router.get('/', uploadController.getAllImages);
router.post('/', upload.single('image'), uploadController.uploadImage);

module.exports = router;