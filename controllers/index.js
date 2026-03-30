var express = require('express');
var router = express.Router();

let db = require('../db');

router.get('/', function (req, res) {
  res.render('form', { vapidPublicKey: res.locals.vapidPublicKey });
});

router.post('/', async function(req, res) {
  try {
    const { subscription, latitude, longitude, radius } = req.body;

    if (!subscription || !subscription.endpoint || !latitude || !longitude || !radius) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    await db.subscribers.findOneAndUpdate(
      { 'subscription.endpoint': subscription.endpoint },
      {
        subscription: subscription,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        radius: parseFloat(radius),
      },
      { upsert: true, new: true }
    );

    res.json({ success: true, message: "Awesome! We'll let you know when a geohash is nearby" });
  } catch (err) {
    console.error('Error saving subscription:', err);
    res.status(500).json({ error: 'Failed to save subscription' });
  }
});

module.exports = router;
