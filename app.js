var app = require('express')();
var http = require('http').Server(app);

app.get('/', function(req, res){
  res.send('<h1>Hello connect 4!</h1>');
});

http.listen(process.env.PORT || 3000, function(){
  console.log('listening on *:' + process.env.PORT);
});