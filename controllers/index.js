var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.sendFile('form.html', { root: 'views' });
});

module.exports = router;
