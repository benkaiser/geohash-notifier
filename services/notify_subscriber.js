var moment = require('moment');
var nodemailer = require('nodemailer');
var pug = require('pug');

var transporter = nodemailer.createTransport(process.env.SMTP_URL);

class NotifySubscriber {
  constructor(distance, point, subscriber) {
    this.distance = distance;
    this.point = point;
    this.subscriber = subscriber;
  }

  perform(callback) {
    if (this.subscriber.needsNotify(this.point.date)) {
      console.log(`notifying ${this.subscriber.email} for date ${this.point.date}`);
      this.sendEmail(callback);
    } else {
      callback();
    }
  }

  mailHTML() {
    return pug.renderFile('views/email.pug', {
      distance: this.distance,
      point: this.point,
      prettyDate: this.prettyDate(),
      subscriber: this.subscriber,
      env: process.env,
    });
  }

  mailOptions() {
    return {
      from: process.env.SENDER_EMAIL || 'geohash@noreply.com',
      to: this.subscriber.email,
      subject: 'Geohash Nearby! ' + this.prettyDate(),
      html: this.mailHTML(),
    };
  }

  prettyDate() {
    return moment(this.point.date).format('dddd Do MMM');
  }

  sendEmail(callback) {
    transporter.sendMail(this.mailOptions(), (err, info) => {
      if (err) console.log(err);
      if (info) console.log(info);
      this.subscriber.updateNotified(this.point.date, callback);
    });
  }
}

module.exports = NotifySubscriber;
