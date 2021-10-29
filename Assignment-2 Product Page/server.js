const fs = require('fs');
const http=require('http');
const url=require('url');

const replaceTemplate = (temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%TYPE%}/g, product.productType);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);
    output = output.replace(/{%DISCOUNT%}/g, product.discount);
    return output;
}
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');
const dataObj = JSON.parse(data);
const overview = fs.readFileSync(`${__dirname}/templates/default.html`,'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/product.html`,'utf-8')
const card = fs.readFileSync(`${__dirname}/templates/card.html`,'utf-8');
//server
const server=http.createServer((req, res)=>{
    const { query, pathname } = url.parse(req.url, true);
    if(pathname === '/' || pathname === '/default'){
        res.writeHead(200, {'content-type':'text/html'});
        const cardHtml = dataObj.map(ele => replaceTemplate(card, ele)).join(' ');
        const output = overview.replace('{%PRODUCT_CARDS%}', cardHtml);
        res.end(output);
    }
    else if(pathname === '/api'){
            res.end(data);
            console.log(data);
    }
    else if(pathname === '/product'){
        res.writeHead(200, { 'Content-type': 'text/html'});
        let product;
        if(query.id!=null){
             product = dataObj[query.id];
        }
        else{
             product = dataObj[0];
        }
        const output = replaceTemplate(tempProduct, product);
        res.end(output);
    }
    else{
        res.writeHead(404);
        res.end('Page not found'); 
    }
})
server.listen(8000, ()=>{
    console.log('Server listening...');
})