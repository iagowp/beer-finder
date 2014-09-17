var http = require('http');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();
app.set('port', process.env.PORT || 3000);

require('./routes.js')(app);

//this tells Express to parse the incoming body data.  This will be called before other 
//route handlers, to req.body can be passed directly to driver code as js object.
app.use(bodyParser());

//this tells press to use express.static middleware to serve files in response to incoming requests
//maps local subfolder 'public' (which we don't have yet) to the base route '/'
//'path' module creates a platform-independent subfolder string. 
//anything in /public can now be accessed by name. 
app.use(express.static(path.join(__dirname, 'public')));  

var beerget = function(path) {
  //deleted the url and key to push to github since it's a public repo.
  var beerDBurl = ''
  var key = ''
  var requestUrl = beerDBurl + path + '/?key=' + key

  http.get(requestUrl, function(res) {
    console.log(res);
  }).on('error', function(e) {
    console.log('There was an error: ' + e.message);
  })
};
      

http.createServer(app).listen(app.get('port'), function(){
  console.log('Server listening on port ' + app.get('port'));
});

// beerget(); 