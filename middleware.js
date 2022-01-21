const Product = require('./models/product');
const Review = require('./models/review');
const {productSchema,reviewSchema}=require('./schema');

module.exports.isLoggedIn=(req,res,next)=>{
    
    if(req.xhr && !req.isAuthenticated()){
        if(req.session.Url){
            delete req.session.Url;
        }
        res.flash('error','Please login to continue');
        return res.status(401).json({msg:"You need to login first!!"});
    }
    req.session.Url=req.originalUrl;
    if(!req.isAuthenticated()){
        req.flash('error','You need to login first');
        return res.redirect('/login');
    }
    next();
}

module.exports.productValidation=(req,res,next)=>{
    
    const {name,img,price,desc}=req.body;
    const {error}=productSchema.validate({name,img,price,desc});
    if(error){
        const msg = error.details.map((err)=>err.message).join(',');
        return res.render('error',{err:msg});
    }
    next();
}

module.exports.reviewValidation=(req,res,next)=>{
    const {rating,comment}=req.body;
    const {error}=reviewSchema.validate({rating,comment});
    if(error){
        const msg=error.details.map((err)=>err.message).join(',');
        return res.render('error',{err:msg});
    }
    next();
}


module.exports.isSeller=(req,res,next)=>{
    if(!(req.user.role && req.user.role==='seller')){
        req.flash('error','You do not have permission to do that')
        return res.redirect('/products');
    }
    next();
}

module.exports.isProductAuthor = async(req,res,next)=>{

    const {id} = req.params;
    const product = await Product.findById(id);
    if(!(product.author && product.author.equals(req.user._id))){
        req.flash('error','You do not have permission to do that')
        return res.redirect(`/products/${id}`);
    }
    next();
}

// module.exports.isReviewAuthor = async(req,res,next)=>{

//     const {id} = req.params;
//     const review = await Review.findById(id);
//     if(!(review.author && review.author.equals(req.user._id))){
//         req.flash('error','You do not have permission to delete that review')
//         return res.redirect(`/products/${id}`);
//     }
//     next();
// }