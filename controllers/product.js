const Product = require('../models/product');

module.exports.showAllProduct = async (req,res)=>{
    try{
        const products = await Product.find({});
        res.render('products/index',{ products });
    }
    catch(e){
        res.render('error',{err:e.message});
    }
    
}

module.exports.productForm = (req,res)=>{
    try{
        res.render('products/new');
    }
    catch(e){
        res.render('error',{err:e.message});
    }
}

module.exports.createProduct = async(req,res)=>{
    try{
        const {name,img,price,desc} = req.body;
        await Product.create({name,img,price:parseFloat(price),desc,author:req.user._id});
        req.flash('success',"New Product added successfully!!");
        res.redirect('/products');
    }
    catch(e){
        res.render('error',{err:e.message});
    }
}

module.exports.showProduct = async(req,res)=>{
    try{
        const {id} = req.params;
        const product= await Product.findById(id).populate('reviews');
        // console.log(product);
        res.render('products/show',{product});
    }
    catch(e){
        res.render('error',{err:e.message});
    }
}

module.exports.editProductForm = async(req,res)=>{
    try{
        const {id} = req.params;
        const product = await Product.findById(id);
        res.render('products/edit',{product});
    }
    catch(e){
        res.render('error',{err:e.message});
    }
}

module.exports.updateProduct = async(req,res)=>{
    try{
        const {id}=req.params;
        const {name,img,price,desc}=req.body;
        await Product.findByIdAndUpdate(id,{name,img,price,desc});
        req.flash('success',"Editing successfully!!"); 
        res.redirect(`/products/${id}`);
    }
    
    catch(e){
        res.render('error',{err:e.message});
    }
}

module.exports.deleteProduct = async(req,res)=>{
    try{
        const {id} = req.params;
        await Product.findByIdAndDelete(id);
        res.redirect('/products');
    }
    
    catch(e){
        res.render('error',{err:e.message});
    }
}