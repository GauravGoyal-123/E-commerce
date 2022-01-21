const mongoose = require('mongoose');
const Product = require('./models/product');

const dburl = process.env.url || 'mongodb://localhost:27017/shopping-app';

mongoose.connect('mongodb+srv://gaurav:gaurav123@cluster0.ngli7.mongodb.net/shopping-app?retryWrites=true&w=majority')
    .then(() => console.log('DB Connected'))
    .catch((err) => console.log(err));


    const products = [
        
        {
            name: 'Sunglases',
            img: 'https://www.sholomart.in/resources/media/2020/11/goggles-Brown-5.png',
            price: 2499,
            desc: "Full Rim Wayfarer Branded Latest and Stylish Sunglasses"
        },
        {
            name: 'JBL Speaker',
            img: 'https://www.sony.co.in/image/6364a26f0350572e348f7a7851ddc755?fmt=pjpeg&wid=330&bgcolor=FFFFFF&bgc=FFFFFF',
            price: 2499,
            desc: "JBL Stone 1000 14W Bluetooth Speaker with 8 Hours Playback"
        },
        {
            name: 'Sports shoes',
            img: 'https://assetscdn1.paytm.com/images/catalog/product/F/FO/FOOSMOKY-TRENDYSMOK381955669A9D8/1622965634045_0..jpg',
            price: 2499,
            desc: "Socks Black Trekking Shoes for Men Walking Shoes Black"
        },
        {
            name: 'Men Shirt',
            img: 'https://assets.myntassets.com/fl_progressive/h_960,q_80,w_720/v1/assets/images/2414313/2018/3/13/11520926368526-HERENOW-Men-Red--Black-Regular-Fit-Checked-Casual-Shirt-8881520926368447-1.jpg',
            price: 999,
            desc: "Slim fit and Full sleeve shirt"
        },
        {
            name: 'Men Sweat',
            img: 'https://cdn.shopify.com/s/files/1/0301/5131/1495/products/WhatsAppImage2021-10-30at1.23.28PM_large.jpg?v=1635617530',
            price: 1299,
            desc: "Men's Sweatshirt, Made of Cotton Blend Fleece Fabric"
        },
        
        {
            name: 'Table',
            img: 'https://images.unsplash.com/photo-1499933374294-4584851497cc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80',
            price: 2499,
            desc: "NIVAA Multi-Purpose Laptop Table/Study Table/Bed Table/Foldable and Portable"
        },
        {
            name: 'Men Shorts',
            img: 'data:image/jpeg;base64,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',
            price: 1499,
            desc: "A jeggings, made of super stretch cotton fabric. It has a button up closure, belt loops, front & back pockets."
        },
        {
            name: 'Bag',
            img: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=438&q=80',
            price: 1999,
            desc: "night vision reflective material in the front of the bag"
        },
        {
            name: 'Vivo Y33S',
            img: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=436&q=80',
            price: 24999,
            desc: "With 2.5D screen curves, the all-new vivo Y33"
        },

      
    
    ];
    

async function seedDB(){
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log('Product Seeded');

}

seedDB();