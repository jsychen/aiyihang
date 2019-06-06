var express = require('express');
var app = express();
let path=require('path')
 
app.use(express.static('dist'));
app.use('/dist',express.static('dist'));
 
app.get('/', function (req, res) {
	console.log(123)
   res.sendFile( path.resolve(__dirname , "./index.html") );
})

 
var server = app.listen(3000, function () {
 
 
})