var http = require('http')
  , fs = require('fs')
  , async = require('async');

async.waterfall([
  function(cb) {
    fs.readFile(process.argv[2], function(err, data){
	cb(err, data);
    }); 
  },

  function(arg1, cb) {
     var body = '';
     http.get(arg1, function(res){

          res.on('data', function(chunk){
          body += chunk.toString();
          });

          res.on('end', function(){
console.log(body);
            cb(null, body);
          });
         }).on('error', function(e) {
          cb(err);
        });

  }
 ], function(err, result){
    if (err) return console.error(err);
    console.log(result);
});
