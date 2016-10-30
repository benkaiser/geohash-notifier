var express = require('express');
var router = express.Router();

let db = require('../db');

router.get('/', function (req, res) {
  res.render('form');
});

router.post('/', function(req, res) {
  db.subscribers.create(filterBody(req.body));
  res.render('form', { alert: "Awesome! We'll let you know when a geohash is nearby" });
});

router.get('/unsubscribe', function(req, res) {
  db.subscribers.find({ $or: [
    { _id: req.query.id },
    { email: req.query.email }
  ]}).remove().exec();
  res.render('form', { alert: 'Unsubscribe successful'});
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
