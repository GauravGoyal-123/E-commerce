const express = require('express');
const Product = require('../models/product');
const User = require('../models/user');
const router = express.Router();
const {isLoggedIn} = require('../middleware');
const {showCart, addToCart} = require('../controllers/cart');


router.get('/cart',isLoggedIn,showCart);

router.post('/:id/add',isLoggedIn,addToCart);

module.exports=router;