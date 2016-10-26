class NotifySubscriber {
  constructor(distance, point, subscriber) {
    this.distance = distance;
    this.point = point;
    this.subscriber = subscriber;
  }

  perform() {
    console.log(`notifying ${this.subscriber.email} that the geohash was ${this.distance} meters away`);
  }
}

module.exports = NotifySubscriber;
