const express = require('express');
const productController = require('../controllers/product')

const router = express.Router();

router.get('/', productController.getAllProducts);
router.post('/addProduct', productController.addProduct);
router.delete('/delete/:productId',productController.deleteProduct);
router.get('/:productId', productController.getProductDetails);
router.put('/updateproduct/:productId',productController.updateProduct);



module.exports = router;