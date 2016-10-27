let db = require('../db');

class Seed {
  perform() {
    db.subscribers.remove({}, () => {
      db.subscribers.create({
        email: 'benjaminjkaiser@gmail.com',
        latitude: -38.11294978918962,
        longitude: 144.18869018554688,
        radius: 30
      }, (err, docs) => {
        if (err) console.log(err);
        if (docs) console.log('docs created!');
        db.close();
      });
    });
  }
}

new Seed().perform();
