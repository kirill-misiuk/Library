class ConflictError extends Error {
  constructor() {
    super();
    this.name = 'status 400';
    this.message = 'id in params and body are not same!';
  }
}
module.exports = { ConflictError };
