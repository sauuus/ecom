const express = require('express');
const cartController = require('../controllers/cart')

const router = express.Router();

router.get('/', cartController.getAllCart);
router.post('/', cartController.addToCart);

module.exports = router;