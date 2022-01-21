const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../../middleware');
const User = require('../../models/user');

router.post('/:id/like',isLoggedIn,async (req,res)=>{

    const {id} = req.params;
    const user = req.user;
    const isLiked = user.wishList.includes(id);
    const condition = isLiked ? '$pull' : '$addToSet' ;
    req.user = await User.findByIdAndUpdate(req.user._id,{[condition]:{wisList:id}},{new:true});
    res.send('Hii');
})



module.exports=router;