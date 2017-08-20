/*
var fs=require('fs');
var https=require('https');
var express=require('express');
var app=express();

https.createServer({
	key: fs.readFileSync('ssl/key.pem'),
	ca: fs.readFileSync('ssl/csr.pem'),
	cert: fs.readFileSync('ssl/cert.pem')
	//passphrase: 'mmcctt'
},app).listen(55555);

app.get('/',function(req,res){
	res.header('Content-type','text/html');
	return res.send('<h1>Hello, Secure World!</h1>');
});
*/