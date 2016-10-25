let mongoose = require('mongoose');

class SubscriberModel {
  constructor() {
    this.model = mongoose.model(this.name, this.modelProperties());
  }

  modelProperties() {
    return {
      email: String,
      latitude: Number,
      longitude: Number,
      radius: Number,
    };
  }

  get name() { return 'subscribers'; }
}

module.exports = SubscriberModel;
