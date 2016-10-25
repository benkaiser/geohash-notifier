let db = require('../db');
var geohash = require('geohash-coordinates');
var async = require('async');

class CheckStocks {
  perform() {
    db.subscribers.find({}, (err, docs) => {
      this.cache(() => {
        async.each(docs, this.check, () => db.close());
      });
    });
  }

  check(subscriber, callback) {
    console.log(subscriber);
    geohash.latest({
      location: `${subscriber.latitude},${subscriber.longitude}`,
    }, (err, results) => {
      console.log(results);
      callback();
    });
  }

  cache(callback) {
    geohash.latest({ cache: '/tmp/' }, callback);
  }
}

new CheckStocks().perform();
