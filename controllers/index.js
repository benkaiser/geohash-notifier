var express = require('express');
var router = express.Router();

let db = require('../db');

router.get('/', function (req, res) {
  res.render('form');
});

router.post('/', function(req, res) {
  console.log(filterBody(req.body));
  db.subscribers.create(filterBody(req.body));
  res.render('form', { alert: "Awesome! We'll let you know when a geohash is nearby" });
});

function filterBody(body) {
  var [latitude, longitude] = body.coordinates.split(',');
  return {
    email: body.email,
    latitude: parseFloat(latitude),
    longitude: parseFloat(longitude),
    radius: parseFloat(body.radius),
  };
}

module.exports = router;
