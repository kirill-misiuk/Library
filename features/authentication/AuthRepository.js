const { of } = require('rxjs');
const { mergeMap, map } = require('rxjs/operators');
const fs = require('fs');
const uuidv4 = require('uuid/v4');

const db = JSON.parse(fs.readFileSync('./repositories/users.json'));
class AuthRepository {
  constructor() {
    this.collection = db;
  }

  findOne(param) {
    if (param._id) {
      return of(this.collection.users.find((user) => user.id === param._id));
    }
    return of(this.collection.users.find((user) => user.username === param.username));
  }


  create(user) {
    return of({ id: uuidv4(), ...user })
      .pipe(mergeMap((newUser) => of(this.collection.users.push(newUser)).pipe(
        map(() => newUser),
      )));
  }
}

module.exports = AuthRepository;
