
const { MongoClient } = require('mongodb');

class AuthRepository {
  constructor() {
    this.url = process.env.DEFAULT_URL;
    this.database = process.env.DEFAULT_DATABASE;
  }

  connect() {
    console.log('Database connecting...');
    const _this = this;
    MongoClient.connect(`${this.url}/${this.database}`, { useNewUrlParser: true, useUnifiedTopology: true }).then(
      (db) => {
        _this.mongodb = db;
      }, (error) => {
        console.log('!', error);
      },
    );
  }
}
module.exports = AuthRepository;
