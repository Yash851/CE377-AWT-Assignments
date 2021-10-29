const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const hbs = require('express-handlebars');
var app = express();

app.use(express.urlencoded({extended:true}));

app.use(cookieParser());

app.engine('hbs',hbs({extname:'.hbs', defaultLayout:'layout', layoutsDir:__dirname+'/views/layouts'}));
app.set('view engine','hbs');
var hbsContent = {userName:'', loggedin:false, title:'You are not logged in today', body:'Hello World'}
//database
const User = require('./Model/User');
app.use(session({
key:'user_id',
secret:'Mysecret',
resave:false,
saveUninitialized:false,
cookie:{
    expires:600000
}
}))

app.set('port', 5555);

app.listen(app.get('port'), ()=>{
    console.log(`Application running on port no. ${app.get('port')}`);
})

var sessionChecker = (req, res, next)=>{
    if(req.session.user && req.cookies.user_id){
        res.redirect('/dashboard');
    }
    else{
        next();
    }
}

//routes
app.get('/',sessionChecker,(req,res)=>{
    res.redirect('/login');
})

app.route('/login').get(sessionChecker,(req,res)=>{
    res.render('login',hbsContent);
}).post(async(req,res)=>{
    var username = req.body.username;
    var password = req.body.password;
    try{
        var user = await User.findOne({username:username}).exec();
        if(!user){
            res.redirect('/login');
        }
        user.comparePassword(password,(error,match)=>{
            if(!match){
                res.redirect('/login');
            }
        })
        req.session.user=user;
        hbsContent.userName=req.body.username;
        console.log(hbsContent.userName);
        res.redirect('/dashboard');
    }
    catch(error){
        console.log(error);
    }
})

app.route('/signup').get(sessionChecker,(req,res)=>{
    res.render('Signup',hbsContent);
}).post((req,res)=>{
    var user = new User({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password
    })
    user.save((err,doc)=>{
        if(err){
            console.log(err);
            res.redirect('/signup');
        }
        else{
            req.session.user=doc;
            res.redirect('/dashboard');
        }
    })
})

app.get('/dashboard',(req,res)=>{
    if(req.session.user && req.cookies.user_id){
        hbsContent.loggedin=true;
        //hbsContent.userName=req.body.username;
        //console.log(hbsContent.userName);
        hbsContent.title='You are logged in'
        res.render('dashboard',hbsContent);
    }
    else{
        res.redirect('/login');
    }
})

app.get('/logout',(req,res)=>{
    if(req.session.user && req.cookies.user_id){
    hbsContent.loggedin=false;
    hbsContent.title='You are logged out';
    res.clearCookie('user_id');
    res.redirect('/');
    }
    else{
        res.redirect('/login');
    }
})

app.use(function(req,res,next){
    res.status(404).send("Sorry can't find that");
})