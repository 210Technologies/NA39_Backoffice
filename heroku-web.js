var gzippo = require('gzippo');
var express = require('express');
var morgan = require('morgan')
var app = express();

app.use(morgan('dev'));
console.log(__dirname)
app.use(gzippo.staticGzip("" + __dirname + "/build"));
app.get('/', function (req, res) {
  res.send('Hello World')
})
app.listen(process.env.PORT || 5000);