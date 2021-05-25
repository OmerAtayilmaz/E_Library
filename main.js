//api link:https://api.jsonbin.io/b/60ac8615e2fa0d4db8adcce1/4

//core modules
const fs = require('fs');
const http = require('http');
const url=require('url');
const fetch=require('node-fetch');

//node modules
const superagent=require('superagent');
const axios=require('axios');
//developer modules
const replaceTemp=require('./replaceTemplate');
const { resolve } = require('path');
const data=fs.readFileSync(`${__dirname}/src/data.json`,'utf-8');
const dataOBJ=JSON.parse(data);

//templates
const tempIndex=fs.readFileSync(`${__dirname}/index.html`,'utf-8');
const tempLibrary=fs.readFileSync(`${__dirname}/templates/temp-library.html`,'utf-8');
const tempTop100=fs.readFileSync(`${__dirname}/templates/temp-top.html`,'utf-8');



const server = http.createServer(); //server oluşturduk
 let link="https://api.jsonbin.io/b/60ac8615e2fa0d4db8adcce1/4";


//NodeJS
  const getData=(link)=>
{
 return new Promise((resolve,reject)=>{
     fetch(link)
     .then(response=>response.json())
     .then(data=>resolve(data));
 })
};
  




 server.on('request',(req,res)=>{
    const pathName=req.url;
    if(req.url==='/'||pathName=='/index'){
       res.writeHead(200,{
           'Content-type':'text/html'
       });
   

    getData(link).then(data=>{
       let  html=data.map(el=>replaceTemp(tempLibrary,el)).join('');
       
       let html2=data.map(el=>replaceTemp(tempTop100,el)).join('');


       let output = tempIndex.replace('{%LIBRARY%}',html);
           output=output.replace('{%TOP100%}',html2);
       res.end(output);
    }); 
    
  
    }
    else {
        res.writeHead(404,{
            'Content-type':'text/html',
            'basligim':'hello-world :)'     
    });
    res.end('<h1>Page not found!</h1>')
    }
});

server.listen(8080,'127.0.0.1',()=>{
    console.log('Port Başarıyla çalıştırıldı.');
}); 