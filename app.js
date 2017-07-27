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
var products = require('./routes/products');
var endpoint = require('./routes/endpoint');
var productinfo = require('./routes/product-info');

var upload = multer();
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
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
      database: 'db'
    }
};

//get connect to sql server and execute query
var connection = new sql.Connection(dbConfig);
connection.connect().then(function(){
  console.log("connected");
}).catch(function(err){
  console.log(err);
});

//functions to execute queries
var executeQuery=function(query,res){
	var request=new sql.Request(connection);
	request.query(query,function(err,result){
		if (err){
			console.log("Error while querying database :- " + err);
			return res.send(err);
		}else{
			res.redirect('/');
		}
	});
}

//app.use('/',connection);
app.use('/', index);
//app.use('/', products);
app.use('/', endpoint);
//app.use('/',productinfo);
//app.use('/users', users);
//app.use('/views',list);
//app.use('/insertform',insertform);

app.get('/product-info',function(req, res){
	/*
	var treemenu=[];
	var query1="SELECT TOP (10) [Product Name] FROM [product].[Product] where [Product Type Id]=1";
	var query2="SELECT TOP (10) [Product Name] FROM [product].[Product] where [Product Type Id]=2";
	var query3="SELECT TOP (10) [Product Name] FROM [product].[Product] where [Product Type Id]=3";
	var query4="SELECT TOP (10) [Product Name] FROM [product].[Product] where [Product Type Id]=4";
	var query5="SELECT TOP (10) [Product Name] FROM [product].[Product] where [Product Type Id]=5";
	var query6="SELECT TOP (10) [Product Name] FROM [product].[Product] where [Product Type Id]=6";
	var query7="SELECT TOP (10) [Product Name] FROM [product].[Product] where [Product Type Id]=7";
	var query8="SELECT TOP (10) [Product Name] FROM [product].[Product] where [Product Type Id]=8";
	var request = new sql.Request(connection);
	request.query(query1,function(err,result){
		if(err){
			console.log("Error while querying database :- " + err);
			console.log("1 err");
		}else{
			treemenu.push(result);
			console.log(1);
		}
	});
	request.query(query2,function(err,result){
		if(err){
			console.log("Error while querying database :- " + err);
			console.log("2 err");
		}else{
			treemenu.push(result);
			console.log(2);
		}
	});
	request.query(query3,function(err,result){
		if(err){
			console.log("Error while querying database :- " + err);
		}else{
			treemenu.push(result);
			console.log(3);
		}
	});
	request.query(query4,function(err,result){
		if(err){
			console.log("Error while querying database :- " + err);
		}else{
			treemenu.push(result);
			console.log(4);
		}
	});
	request.query(query5,function(err,result){
		if(err){
			console.log("Error while querying database :- " + err);
		}else{
			treemenu.push(result);
			console.log(5);
		}
	});
	request.query(query6,function(err,result){
		if(err){
			console.log("Error while querying database :- " + err);
		}else{
			treemenu.push(result);
			console.log(6);
		}
	});
	request.query(query7,function(err,result){
		if(err){
			console.log("Error while querying database :- " + err);
		}else{
			treemenu.push(result);
			console.log(7);
		}
	});
	request.query(query8,function(err,result){
		if(err){
			console.log("Error while querying database :- " + err);
		}else{
			treemenu.push(result);
			console.log(8);
			console.log(treemenu);
			//res.render('product-info', { data: JSON.stringify(treemenu) });
			res.render('product-info', { data: treemenu });
		}
	});
	*/
	res.render('product-info', { title: "sdfa" });
});

