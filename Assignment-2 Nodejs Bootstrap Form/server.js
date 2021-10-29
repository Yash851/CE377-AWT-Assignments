const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.urlencoded({extended:true}));
const port = 3030;
const profileForm = fs.readFileSync(`${__dirname}/form.html`, 'utf-8');
const info = fs.readFileSync(`${__dirname}/info.html`, 'utf-8');
const replaceTemplate = (temp, info) => {
    let output = temp.replace(/{%FIRSTNAME%}/g, info.firstname);
    output = output.replace(/{%LASTNAME%}/g, info.lastname);
    output = output.replace(/{%EMAILID%}/g, info.email);
    output = output.replace(/{%GENDER%}/g, info.gender);
    output = output.replace(/{%ADDRESS%}/g, info.address);
    output = output.replace(/{%INSTITUTE%}/g, info.institute);
    output = output.replace(/{%DEPARTMENT%}/g, info.dept);
    output = output.replace(/{%SEMESTER%}/g, info.semester);
    output = output.replace(/{%MOBILENO%}/g, info.mobileno);
    output = output.replace(/{%DOB%}/g, info.DOB);
    return output;
}
app.get('/', (req,res)=>{
    res.writeHead(200,{'content-type':'text/html'});
    res.end(profileForm);
})

app.post('/submit', (req, res)=>{
    res.writeHead(200,{'content-type':'text/html'});
const output=replaceTemplate(info, req.body);
res.end(output);
})

app.listen(port, ()=>{
    console.log('Server listening on '+port);
})

