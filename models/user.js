const { string } = require('joi');
const mongoose = require('mongoose');
const PassportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        trim:true,
        required:true
    },
    role:{
        type:String,
        default:'buyer'
    },
    cart:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Product'
        }
    ],
    wishList:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Product'
        }
    ],
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Order'
        }
    ],
});

userSchema.plugin(PassportLocalMongoose);
const User = mongoose.model('User',userSchema);
module.exports = User;