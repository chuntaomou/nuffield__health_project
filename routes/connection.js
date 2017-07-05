var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	var dbConfig = {
    user:  'ucabcm2',
    password: 'Mct.niub74110',
    server: 'nuffieldhealth20170610.database.windows.net',
    options: {
      encrypt: true,
      database: 'nuffieldhealth_db'
    }
};

var connection = new sql.Connection(dbConfig);
connection.connect().then(function(){
  console.log("connected");
  //var query="SELECT * FROM Items ORDER BY Updatetime ASC";
  //display(query,res);
}).catch(function(err){
  console.log(err);
});

});

module.exports = router;