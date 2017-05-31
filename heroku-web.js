var gzippo = require('gzippo');
var express = require('express');
var morgan = require('morgan')
var app = express();

app.use(morgan('dev'));
app.use(gzippo.staticGzip("" + __dirname + "/build", {clientMaxAge: 0, maxAge: 0}));
app.get('/', function (req, res) {
  res.sendfile('./build/index.html')
  res.setHeader('Cache-Control', 'max-age=0')
})

app.listen(process.env.PORT || 5000);