if(process.env.NODE_ENV!=='production'){
    require('dotenv').config();
}
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local'); 
const User = require('./models/user');
const flash = require('connect-flash');
const helmet = require('helmet');
const MongoStore = require('connect-mongo');

const dburl = process.env.url || 'mongodb://localhost:27017/shopping-app';

mongoose.connect(dburl)
    .then(() => console.log('DB Connected'))
    .catch((err) => console.log(err));


app.engine('ejs', ejsMate);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({urlencoded:true}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet({contentSecurityPolicy:false}));


const secret = process.env.SECRET || 'weneedsomebettersecret'; 


const store = MongoStore.create({
    secret:secret,
    mongoUrl:dburl,
    touchAfter:24*3600
})

const sessionConfig = {
    store,
    name:'session',
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie:{
        httpOnly:true,
        expire:Date.now()+1*7*24*60*60*1000,
        maxage:1*7*24*60*60*1000
    }
}



app.use(session(sessionConfig));
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


passport.use(new LocalStrategy(User.authenticate())); 


app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});



const productRouter = require('./routes/product');
const productReview = require('./routes/review');
const authRouter = require('./routes/auth');
const productapi = require('./routes/api/productapi');
const cartRouter = require('./routes/cart');
const paymentRouter = require('./routes/payment');

app.use('/products',productRouter);
app.use('/products',productReview);
app.use(authRouter);
app.use('/products',productapi);
app.use('/user',cartRouter);
app.use(paymentRouter);

app.get('/', (req, res) => {
    res.render('home');
});

app.all('*', (req, res) => {
    res.render('error', { err: 'You are requesting a wrong url!!!' })
});

const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`Server running at ${port}`);
});