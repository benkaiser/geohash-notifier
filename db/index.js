class Database {
  constructor() {
    this.mongoose = require('mongoose');
    this.mongoose.connect(process.env.DATABASE_URL);
    this.setupModels();
  }

  close() {
    this.mongoose.connection.close();
  }

  setupModels() {
    [
      require('./subscribers'),
    ].forEach(this.setModel.bind(this));
  }

  setModel(ModelCreator) {
    let modelCreator = new ModelCreator();
    this[modelCreator.name] = modelCreator.model;
  }
}

module.exports = new Database();
