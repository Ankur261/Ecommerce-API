const express = require('express') ;
const productController = require('../controller/productController')

const router = express.Router() ;

router.get('/', productController.productList) ;
router.post('/create', productController.createProduct) ;
router.delete('/:id', productController.deleteProduct) ;
router.post('/:id/update_quantity/', productController.updateQuantity);

module.exports = router ;