
const { of } = require('rxjs');
const { mergeMap } = require('rxjs/operators');

class AuthService {
  constructor(authRepository, authHash) {
    this.authRepository = authRepository;
    this.authHash = authHash;
  }

  signUp({username, password}) {
    return this.authRepository.findOne({ username })
      .pipe(mergeMap((res) => {
        if (res) {
          return of(null);
        }
        return this.authRepository.create({ username, password: this.authHash.generateHash(password) });
      }));
  }
}
module.exports = AuthService;
