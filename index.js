var express = require('express');
var app = express();

require('./initializers');

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(function(req, res, next) {
  res.locals.env = process.env;
  res.locals.vapidPublicKey = process.env.VAPID_PUBLIC_KEY;
  next();
});
app.use(require('./controllers'));

app.listen(process.env.PORT || 3000, function() {
  console.log('Ready to rock!');
});
