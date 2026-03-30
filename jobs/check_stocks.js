let geohash = require('geohash-coordinates');

require('../initializers');
let db = require('../db');
var CheckDistance = require('../services/check_distance');

class CheckStocks {
  async perform() {
    try {
      const docs = await db.subscribers.find({});
      await this.cache();
      await Promise.all(docs.map(subscriber => this.check(subscriber)));
    } catch (err) {
      console.error('Error in check stocks:', err);
    } finally {
      db.close();
    }
  }

  cache() {
    return new Promise((resolve, reject) => {
      geohash.latest(this.geohashOptions(), (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  check(subscriber) {
    return new Promise((resolve, reject) => {
      geohash.latest(this.geohashOptions({
        location: `${subscriber.latitude},${subscriber.longitude}`,
      }), async (err, results) => {
        if (err) return reject(err);
        try {
          await new CheckDistance(subscriber, results).perform();
          resolve();
        } catch (e) {
          reject(e);
        }
      });
    });
  }

  geohashOptions(moreoptions = {}) {
    return Object.assign({ cache: '/tmp' }, moreoptions);
  }
}

new CheckStocks().perform();
