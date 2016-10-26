let async = require('async');
let geolib = require('geolib');

let NotifySubscriber = require('./notify_subscriber');

class CheckDistance {
  constructor(subscriber, geohashResults) {
    this.subscriber = subscriber;
    this.results = geohashResults;
  }

  check(point, callback) {
    let distance = this.distanceTo(point);
    if (true)
      this.notifySubscriber(distance, point);
    callback();
  }

  distanceTo(point) {
    return geolib.getDistance(this.stripPoint(this.subscriber),
                              this.stripPoint(point));
  }

  notifySubscriber(distance, point) {
    new NotifySubscriber(distance, point, this.subscriber).perform();
  }

  perform(callback) {
    async.each(this.points(), this.check.bind(this), callback);
  }

  pointFromGraticle(date, pointArray) {
    return {
      latitude: pointArray[0],
      longitude: pointArray[1],
      date: date,
    };
  }

  points() {
    return flatten(this.results.map(this.resultToPoint.bind(this)));
  }

  resultToPoint(result) {
    return [
      this.pointFromGraticle(result.date, result.graticule),
      this.pointFromGraticle(result.date, result.global),
      result.neighbors.map((neighbor) =>
        this.pointFromGraticle(result.date, neighbor)
      ),
    ];
  }

  stripPoint(point) {
    return {
      latitude: point.latitude,
      longitude: point.longitude,
    };
  }
}

function flatten(a) {
  return Array.isArray(a) ? [].concat(...a.map(flatten)) : a;
}

module.exports = CheckDistance;
