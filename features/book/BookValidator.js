const { validationResult } = require('express-validator');
const { ConflictError } = require('../../common/Errors');

class BookValidator {
  constructor() {}

  getAllBooks(req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(422).json({ status: res.statusCode, errors: result.array() });
    }
    next();
  }

  getById(req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(422).json({ status: res.statusCode, errors: result.array() });
    }
    next();
  }

  createBook(req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(422).json({ status: res.statusCode, errors: result.array() });
    }
    next();
  }

  deleteBook(req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(422).json({ status: res.statusCode, errors: result.array() });
    }
    next();
  }

  updateBook(req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(422).json({ status: res.statusCode, errors: result.array() });
    }
    next();
  }
}

module.exports = BookValidator;
