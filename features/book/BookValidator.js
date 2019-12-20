const { validationResult } = require('express-validator');

class BookValidator {
  constructor() {}

  getAllBooks(req, res,next) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(422).json({ status: res.statusCode, errors: Error.array() });
    }
    next();
  }

  getById(req, res,next) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(422).json({ status: res.statusCode, errors: Error.array() });
    }
    next();
  }

  createBook(req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty() && result.errors[0].value !== undefined) {
      return res.status(422).json({ status: res.statusCode, errors: Error.array() });
    }
    next();
  }

  deleteBook(req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(422).json({ status: res.statusCode, errors: Error.array() });
    }
    next();
  }

  updateBook(req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty() && result.errors[0].value !== undefined) {
      return res.status(422).json({ status: res.statusCode, errors: Error.array() });
    }
    next();
  }
}
module.exports = BookValidator;
