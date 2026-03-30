var moment = require('moment');
var webpush = require('web-push');

webpush.setVapidDetails(
  process.env.VAPID_SUBJECT || 'mailto:geohash@example.com',
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

class NotifySubscriber {
  constructor(distance, point, subscriber) {
    this.distance = distance;
    this.point = point;
    this.subscriber = subscriber;
  }

  async perform() {
    if (this.subscriber.needsNotify(this.point.date)) {
      console.log(`notifying subscriber ${this.subscriber._id} for date ${this.point.date}`);
      await this.sendPush();
    }
  }

  prettyDate() {
    return moment(this.point.date).format('dddd Do MMM');
  }

  payload() {
    const distanceKm = (this.distance / 1000).toFixed(1);
    return JSON.stringify({
      title: 'Geohash Nearby! ' + this.prettyDate(),
      body: `A geohash is ${distanceKm} km from your location!`,
      url: `https://www.openstreetmap.org/?mlat=${this.point.latitude}&mlon=${this.point.longitude}#map=12/${this.point.latitude}/${this.point.longitude}`,
    });
  }

  async sendPush() {
    try {
      await webpush.sendNotification(this.subscriber.subscription, this.payload());
      await this.subscriber.updateNotified(this.point.date);
    } catch (err) {
      if (err.statusCode === 410 || err.statusCode === 404) {
        console.log(`Subscription expired for subscriber ${this.subscriber._id}, removing...`);
        await this.subscriber.deleteOne();
      } else {
        console.error('Push notification error:', err);
      }
    }
  }
}

module.exports = NotifySubscriber;
