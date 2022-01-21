const Product = require('../models/product');
const Review = require('../models/review');

module.exports.createReview=async(req,res)=>{
    console.log(req.body);
    try{
        const {id} = req.params;
        const {rating,comment} = req.body;
        const product = await Product.findById(id);
        const review = new Review({rating,comment});

        const newAverageRating = ((product.avgRating * product.reviews.length) + parseInt(rating)) / (product.reviews.length + 1);
        product.avgRating = parseFloat(newAverageRating.toFixed(1));

        product.reviews.push(review);
    
        await review.save();
        await product.save();
        req.flash('success',"Added your review successfully!!"); 
        res.redirect(`/products/${id}`);
    }
    catch(e){
        res.render('error',{err:e.message});
    }
};

module.exports.deleteReview=async(req,res)=>{
    try{
        const {id} = req.params;
        const {id_review} = req.params;
        await Review.findByIdAndDelete(id_review);
        req.flash('success',"Your review is deleted successfully!!"); 
        res.redirect(`/products/${id}`);
    }
    
    catch(e){
        res.render('error',{err:e.message});
    }
}