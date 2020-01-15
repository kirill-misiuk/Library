class ConflictError extends Error {
  constructor(bodyID, paramsID) {
    super();
    this.name = 'status 400';
    this.message = `id: ${paramsID} in params and id:${bodyID} in body are not same!`;
  }
}
module.exports = { ConflictError };
