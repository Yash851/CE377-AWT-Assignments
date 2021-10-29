const express =require('express')
const mysql=require('mysql')
const dotenv=require('dotenv');
dotenv.config();
const app=express()

//Connection with MySQL

const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:''
});

connection.connect((err)=>{
    if(err) return console.error('error: ' + err.message);
    console.log("Connected successfully to MySql server")
});

//db-create => create Database

app.get("/db-create", (req,res)=>{
    const dbquery="CREATE DATABASE IF NOT EXISTS dbUniversity";

    connection.query(dbquery,(err,result)=>{
        if(err) return console.error('error: ' + err.message);
        console.log("Database created successfully",result)
    })
});


//db-table => Create Table in University DB
app.get("/db-create-table", (req,res)=>{
    const tblStudentInfo=`CREATE TABLE IF NOT EXISTS tblStudentInfo(
        studentID varchar(10) NOT NULL,
        fname varchar(50) NOT NULL,
        lname varchar(50) NOT NULL,
        mobileNo varchar(15) NOT NULL,
        PRIMARY KEY (studentID))`
        const tblFacultyInfo=`CREATE TABLE IF NOT EXISTS tblFacultyInfo(
            facultyID varchar(10) NOT NULL,
            fname varchar(50) NOT NULL,
            lname varchar(50) NOT NULL,
            mobileNo varchar(15) NOT NULL,
            PRIMARY KEY (facultyID))`

    connection.query("USE dbUniversity",(err,result)=>{ // "Select Database"
        if(err) return console.error('error: ' + err.message);
        connection.query(tblStudentInfo,(err,result)=>{
            if(err) return console.error('error: ' + err.message);
            console.log("Table created successfully",result)
        });
        connection.query(tblFacultyInfo,(err,result)=>{
            if(err) return console.error('error: ' + err.message);
            console.log("Table created successfully",result)
        });
    });
});

//db-insert => Insert Record into studentInfo Table

app.get("/db-insert", (req,res)=>{
    const dbInsertFaculty=`INSERT INTO tblFacultyInfo
    (facultyID,fname,lname,mobileNo)
    VALUES ('102','Mrugendra','Rahevar','123456789'),
    ('103','Martin','Parmar','123456789'),
    ('104','Vraj','Shah','123456789')`;

    const dbInsertStudent=`INSERT INTO tblStudentInfo
    (studentID,fname,lname,mobileNo)
    VALUES ('101','Yash','Gandhi','123456789'),
    ('102','Vraj','Parikh','123456789'),
    ('103','Nandan','Gadhetharia','123456789')`;

    connection.query(dbInsertFaculty,(err,result)=>{
        if(err) return console.error('error: ' + err.message);
        console.log(`Total affected ROWS: ${result['affectedRows']}`)
    })

    connection.query(dbInsertStudent,(err,result)=>{
        if(err) return console.error('error: ' + err.message);
        console.log(`Total affected ROWS: ${result['affectedRows']}`)
    })
});


app.get("/db-update", (req,res)=>{
    const updateStudent=`UPDATE tblStudentInfo SET fname='Virat' WHERE studentID=101`;
    const updateFaculty=`UPDATE tblFacultyInfo SET fname='Pankaj', lname='Mishra' WHERE facultyID=104`;
    connection.query(updateStudent,(err,result)=>{
        if(err) return console.error('error: ' + err.message);
        console.log(result);
    })
    connection.query(updateFaculty,(err,result)=>{
        if(err) return console.error('error: ' + err.message);
        console.log(result);
    })
});

app.get("/db-delete",(err,result)=>{
    const deleteStudent=`DELETE FROM tblStudentInfo where studentID=101`;
    const deleteFaculty=`DELETE FROM tblFacultyInfo where facultyID=104`;
    connection.query(deleteStudent,(err,result)=>{
        if(err) return console.error('error: ' + err.message);
        console.log(result);
    })
    connection.query(deleteFaculty,(err,result)=>{
        if(err) return console.error('error: ' + err.message);
        console.log(result);
    })
})
app.listen(3000,()=>{
    console.log("Server is running on port number 3000")
})