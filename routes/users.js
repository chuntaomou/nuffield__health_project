var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	var username=req.query.name;
	res.send(username);
});

module.exports = router;
