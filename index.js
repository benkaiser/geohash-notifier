var express = require('express');
var app = express();

app.use(require('./controllers'));

app.listen(process.env.PORT || 3000, function() {
  console.log('Ready to rock!');
});