app.get('/load-tree-menu',function(req,res){
	var treemenu=[];
	var query1="SELECT TOP (10) [Product Name] FROM [product].[Product] where [Product Type Id]=1";
	var query2="SELECT TOP (10) [Product Name] FROM [product].[Product] where [Product Type Id]=2";
	var query3="SELECT TOP (10) [Product Name] FROM [product].[Product] where [Product Type Id]=3";
	var query4="SELECT TOP (10) [Product Name] FROM [product].[Product] where [Product Type Id]=4";
	var query5="SELECT TOP (10) [Product Name] FROM [product].[Product] where [Product Type Id]=5";
	var query6="SELECT TOP (10) [Product Name] FROM [product].[Product] where [Product Type Id]=6";
	var query7="SELECT TOP (10) [Product Name] FROM [product].[Product] where [Product Type Id]=7";
	var query8="SELECT TOP (10) [Product Name] FROM [product].[Product] where [Product Type Id]=8";
	var request = new sql.Request(connection);
	request.query(query1,function(err,result){
		if(err){
			console.log("Error while querying database :- " + err);
			console.log("1 err");
		}else{
			treemenu.push(result);
			console.log(1);
		}
	});
	request.query(query2,function(err,result){
		if(err){
			console.log("Error while querying database :- " + err);
			console.log("2 err");
		}else{
			treemenu.push(result);
			console.log(2);
		}
	});
	request.query(query3,function(err,result){
		if(err){
			console.log("Error while querying database :- " + err);
		}else{
			treemenu.push(result);
			console.log(3);
		}
	});
	request.query(query4,function(err,result){
		if(err){
			console.log("Error while querying database :- " + err);
		}else{
			treemenu.push(result);
			console.log(4);
		}
	});
	request.query(query5,function(err,result){
		if(err){
			console.log("Error while querying database :- " + err);
		}else{
			treemenu.push(result);
			console.log(5);
		}
	});
	request.query(query6,function(err,result){
		if(err){
			console.log("Error while querying database :- " + err);
		}else{
			treemenu.push(result);
			console.log(6);
		}
	});
	request.query(query7,function(err,result){
		if(err){
			console.log("Error while querying database :- " + err);
		}else{
			treemenu.push(result);
			console.log(7);
		}
	});
	request.query(query8,function(err,result){
		if(err){
			console.log("Error while querying database :- " + err);
		}else{
			treemenu.push(result);
			console.log(8);
			console.log(treemenu.length);
			//res.render('product-info', { data: JSON.stringify(treemenu) });
			res.send(treemenu);
		}
	});
});

app.get('/products',function(req,res){
	var query="SELECT TOP (4) * FROM [Product].[product] order by [Record Creation Datetime] desc";
	var request = new sql.Request(connection);
	request.query(query,function(err,result){
		if(err){
			console.log("Error while querying database :- " + err);
		}else{
			console.log(result);
			//res.send(result);
			res.render('products', { fourlatestupdate: result });
		}
	});
});


app.post('/endpoint', function(req, res){
	console.log('body: ' + JSON.stringify(req.body));
	//res.send(req.body);
	var ID=req.body.title;
	var query="SELECT * FROM product.Product WHERE [Product Type ID]="+ID;
	var request = new sql.Request(connection);
	request.query(query,function(err,result){
		if(err){
			console.log("Error while querying database :- " + err);
		}else{
			console.log(result);
			res.send(result);
		}
	});
});

