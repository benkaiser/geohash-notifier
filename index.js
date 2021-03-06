var bodyParser = require('body-parser');
var express = require('express');
var app = express();

require('./initializers');

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.locals.env = process.env;
  next();
});
app.use(require('./controllers'));

app.listen(process.env.PORT || 3000, function() {
  console.log('Ready to rock!');
});
