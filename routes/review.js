const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const Review = require('../models/review');
const {reviewValidation,isLoggedIn} = require('../middleware');
const { createReview,deleteReview } = require('../controllers/review');

router.post('/:id/review',isLoggedIn,reviewValidation,createReview);

router.delete('/:id/review/:id_review',isLoggedIn,deleteReview);

module.exports = router;