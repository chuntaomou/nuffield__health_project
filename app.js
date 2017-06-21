var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var sql = require('mssql');

var index = require('./routes/index');
var users = require('./routes/users');
var list = require('./routes/list');
//var insertform = require('./routes/insertform');

var upload = multer();
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());// for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));// for parsing application/x-www-form-urlencoded
app.use(upload.array());// for parsing multipart/ form-data
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//sql server
var dbConfig = {
    user:  'ucabcm2',
    password: 'Mct.niub74110',
    server: 'nuffieldhealth20170610.database.windows.net',
    options: {
      encrypt: true,
      database: 'nuffieldhealth_db'
    }
};

//get connect to sql server and execute query
var connection = new sql.Connection(dbConfig);
connection.connect().then(function(){
  console.log("connected");
  //var query="SELECT * FROM Items ORDER BY Updatetime ASC";
  //display(query,res);
}).catch(function(err){
  console.log(err);
});

//functions to execute queries
var display=function(query,res){
	var request=new sql.Request(connection);
	request.query(query,function(err,result){
		if (err){
			console.log("Error while querying database :- " + err);
			return res.send(err);
		}else{
			console.log(result);
			//sql.close();
			res.render('layout', { data: result });
		}
	});
}
var executeQuery=function(query,res){
	var request=new sql.Request(connection);
	request.query(query,function(err,result){
		if (err){
			console.log("Error while querying database :- " + err);
			return res.send(err);
		}else{
			//console.log(result);
			//sql.close();
			res.redirect('/');
		}
	});
}

//app.use('/', index);
//app.use('/users', users);
//app.use('/views',list);
//app.use('/insertform',insertform);


app.get('/',function(req,res){
	var query="SELECT * FROM Items ORDER BY Updatetime DESC";
	var request=new sql.Request(connection);
	request.query(query,function(err,result){
		if(err){
			console.log("Error while querying database :- " + err);
		}else{
			//console.log(result);
			res.render('layout', { data: result });
		}
	});
});

app.get('/views',function(req,res){
	var query="SELECT * FROM Items ORDER BY Updatetime DESC";
	var request=new sql.Request(connection);
	request.query(query,function(err,result){
		if(err){
			console.log("Error while querying database :- " + err);
		}else{
			//console.log(result);
			res.render('item_list', { data: result });
		}
	});
});
app.post('/insert',function(req,res){
	var date=new Date();
	var hour=date.getHours();
	//hour=(hour<10?"0":"")+hour;
	var min=date.getMinutes();
	//min=(min<10?"0":"")+min;
	var sec=date.getSeconds();
	//sec=(sec<10?"0":"")+sec;
	var year=date.getFullYear();
	var month=date.getMonth()+1;
	//month=(month<10?"0":"")+month;
	var day=date.getDate();
	//day=(day<10?"0":"")+day;
	var time=year+"-"+month+"-"+day+" "+hour+":"+min+":"+sec;
	var ifdelete=0;
	var query = "INSERT INTO Items (Name, Description, Price, CreateTime, UpdateTime, Ifdelete) VALUES ('"+req.body.name+"','"+req.body.description+"',"+req.body.price+",'"+time+"','"+time+"',"+ifdelete+")";
	console.log(time);
	executeQuery(query,res);
	//res.redirect('/');
	//res.send("insert!");
});
app.post('/delete',function(req,res){
	var ifdelete=1;
	var query = "UPDATE Items Set Ifdelete="+ifdelete+"WHERE Name='"+req.body.name+"'";
	executeQuery(query,res);
	//res.redirect('/');
	//res.send("delete!");
});
app.post('/update',function(req,res){
	var date=new Date();
	var hour=date.getHours();
	//hour=(hour<10?"0":"")+hour;
	var min=date.getMinutes();
	//min=(min<10?"0":"")+min;
	var sec=date.getSeconds();
	//sec=(sec<10?"0":"")+sec;
	var year=date.getFullYear();
	var month=date.getMonth()+1;
	//month=(month<10?"0":"")+month;
	var day=date.getDate();
	//day=(day<10?"0":"")+day;
	var time=year+"-"+month+"-"+day+" "+hour+":"+min+":"+sec;
	var query = "UPDATE Items Set Description='"+req.body.description+"',Price="+req.body.price+",Updatetime='"+time+"' WHERE Name='"+req.body.name+"'";
	executeQuery(query,res);
	//res.redirect('/');
	//res.send("update!");
});
app.post('/search',function(req,res){
	var keyword = req.body.search;
	var query = "SELECT * FROM Items WHERE Name LIKE '%"+keyword+"%' OR Description LIKE '%"+keyword+"%'";
	var request = new sql.Request(connection);
	request.query(query,function(err,result){
		if(err){
			console.log("Error while querying database :- " + err);
		}else{
			res.render('search', { data: result});
		}
	});
	//console.log(query);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
