const Product = require('../models/product');
const User = require('../models/user');

module.exports.showCart=async(req,res)=>{
    const user = await User.findById(req.user._id).populate('cart');
    const totAmount = user.cart.reduce((sum,it)=>sum+it.price,0);
    const productInfo = user.cart.map((p)=>p.desc).join(',');
    res.render('cart/cart',{user,totAmount,productInfo});
};

module.exports.addToCart=async (req,res)=>{

    const {id} = req.params;
    const userid = req.user._id;
    const product = await Product.findById(id);
    const user = await User.findById(userid);
    user.cart.push(product);
    await user.save();
    res.redirect('/user/cart');
};