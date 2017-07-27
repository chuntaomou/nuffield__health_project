var express = require('express');
var router = express.Router();

/* GET product-info page. */
router.get('/product-info', function(req, res, next) {
  res.render('product-info', { title: 'Express' });
});

module.exports = router;