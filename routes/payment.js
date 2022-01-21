const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const {isLoggedIn} = require('../middleware');
const {v4:uuid} = require('uuid');
const User = require('../models/user');

const razorpay = new Razorpay({
    key_id: 'rzp_test_KmBswWxIYP1oTi',
    key_secret: 'SwkLbwniedf6nRn0AJ256bKx',
})

router.post('/order',isLoggedIn,async(req,res)=>{
    const user = await User.findById(req.user._id).populate('cart');
    const totAmount = user.cart.reduce((sum,it)=>sum+it.price,0);
    let options={
        amount: totAmount * 100,
        currency: "INR",
        receipt: uuid(),
    };

    razorpay.orders.create(options,function (err,order){
        console.log(order);
        res.json(order);
    })
})

router.post('/is-order-complete',async(req,res)=>{
    
    razorpay.payments.fetch(req.body.razorpay_payment_id).then((data)=>{
        

        if(data.status=='captured'){

            req.flash('success', 'Placed your order Successfully!!');
            res.redirect('/products');
        }
        else{
            req.flash('error',`Oops! Can't place your order at the moment.Please try again after some time!`)
            res.redirect('/user/cart');
        }
    })
})

module.exports=router;