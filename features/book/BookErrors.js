class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.name = 'status 400';
    this.message = message;
  }
}
module.exports = { ConflictError };