app.post('/update-general-info',function(req,res){
	console.log('post: '+JSON.stringify(req.body));
	var product_code=((req.body)[1]).message;
	var query="UPDATE [product].[Product] SET [Product Code]="+product_code+" WHERE [Product Id]="+((req.body)[0]).message;
	res.send(query);
});
/*
app.post('/productinfoid',function(req,res){
	var queryresult=[];
	console.log('body: '+JSON.stringify(req.body));
	var ID=req.body.message;
	var query1="SELECT a.*,[Product Type Name] FROM [product].[Product] as a,[product].[Product Type] as b where a.[Product Type Id]=b.[Product Type Id] and [Product Id]="+ID;
	//var query2="SELECT [Child Product Id],[Product Name] as [Child Product Name],[Product Association Id],a.[Product Association Type Id],[Product Association Type Name] FROM [product].[Product Association] as a,[product].[Product] as b,[product].[Product Association Type] as c where a.[Parent Product Id]="+ID+" and b.[Product Id]=[Child Product Id] and c.[Product Association Type Id]=a.[Product Association Type Id]";
	//var query3="SELECT a.[Parent Product Id],[Product Name] as [Parent Product Name],[Product Association Id],a.[Product Association Type Id],[Product Association Type Name] FROM [product].[Product Association] as a,[product].[Product] as b,[product].[Product Association Type] as c where [Child Product Id]="+ID+" and b.[Product Id]=a.[Parent Product Id] and c.[Product Association Type Id]=a.[Product Association Type Id]";
	//var queryattribute="SELECT [Product Attribute Id],[Product Id],a.[Product Attribute Type Id],[Product Attribute Type Name],[Product Value Text],[Product Attribute Valid From],[Product Attribute Valid To] FROM [product].[Product Attribute] as a,[product].[Product Attribute Type] as b where [Product Id]="+ID+" and b.[Product Attribute Type Id]=a.[Product Attribute Type Id]";
	var request=new sql.Request(connection);
	request.query(query1,function(err,result){
		if(err){
			console.log("Error while querying database :-"+err);
		}else{
			console.log(result);
			queryresult.push(result);
			//res.send(result);
			res.send(queryresult);
		}
	});
	
	request.query(query2,function(err,result){
		if(err){
			console.log("Error while querying database :-"+err);
		}else{
			if(result.length!=0){
                queryresult.push(result);				
			}else{
				queryresult.push("tombstone");
			}
			console.log(queryresult);
			//res.send(result);
		}
	});
	request.query(query3,function(err,result){
		if(err){
			console.log("Error while querying database :-"+err);
		}else{
			if(result.length!=0){
				queryresult.push(result);
			}else{
				queryresult.push("tombstone");
			}
			
			console.log(queryresult);
			//res.send(queryresult);
		}
	});
	request.query(queryattribute,function(err,result){
		if(err){
			console.log("Error while querying databaseL-"+err);
		}else{
			if(result.length!=0){
				queryresult.push(result);
			}else{
				queryresult.push("tombstone");
			}
			console.log(queryresult);
			res.send(queryresult);
		}
	});
	
});
*/

app.post('/productinfoid',function(req,res){
	console.log('body: '+JSON.stringify(req.body));
	var ID=req.body.message;
	var query="SELECT a.*,c.[Product Type Name],b.[Product Name] as [Parent Product Name],d1.*,d2.*,d3.*,d4.*,d5.*,d6.*,d7.*,d8.*,e1.[Product Attribute Type Name],e1.[Product Attribute Type Description],e1.[Product Attribute Type Label],e1.[Parent Product Attribute Type Id],e2.[Product Attribute Type Name],e2.[Product Attribute Type Description],e2.[Product Attribute Type Label],e2.[Parent Product Attribute Type Id],e3.[Product Attribute Type Name],e3.[Product Attribute Type Description],e3.[Product Attribute Type Label],e3.[Parent Product Attribute Type Id],e4.[Product Attribute Type Name],e4.[Product Attribute Type Description],e4.[Product Attribute Type Label],e4.[Parent Product Attribute Type Id],e5.[Product Attribute Type Name],e5.[Product Attribute Type Description],e5.[Product Attribute Type Label],e5.[Parent Product Attribute Type Id],e6.[Product Attribute Type Name],e6.[Product Attribute Type Description],e6.[Product Attribute Type Label],e6.[Parent Product Attribute Type Id],e7.[Product Attribute Type Name],e7.[Product Attribute Type Description],e7.[Product Attribute Type Label],e7.[Parent Product Attribute Type Id],e8.[Product Attribute Type Name],e8.[Product Attribute Type Description],e8.[Product Attribute Type Label],e8.[Parent Product Attribute Type Id] FROM [product].[Product] as a LEFT JOIN [product].[Product] as b ON a.[Parent Product Id]=b.[Product Id] LEFT JOIN [product].[Product Type] as c ON a.[Product Type Id]=c.[Product Type Id] LEFT JOIN [product].[Product Attribute] as d1 ON d1.[Product Id]=a.[Product Id] AND d1.[Product Attribute Type Id]=1 LEFT JOIN [product].[Product Attribute] as d2 ON d2.[Product Id]=a.[Product Id] AND d2.[Product Attribute Type Id]=2 LEFT JOIN [product].[Product Attribute] as d3 ON d3.[Product Id]=a.[Product Id] AND d3.[Product Attribute Type Id]=3 LEFT JOIN [product].[Product Attribute] as d4 ON d4.[Product Id]=a.[Product Id] AND d4.[Product Attribute Type Id]=4 LEFT JOIN [product].[Product Attribute] as d5 ON d5.[Product Id]=a.[Product Id] AND d5.[Product Attribute Type Id]=5 LEFT JOIN [product].[Product Attribute] as d6 ON d6.[Product Id]=a.[Product Id] AND d6.[Product Attribute Type Id]=6 LEFT JOIN [product].[Product Attribute] as d7 ON d7.[Product Id]=a.[Product Id] AND d7.[Product Attribute Type Id]=7 LEFT JOIN [product].[Product Attribute] as d8 ON d8.[Product Id]=a.[Product Id] AND d8.[Product Attribute Type Id]=8 LEFT JOIN [product].[Product Attribute Type] as e1 ON e1.[Product Attribute Type Id]=d1.[Product Attribute Type Id] LEFT JOIN [product].[Product Attribute Type] as e2 ON e2.[Product Attribute Type Id]=d2.[Product Attribute Type Id] LEFT JOIN [product].[Product Attribute Type] as e3 ON e3.[Product Attribute Type Id]=d3.[Product Attribute Type Id] LEFT JOIN [product].[Product Attribute Type] as e4 ON e4.[Product Attribute Type Id]=d4.[Product Attribute Type Id] LEFT JOIN [product].[Product Attribute Type] as e5 ON e5.[Product Attribute Type Id]=d5.[Product Attribute Type Id] LEFT JOIN [product].[Product Attribute Type] as e6 ON e6.[Product Attribute Type Id]=d6.[Product Attribute Type Id] LEFT JOIN [product].[Product Attribute Type] as e7 ON e7.[Product Attribute Type Id]=d7.[Product Attribute Type Id] LEFT JOIN [product].[Product Attribute Type] as e8 ON e8.[Product Attribute Type Id]=d8.[Product Attribute Type Id] WHERE a.[Product Id]="+ID;
 
	var request=new sql.Request(connection);
	request.query(query,function(err,result){
		if(err){
			console.log("Error while querying database :-"+err);
		}else{
			console.log(result);
			//res.send(result);
			res.send(result);
		}
	});
});

