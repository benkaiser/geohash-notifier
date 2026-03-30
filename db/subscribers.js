let mongoose = require('mongoose');

class SubscriberModel {
  constructor() {
    this.model = mongoose.model(this.name, this.modelProperties());
  }

  modelProperties() {
    var subscriberSchema = new mongoose.Schema({
      subscription: Object,
      latitude: Number,
      longitude: Number,
      radius: Number,
      lastNotified: String,
    });
    subscriberSchema.methods.updateNotified = this.updateNotified;
    subscriberSchema.methods.needsNotify = this.needsNotify;
    return subscriberSchema;
  }

  needsNotify(date) {
    return (this.lastNotified == undefined || this.lastNotified < date);
  }

  async updateNotified(date) {
    if (this.lastNotified === undefined || date > this.lastNotified) {
      this.set('lastNotified', date);
    }
    await this.save();
  }

  get name() { return 'subscribers'; }
}

module.exports = SubscriberModel;
