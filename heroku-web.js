var gzippo = require('gzippo');
var express = require('express');
var morgan = require('morgan')
var app = express();

app.use(morgan('dev'));
app.use(gzippo.staticGzip("" + __dirname + "/build"));
app.get('/', function (req, res) {
  res.sendfile('./build/index.html')
})

app.listen(process.env.PORT || 5000);