app.post('/searchproduct', function(req, res){
	var query_all_products="SELECT [Product Id],[Product Type Id],[Product Code],[Product Name],[Product Valid From],[Product Valid To] FROM [product].[Product] WHERE "+req.body.title+" LIKE '%"+req.body.message+"%'";
	var search_result=[];
	
	//var query_all_products_type="SELECT DISTINCT [Product Type Id] FROM [product].[Product] WHERE "+req.body.title+" LIKE '%"+req.body.message+"%'";
	var query_all_products_type="SELECT DISTINCT a.[Product Type Id], [Product Type Name] FROM [product].[Product] as a, [product].[Product Type] as b WHERE "+req.body.title+" LIKE '%"+req.body.message+"%' and (a.[Product Type id]=b.[Product Type Id])";
	
	var request=new sql.Request(connection);
	request.query(query_all_products_type,function(err,result){
		if(err){
			console.log("Error while querying database :- " + err);
		}else{
			search_result.push(result);
		}
	});
	
	var request=new sql.Request(connection);
	request.query(query_all_products,function(err,result){
		if(err){
			console.log("Error while querying database :- " + err);
		}else{
			search_result.push(result);
			console.log(search_result);
			res.send(search_result);
		}
	});
});

app.post('/search-parent-product',function(req, res){
	var query="SELECT [Product Name], [Product Id] FROM [product].[Product] WHERE [Product Name] LIKE '%"+req.body.message+"%'";
	
	var request=new sql.Request(connection);
	request.query(query,function(err,result){
		if(err){
			console.log("Error while querying database :- " + err);
		}else{
			console.log(result);
			res.send(result);
		}
	});
});


/*
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
			//res.send("sdfasdf");
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

app.post('/tabledelete', function(req,res){
	//var obj={};
	console.log(JSON.stringify(req.body.Name));
	//res.render('endpoint', { });
});
*/

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
