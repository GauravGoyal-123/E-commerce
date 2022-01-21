const User = require('../models/user');

module.exports.registerForm=(req,res)=>{
    if (req.user) {
        return res.redirect('/products');
    }
    res.render('auth/signup');
};

module.exports.registerNewUser=async(req,res)=>{
    try {
        const { username, password, email,role } = req.body;
        const user = new User({ username, email,role });
        const newUser = await User.register(user, password);
        req.login(newUser, function(err) {
            if (err){
                return next(err);
            }

            req.flash('success', 'Welcome , You are Registered Successfully');
            return res.redirect('/products');
        });
    }
    catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    } 
}

module.exports.loginForm = (req, res) => {
    if (req.user) {
        return res.redirect('/products');
    }
    res.render('auth/login');
}

module.exports.loginUser=(req,res)=>{
    req.flash('success',`Welcome Back ${req.user.username}`);
    let redirecturl = req.session.Url || '/products';
    if(redirecturl && redirecturl.indexOf('review')!==-1){
        let arr = redirecturl.split('/');
        arr.pop();
        redirecturl = arr.join('/'); 
    }
    delete req.session.Url;
    
    res.redirect(redirecturl);
};

module.exports.logoutUser=(req,res)=>{
    req.logout();
    req.flash('success','You are logged out successfully!!');
    res.redirect('/products');
};