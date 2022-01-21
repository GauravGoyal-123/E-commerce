const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const {productValidation,isLoggedIn,isSeller,isProductAuthor} = require('../middleware');
const {showAllProduct, createProduct, showProduct, editProductForm, updateProduct, deleteProduct, productForm} = require('../controllers/product');

router.route('/')
    .get(showAllProduct)
    .post(isLoggedIn,isSeller,productValidation, createProduct)

router.get('/new',isLoggedIn,isSeller, productForm)

router.route('/:id')
    .get(showProduct)
    .patch(isLoggedIn,isProductAuthor,productValidation, updateProduct)
    .delete(isLoggedIn,isProductAuthor,deleteProduct)

router.get('/:id/edit',isLoggedIn,isProductAuthor, editProductForm)

module.exports = router;