var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/products', function(req, res, next) {
  res.render('products', { title: 'Express' });
});

router.post('/products', function(req,res){
	//var obj={};
	console.log(req.body);
	//res.render('endpoint', { });
});

module.exports = router;
