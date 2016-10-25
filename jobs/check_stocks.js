let db = require('../db');
var geohash = require('geohash-coordinates');
var async = require('async');

class CheckStocks {
  perform() {
    db.subscribers.find({}, (err, docs) => {
      this.cache(() => {
        async.each(docs, this.check.bind(this), () => db.close());
      });
    });
  }

  cache(callback) {
    console.log('attempting to cache stock information...');
    geohash.latest(this.geohashOptions(), callback);
  }

  check(subscriber, callback) {
    console.log('fetching geohash for:');
    console.log(subscriber);
    geohash.latest(this.geohashOptions({
      location: `${subscriber.latitude},${subscriber.longitude}`,
    }), (err, results) => {
      console.log('geohash information:');
      console.log(results);
      callback();
    });
  }

  geohashOptions(moreoptions = {}) {
    return Object.assign({ cache: '/tmp' }, moreoptions);
  }
}

new CheckStocks().perform();
