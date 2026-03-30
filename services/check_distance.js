let geolib = require('geolib');

let NotifySubscriber = require('./notify_subscriber');

class CheckDistance {
  constructor(subscriber, geohashResults) {
    this.subscriber = subscriber;
    this.results = geohashResults;
  }

  async check(point) {
    let distance = this.distanceTo(point);
    if (distance < this.subscriber.radius * 1000) {
      await this.notifySubscriber(distance, point);
    }
  }

  distanceTo(point) {
    return geolib.getDistance(this.stripPoint(this.subscriber),
                              this.stripPoint(point));
  }

  async notifySubscriber(distance, point) {
    await new NotifySubscriber(distance, point, this.subscriber).perform();
  }

  async perform() {
    await Promise.all(this.points().map(point => this.check(point)));
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
