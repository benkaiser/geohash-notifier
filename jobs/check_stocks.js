let async = require('async');
let geohash = require('geohash-coordinates');

let db = require('../db');
var CheckDistance = require('../services/check_distance');

class CheckStocks {
  perform() {
    db.subscribers.find({}, (err, docs) => {
      this.cache(() => {
        async.each(docs, this.check.bind(this), () => db.close());
      });
    });
  }

  cache(callback) {
    geohash.latest(this.geohashOptions(), callback);
  }

  check(subscriber, callback) {
    geohash.latest(this.geohashOptions({
      location: `${subscriber.latitude},${subscriber.longitude}`,
    }), (err, results) => {
      new CheckDistance(subscriber, results).perform(callback);
    });
  }

  geohashOptions(moreoptions = {}) {
    return Object.assign({ cache: '/tmp' }, moreoptions);
  }
}

new CheckStocks().perform();
