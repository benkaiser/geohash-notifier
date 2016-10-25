let db = require('../db');

class Seed {
  perform() {
    db.subscribers.remove({}, () => {
      db.subscribers.create({
        email: 'benjaminjkaiser@gmail.com',
        latitude: -39.5,
        longitude: 144.5,
        radius: 10,
      }, (err, docs) => {
        if (err) console.log(err);
        if (docs) console.log('docs created!');
        db.close();
      });
    });
  }
}

new Seed().perform();
