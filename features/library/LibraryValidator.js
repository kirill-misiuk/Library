const { validationResult } = require('express-validator');

class LibraryValidator {
  constructor() {
  }

  getAllLibraries(req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(422).json({ status: res.statusCode, errors: Error.array() });
    }
    next();
  }

  createLibrary(req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty() && result.errors[0].value !== undefined) {
      return res.status(422).json({ status: res.statusCode, errors: Error.array() });
    }
    next();
  }

  updateLibrary(req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty() && result.errors[0].value !== undefined) {
      return res.status(422).json({ status: res.statusCode, errors: result.array() });
    }
    next();
  }

  getById(req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(422).json({ status: res.statusCode, errors: Error.array() });
    }
    next();
  }

  deleteLibrary(req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(422).json({ status: res.statusCode, errors: Error.array() });
    }
    next();
  }
}
module.exports = LibraryValidator;
