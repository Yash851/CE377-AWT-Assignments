const express=require('express');
const bcrypt=require('bcrypt');
const fs=require('fs');
const mysql = require('mysql');
const app=express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
const signup=fs.readFileSync(`../client/signup.html`,'utf-8');
const login=fs.readFileSync(`../client/login.html`,'utf-8');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Purposedatabase',
    database: 'dbuniversity'
});
connection.connect((err) => {
    if (err) throw err;
    console.log("Connected successfully to MySql server")
});
app.get('/',(req,res)=>{
    res.end(signup);
})
app.post('/signup',(req,res)=>{
    const {email,password}=req.body;
    const cryptedPassword=bcrypt.hashSync(password,10);
    const dbInsert=`INSERT INTO users
    (email,password)
    VALUES ('${email}', '${cryptedPassword}')`;

    connection.query(dbInsert,(err,result)=>{
        if(err) throw err;
        console.log(`Total affected ROWS: ${result['affectedRows']}`)
    })
})
app.get('/login',(req,res)=>{
    res.end(login);
})
app.post('/login',(req,res)=>{
    const {email,password}=req.body;
    connection.query(`SELECT password FROM users where email='${email}'`,(err,result)=>{
        if(err) throw err;
        const loginOk=bcrypt.compareSync(password,result[0].password)
        if(!loginOk){
            console.log('Login failed!');
        }
        else{
            console.log('Login successful!');
        }
    })
})
app.listen(3030,()=>{
    console.log('server running...');
})