const express = require('express');
const router = express.Router();
const productController = require('../../controller/productController')

router.post('/addproducts', productController.createproduct);
router.get('/fetch-all-products',productController.fetchAllfilteredProduct)

module.exports = router;