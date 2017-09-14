//var fs=require('fs');
//var https=require('https');
//////////////////////////////////////////
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var sql = require('mssql');

//var index = require('./routes/index');
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
			res.redirect('/login');
		}
	});
}

app.get('/materials',function(req, res){
	res.render('materials', { title: "sdfa" });
});

app.get('/home',function(req, res){
	res.render('nuffieldhealth', { title: 'Express' });
});

app.get('/',function(req, res){
	res.render('login',{ title: "sdfa"});
});

app.get('/material-info',function(req, res){
	res.render('material-info', { title: "sdfa" });
});

app.get('/product-info',function(req, res){
	res.render('product-info', { title: "sdfa" });
});

app.get('/location-info',function(req,res){
	res.render('location-info', { title: "sdfa" });
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
	res.render('products', { title: "sdfa" });
});

app.get('/locations',function(req,res){
	res.render('locations', { title: "sdfa" });
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

app.post('/res',function(req,res){
	var test=null;
	var ifexist=0;
	console.log('post: '+JSON.stringify(req.body));
	var query="select Username from dbo.Admin";
	var request=new sql.Request(connection);
	request.query(query,function(err,result){
		if(err){
			console.log("Error while querying database :- " + err);
		}else{
			for(var i=0;i<result.length;i++){
				console.log((result[i])["Username"]);
				if(req.body.title==(result[i])["Username"]){
					ifexist=1;
				}
			}
			if(ifexist==1){
				test="sameusername";
				res.send(test);
			}else{
				var request=new sql.Request(connection);
				request.query(req.body.message,function(err,result){
					if(err){
						console.log("Error while querying database :- " + err);
					}else{
						test="success";
						res.send(test);
					}
				});
			}
		}
	});
	//console.log(test);
	//res.send(test);
});

app.post('/log',function(req,res){
	console.log('post: '+JSON.stringify(req.body));
	var username=req.body.username;
	var password=req.body.pass;
	var query="select Password from dbo.Admin where Username='"+username+"'";
	var request=new sql.Request(connection);
	//var status=null;
	request.query(query,function(err,result){
		if(err){
			console.log("Error while querying database :- " + err);
		}else{
		    if(result.length==0){
				console.log("faila");
				res.send("fail");
			}else{
				console.log((result[0])["Password"]);
				if((result[0])["Password"]==password){
					console.log("success");
					res.send("success");
				}else{
					console.log("failb");
					res.send("fail");
				}
			}
			//res.send(status);
		}
	});
	//res.send(status);
});

app.post('/update-general-info',function(req,res){
	console.log('post: '+JSON.stringify(req.body));
	var query=req.body.message;
	var request=new sql.Request(connection);
	request.query(query,function(err,result){
		if(err){
			console.log("Error while querying database :- " + err);
		}else{
			console.log(result);
			res.send(result);
		}
	});
	//res.send(query);
});

app.post('/update-general-info-updatematerialass',function(req,res){
	console.log('post: '+JSON.stringify(req.body));
	var query=req.body.message;
	var request=new sql.Request(connection);
	request.query(query,function(err,result){
		if(err){
			console.log("Error while querying database :- " + err);
		}else{
			query="select * from [material].[Material Association] where [Child Material Id]="+req.body.title2;
			request.query(query,function(err,result){
				if(err){
					console.log("Error while querying database :- " + err);
				}else{
					if(result.length!=0){
						var query="update [material].[Material Association] set [Parent Material Id]="+req.body.title1+" where [Material Association Id]="+(result[0])["Material Association Id"];
						console.log(query);
						request.query(query,function(err,result){
							if(err){
								console.log("Error while querying database :- " + err);
							}else{
								res.send("success");
							}
						});
					}else{
						var query="insert into [material].[Material Association] ([Material Association Type Id],[Material Association Valid From],[Material Association Valid To],[Parent Material Id],[Child Material Id]) values (5,'2010-01-01 00:00:00:000','9999-01-01 00:00:00:000',"+req.body.title1+","+req.body.title2+")";
						console.log(query);
						request.query(query,function(err,result){
							if(err){
								console.log("Error while querying database :- " + err);
							}else{
								res.send("success");
							}
						});
					}
				}
			});
		}
	});
});

app.post('/update-general-info-updatelocationass',function(req,res){
	console.log('post: '+JSON.stringify(req.body));
	var query=req.body.message;
	var request=new sql.Request(connection);
	request.query(query,function(err,result){
		if(err){
			console.log("Error while querying database :- " + err);
		}else{
			query="select * from [location].[Location Association] where [Child Location Id]="+req.body.title2;
			request.query(query,function(err,result){
				if(err){
					console.log("Error while querying database :- " + err);
				}else{
					if(result.length!=0){
						var query="update [location].[Location Association] set [Parent Location Id]="+req.body.title1+" where [Location Association Id]="+(result[0])["Location Association Id"];
						console.log(query);
						request.query(query,function(err,result){
							if(err){
								console.log("Error while querying database :- " + err);
							}else{
								res.send("success");
							}
						});
					}else{
						var query="insert into [location].[Location Association] ([Location Association Type Id],[Location Association Valid From],[Location Association Valid To],[Parent Location Id],[Child Location Id]) values (5,'2010-01-01 00:00:00:000','9999-01-01 00:00:00:000',"+req.body.title1+","+req.body.title2+")";
						console.log(query);
						request.query(query,function(err,result){
							if(err){
								console.log("Error while querying database :- " + err);
							}else{
								res.send("success");
							}
						});
					}
				}
			});
		}
	});
});

app.post('/update-general-info-updateass',function(req,res){
	console.log('post: '+JSON.stringify(req.body));
	var query=req.body.message;
	var request=new sql.Request(connection);
	request.query(query,function(err,result){
		if(err){
			console.log("Error while querying database :- " + err);
		}else{
			query="select * from [product].[Product Association] where [Child Product Id]="+req.body.title2;
			request.query(query,function(err,result){
				if(err){
					console.log("Error while querying database :- " + err);
				}else{
					if(result.length!=0){
						var query="update [product].[Product Association] set [Parent Product Id]="+req.body.title1+" where [Product Association Id]="+(result[0])["Product Association Id"];
						console.log(query);
						request.query(query,function(err,result){
							if(err){
								console.log("Error while querying database :- " + err);
							}else{
								res.send("success");
							}
						});
					}else{
						var query="insert into [product].[Product Association] ([Product Association Type Id],[Product Association Valid From],[Product Association Valid To],[Parent Product Id],[Child Product Id]) values (5,'2010-01-01 00:00:00:000','9999-01-01 00:00:00:000',"+req.body.title1+","+req.body.title2+")";
						console.log(query);
						request.query(query,function(err,result){
							if(err){
								console.log("Error while querying database :- " + err);
							}else{
								res.send("success");
							}
						});
					}
				}
			});
		}
	});
	//res.send(query);
});

app.post('/update-attribute-info',function(req,res){
	console.log('post: '+JSON.stringify(req.body));
	var query=req.body.message;
	var request=new sql.Request(connection);
	request.query(query,function(err,result){
		if(err){
			console.log("Error while querying database :- " + err);
		}else{
			console.log(result);
			res.send(query);
		}
	});
});

app.post('/productinfoid',function(req,res){
	console.log('body: '+JSON.stringify(req.body));
	var ID=req.body.message;
	var query="SELECT a.*,c.[Product Type Name],b.[Product Name] as [Parent Product Name],d1.*,d2.*,d3.*,d4.*,d5.*,d6.*,d7.*,d8.*,e1.[Product Attribute Type Name],e1.[Product Attribute Type Description],e1.[Product Attribute Type Label],e1.[Parent Product Attribute Type Id],e2.[Product Attribute Type Name],e2.[Product Attribute Type Description],e2.[Product Attribute Type Label],e2.[Parent Product Attribute Type Id],e3.[Product Attribute Type Name],e3.[Product Attribute Type Description],e3.[Product Attribute Type Label],e3.[Parent Product Attribute Type Id],e4.[Product Attribute Type Name],e4.[Product Attribute Type Description],e4.[Product Attribute Type Label],e4.[Parent Product Attribute Type Id],e5.[Product Attribute Type Name],e5.[Product Attribute Type Description],e5.[Product Attribute Type Label],e5.[Parent Product Attribute Type Id],e6.[Product Attribute Type Name],e6.[Product Attribute Type Description],e6.[Product Attribute Type Label],e6.[Parent Product Attribute Type Id],e7.[Product Attribute Type Name],e7.[Product Attribute Type Description],e7.[Product Attribute Type Label],e7.[Parent Product Attribute Type Id],e8.[Product Attribute Type Name],e8.[Product Attribute Type Description],e8.[Product Attribute Type Label],e8.[Parent Product Attribute Type Id],f1.[Product Association Id] as [Parent Association:Association Id],f1.[Product Association Type Id] as [Parent Association:Association Type Id],g1.[Product Association Type Name] as [Parent Association:Association Type Name],f1.[Parent Product Id] as [Parent Association:Parent Product Id],a1.[Product Name] as [Parent Association:Parent Product Name],g1.[Parent Product Type Id] as [Parent Association:Parent Product Type Id],c1.[Product Type Name] as [Parent Association:Parent Product Type Name],f1.[Child Product Id] as [Parent Association:Child Product Id],a2.[Product Name] as [Parent Association:Child Product Name],g1.[Child Product Type Id] as [Parent Association:Child Product Type Id],c2.[Product Type Name] as [Parent Association:Child Product Type Name],f1.[Product Association Valid From] as [Parent Association:Product Association Valid From],f1.[Product Association Valid To] as [Parent Association:Product Association Valid To],f2.[Product Association Id] as [Child Association:Association Id],f2.[Product Association Type Id] as [Child Association:Association Type Id],g2.[Product Association Type Name] as [Child Association:Association Type Name],f2.[Parent Product Id] as [Child Association:Parent Product Id],a3.[Product Name] as [Child Association:Parent Product Name],g2.[Parent Product Type Id] as [Child Association:Parent Product Type Id],c3.[Product Type Name] as [Child Association:Parent Product Type Name],f2.[Child Product Id] as [Child Association:Child Product Id],a4.[Product Name] as [Child Association:Child Product Name],g2.[Child Product Type Id] as [Child Association:Child Product Type Id],c4.[Product Type Name] as [Child Association:Child Product Type Name],f2.[Product Association Valid From] as [Child Association:Product Association Valid From],f2.[Product Association Valid To] as [Child Association:Product Association Valid To] FROM [product].[Product] as a LEFT JOIN [product].[Product] as b ON a.[Parent Product Id]=b.[Product Id] LEFT JOIN [product].[Product Type] as c ON a.[Product Type Id]=c.[Product Type Id] LEFT JOIN [product].[Product Attribute] as d1 ON d1.[Product Id]=a.[Product Id] AND d1.[Product Attribute Type Id]=1 LEFT JOIN [product].[Product Attribute] as d2 ON d2.[Product Id]=a.[Product Id] AND d2.[Product Attribute Type Id]=2 LEFT JOIN [product].[Product Attribute] as d3 ON d3.[Product Id]=a.[Product Id] AND d3.[Product Attribute Type Id]=3 LEFT JOIN [product].[Product Attribute] as d4 ON d4.[Product Id]=a.[Product Id] AND d4.[Product Attribute Type Id]=4 LEFT JOIN [product].[Product Attribute] as d5 ON d5.[Product Id]=a.[Product Id] AND d5.[Product Attribute Type Id]=5 LEFT JOIN [product].[Product Attribute] as d6 ON d6.[Product Id]=a.[Product Id] AND d6.[Product Attribute Type Id]=6 LEFT JOIN [product].[Product Attribute] as d7 ON d7.[Product Id]=a.[Product Id] AND d7.[Product Attribute Type Id]=7 LEFT JOIN [product].[Product Attribute] as d8 ON d8.[Product Id]=a.[Product Id] AND d8.[Product Attribute Type Id]=8 LEFT JOIN [product].[Product Attribute Type] as e1 ON e1.[Product Attribute Type Id]=d1.[Product Attribute Type Id] LEFT JOIN [product].[Product Attribute Type] as e2 ON e2.[Product Attribute Type Id]=d2.[Product Attribute Type Id] LEFT JOIN [product].[Product Attribute Type] as e3 ON e3.[Product Attribute Type Id]=d3.[Product Attribute Type Id] LEFT JOIN [product].[Product Attribute Type] as e4 ON e4.[Product Attribute Type Id]=d4.[Product Attribute Type Id] LEFT JOIN [product].[Product Attribute Type] as e5 ON e5.[Product Attribute Type Id]=d5.[Product Attribute Type Id] LEFT JOIN [product].[Product Attribute Type] as e6 ON e6.[Product Attribute Type Id]=d6.[Product Attribute Type Id] LEFT JOIN [product].[Product Attribute Type] as e7 ON e7.[Product Attribute Type Id]=d7.[Product Attribute Type Id] LEFT JOIN [product].[Product Attribute Type] as e8 ON e8.[Product Attribute Type Id]=d8.[Product Attribute Type Id] LEFT JOIN [product].[Product Association] as f1 ON f1.[Parent Product Id]=a.[Product Id] LEFT JOIN [product].[Product Association] as f2 ON f2.[Child Product Id]=a.[Product Id] LEFT JOIN [product].[Product] as a1 ON a1.[Product Id]=f1.[Parent Product Id] LEFT JOIN [product].[Product] as a2 ON a2.[Product Id]=f1.[Child Product Id] LEFT JOIN [product].[Product] as a3 ON a3.[Product Id]=f2.[Parent Product Id] LEFT JOIN [product].[Product] as a4 ON a4.[Product Id]=f2.[Child Product Id] LEFT JOIN [product].[Product Association Type] as g1 ON g1.[Product Association Type Id]=f1.[Product Association Type Id] LEFT JOIN [product].[Product Association Type] as g2 ON g2.[Product Association Type Id]=f2.[Product Association Type Id] LEFT JOIN [product].[Product Type] as c1 ON c1.[Product Type Id]=g1.[Parent Product Type Id] LEFT JOIN [product].[Product Type] as c2 ON c2.[Product Type Id]=g1.[Child Product Type Id] LEFT JOIN [product].[Product Type] as c3 ON c3.[Product Type Id]=g2.[Parent Product Type Id] LEFT JOIN [product].[Product Type] as c4 ON c4.[Product Type Id]=g2.[Child Product Type Id] WHERE a.[Product Id]="+ID;
 
	var request=new sql.Request(connection);
	request.query(query,function(err,result){
		if(err){
			console.log("Error while querying database :-"+err);
		}else{
			console.log(result);
			res.send(result);
		}
	});
});

app.post('/materialinfoid',function(req,res){
	var ID=req.body.message;
	var query="SELECT a.*,c.[Material Type Name],b.[Material Name] as [Parent Material Name],f1.[Material Association Id] as [Parent Association:Association Id],f1.[Material Association Type Id] as [Parent Association:Association Type Id],g1.[Material Association Type Name] as [Parent Association:Association Type Name],f1.[Parent Material Id] as [Parent Association:Parent Material Id],a1.[Material Name] as [Parent Association:Parent Material Name],g1.[Parent Material Type Id] as [Parent Association:Parent Material Type Id],c1.[Material Type Name] as [Parent Association:Parent Material Type Name],f1.[Child Material Id] as [Parent Association:Child Material Id],a2.[Material Name] as [Parent Association:Child Material Name],g1.[Child Material Type Id] as [Parent Association:Child Material Type Id],c2.[Material Type Name] as [Parent Association:Child Material Type Name],f1.[Material Association Valid From] as [Parent Association:Material Association Valid From],f1.[Material Association Valid To] as [Parent Association:Material Association Valid To],f2.[Material Association Id] as [Child Association:Association Id],f2.[Material Association Type Id] as [Child Association:Association Type Id],g2.[Material Association Type Name] as [Child Association:Association Type Name],f2.[Parent Material Id] as [Child Association:Parent Material Id],a3.[Material Name] as [Child Association:Parent Material Name],g2.[Parent Material Type Id] as [Child Association:Parent Material Type Id],c3.[Material Type Name] as [Child Association:Parent Material Type Name],f2.[Child Material Id] as [Child Association:Child Material Id],a4.[Material Name] as [Child Association:Child Material Name],g2.[Child Material Type Id] as [Child Association:Child Material Type Id],c4.[Material Type Name] as [Child Association:Child Material Type Name],f2.[Material Association Valid From] as [Child Association:Material Association Valid From],f2.[Material Association Valid To] as [Child Association:Material Association Valid To] FROM [material].[Material] as a LEFT JOIN [material].[Material] as b ON a.[Parent Material Id]=b.[Material Id] LEFT JOIN [material].[Material Type] as c ON a.[Material Type Id]=c.[Material Type Id] LEFT JOIN [material].[Material Association] as f1 ON f1.[Parent Material Id]=a.[Material Id] LEFT JOIN [material].[Material Association] as f2 ON f2.[Child Material Id]=a.[Material Id] LEFT JOIN [material].[Material] as a1 ON a1.[Material Id]=f1.[Parent Material Id] LEFT JOIN [material].[Material] as a2 ON a2.[Material Id]=f1.[Child Material Id] LEFT JOIN [material].[Material] as a3 ON a3.[Material Id]=f2.[Parent Material Id] LEFT JOIN [material].[Material] as a4 ON a4.[Material Id]=f2.[Child Material Id] LEFT JOIN [material].[Material Association Type] as g1 ON g1.[Material Association Type Id]=f1.[Material Association Type Id] LEFT JOIN [material].[Material Association Type] as g2 ON g2.[Material Association Type Id]=f2.[Material Association Type Id] LEFT JOIN [material].[Material Type] as c1 ON c1.[Material Type Id]=g1.[Parent Material Type Id] LEFT JOIN [material].[Material Type] as c2 ON c2.[Material Type Id]=g1.[Child Material Type Id] LEFT JOIN [material].[Material Type] as c3 ON c3.[Material Type Id]=g2.[Parent Material Type Id] LEFT JOIN [material].[Material Type] as c4 ON c4.[Material Type Id]=g2.[Child Material Type Id] where a.[Material Id]="+ID;
    
	var request=new sql.Request(connection);
	request.query(query,function(err,result){
		if(err){
			console.log("Error while querying database :-"+err);
		}else{
			console.log(result);
			res.send(result);
		}
	});
});

app.post('/locationinfoid',function(req,res){
	var ID=req.body.message;
	var query="SELECT a.*,c.[Location Type Name],b.[Location Name] as [Parent Location Name],f1.[Location Association Id] as [Parent Association:Association Id],f1.[Location Association Type Id] as [Parent Association:Association Type Id],g1.[Location Association Type Name] as [Parent Association:Association Type Name],f1.[Parent Location Id] as [Parent Association:Parent Product Id],a1.[Location Name] as [Parent Association:Parent Location Name],g1.[Parent Location Type Id] as [Parent Association:Parent Location Type Id],c1.[Location Type Name] as [Parent Association:Parent Location Type Name],f1.[Child Location Id] as [Parent Association:Child Location Id],a2.[Location Name] as [Parent Association:Child Location Name],g1.[Child Location Type Id] as [Parent Association:Child Location Type Id],c2.[Location Type Name] as [Parent Association:Child Location Type Name],f1.[Location Association Valid From] as [Parent Association:Location Association Valid From],f1.[Location Association Valid To] as [Parent Association:Location Association Valid To],f2.[Location Association Id] as [Child Association:Association Id],f2.[Location Association Type Id] as [Child Association:Association Type Id],g2.[Location Association Type Name] as [Child Association:Association Type Name],f2.[Parent Location Id] as [Child Association:Parent Location Id],a3.[Location Name] as [Child Association:Parent Location Name],g2.[Parent Location Type Id] as [Child Association:Parent Location Type Id],c3.[Location Type Name] as [Child Association:Parent Location Type Name],f2.[Child Location Id] as [Child Association:Child Location Id],a4.[Location Name] as [Child Association:Child Location Name],g2.[Child Location Type Id] as [Child Association:Child Location Type Id],c4.[Location Type Name] as [Child Association:Child Location Type Name],f2.[Location Association Valid From] as [Child Association:Location Association Valid From],f2.[Location Association Valid To] as [Child Association:Location Association Valid To] FROM [location].[Location] as a LEFT JOIN [location].[Location] as b ON a.[Parent Location Id]=b.[Location Id] LEFT JOIN [location].[Location Type] as c ON a.[Location Type Id]=c.[Location Type Id] LEFT JOIN [location].[Location Association] as f1 ON f1.[Parent Location Id]=a.[Location Id] LEFT JOIN [location].[Location Association] as f2 ON f2.[Child Location Id]=a.[Location Id] LEFT JOIN [location].[Location] as a1 ON a1.[Location Id]=f1.[Parent Location Id] LEFT JOIN [location].[Location] as a2 ON a2.[Location Id]=f1.[Child Location Id] LEFT JOIN [location].[Location] as a3 ON a3.[Location Id]=f2.[Parent Location Id] LEFT JOIN [location].[Location] as a4 ON a4.[Location Id]=f2.[Child Location Id] LEFT JOIN [location].[Location Association Type] as g1 ON g1.[Location Association Type Id]=f1.[Location Association Type Id] LEFT JOIN [location].[Location Association Type] as g2 ON g2.[Location Association Type Id]=f2.[Location Association Type Id] LEFT JOIN [location].[Location Type] as c1 ON c1.[Location Type Id]=g1.[Parent Location Type Id] LEFT JOIN [location].[Location Type] as c2 ON c2.[Location Type Id]=g1.[Child Location Type Id] LEFT JOIN [location].[Location Type] as c3 ON c3.[Location Type Id]=g2.[Parent Location Type Id] LEFT JOIN [location].[Location Type] as c4 ON c4.[Location Type Id]=g2.[Child Location Type Id] where a.[Location Id]="+ID;
    
	var request=new sql.Request(connection);
	request.query(query,function(err,result){
		if(err){
			console.log("Error while querying database :-"+err);
		}else{
			console.log(result);
			res.send(result);
		}
	});
});

app.post('/searchmaterial', function(req, res){
	var query=req.body.message;
	var create_view="create view [materialtemp] as "+query;
	console.log(create_view);
	var drop_view="drop view [materialtemp]";
	
	var request=new sql.Request(connection);
	request.query(drop_view,function(err,result){
		if(err){
			console.log("Error while querying database :- " + err);
		}else{
			console.log("drop temp");
		}
	});
	request.query(create_view,function(err,result){
		if(err){
			console.log("Error while querying database :- " + err);
		}else{
			console.log("create temp");
		}
	});
	request.query(query,function(err,result){
		if(err){
			console.log("Error while querying database :- " + err);
		}else{
			console.log("query");
			res.send(result);
		}
	});
});

app.post('/searchproduct', function(req, res){
	var query=req.body.message;
	var create_view="create view [temp] as "+query;
	console.log(create_view);
	var drop_view="drop view [temp]";
	
	var request=new sql.Request(connection);
	request.query(drop_view,function(err,result){
		if(err){
			console.log("Error while querying database :- " + err);
		}else{
			console.log("drop temp");
		}
	});
	request.query(create_view,function(err,result){
		if(err){
			console.log("Error while querying database :- " + err);
		}else{
			console.log("create temp");
		}
	});
	request.query(query,function(err,result){
		if(err){
			console.log("Error while querying database :- " + err);
		}else{
			console.log("query");
			res.send(result);
		}
	});
});

app.post('/searchlocation', function(req, res){
	var query=req.body.message;
	var create_view="create view [locationtemp] as "+query;
	console.log(create_view);
	var drop_view="drop view [locationtemp]";
	
	var request=new sql.Request(connection);
	request.query(drop_view,function(err,result){
		if(err){
			console.log("Error while querying database :- " + err);
		}else{
			console.log("drop temp");
		}
	});
	request.query(create_view,function(err,result){
		if(err){
			console.log("Error while querying database :- " + err);
		}else{
			console.log("create temp");
		}
	});
	request.query(query,function(err,result){
		if(err){
			console.log("Error while querying database :- " + err);
		}else{
			console.log("query");
			res.send(result);
		}
	});
});

app.post('/updatesearchresult',function(req,res){
	var query=req.body.message;
	
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

app.post('/search-parent-location',function(req, res){
	var query="SELECT [Location Name], [Location Id] FROM [location].[Location] WHERE [Location Name] LIKE '%"+req.body.message+"%'";
	
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

app.post('/search-parent-material',function(req, res){
	var query="SELECT [Material Name], [Material Id] FROM [material].[Material] WHERE [Material Name] LIKE '%"+req.body.message+"%'";
	
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

app.post('/add-new-attribute',function(req,res){
	var query=req.body.message;
    console.log(query);
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

app.post('/executequery',function(req,res){
	var query=req.body.message;
	console.log("here:  "+query);
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

app.post('/addproduct',function(req,res){
	var query=req.body.message;
	var name=req.body.title;
	console.log("here:  "+query);
	var request=new sql.Request(connection);
	request.query(query,function(err,result){
		if(err){
			console.log("Error while querying database :- " + err);
		}else{
			var findnew="select [Product Id] from [product].[Product] where [Product Name]='"+name+"'";
			request.query(findnew,function(err,result){
				if(err){
					console.log("Error while querying database :- " + err);
				}else{
					res.send(result);
				}
			});
		}
	});
});

app.post('/addmaterial',function(req,res){
	var query=req.body.message;
	var name=req.body.title;
	console.log("here:  "+query);
	var request=new sql.Request(connection);
	request.query(query,function(err,result){
		if(err){
			console.log("Error while querying database :- " + err);
		}else{
			var findnew="select [Material Id] from [material].[Material] where [Material Name]='"+name+"'";
			request.query(findnew,function(err,result){
				if(err){
					console.log("Error while querying database :- " + err);
				}else{
					res.send(result);
				}
			});
		}
	});
});

app.post('/addlocation',function(req,res){
	var query=req.body.message;
	var name=req.body.title;
	console.log("here:  "+query);
	var request=new sql.Request(connection);
	request.query(query,function(err,result){
		if(err){
			console.log("Error while querying database :- " + err);
		}else{
			var findnew="select [Location Id] from [location].[Location] where [Location Name]='"+name+"'";
			request.query(findnew,function(err,result){
				if(err){
					console.log("Error while querying database :- " + err);
				}else{
					res.send(result);
				}
			});
		}
	});
});

app.post('/executemultiupdatequery',function(req,res){
	var queryarr=req.body.message;
	var request=new sql.Request(connection);
	request.query(queryarr[0],function(err,result){
		if(err){
			console.log("Error while querying database :- " + err);
		}else{
			console.log("queryarr[0]");
			request.query(queryarr[1],function(err,result){
				if(err){
					console.log("Error while querying database :- " + err);
				}else{
					console.log("queryarr[1]");
					request.query(queryarr[2],function(err,result){
						if(err){
							console.log("Error while querying database :- " + err);
						}else{
							console.log("queryarr[2]");
							res.send("success");
						}
					});
				}
			});
		}
	});
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
