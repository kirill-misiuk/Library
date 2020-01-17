const { validationResult } = require('express-validator');
const { ConflictError } = require('../../common/Errors');

class LibraryValidator {
  getAllLibraries(req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(422).json({ status: res.statusCode, errors: result.array() });
    }
    next();
  }

  createLibrary(req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(422).json({ status: res.statusCode, errors: result.array() });
    }
    next();
  }

  updateLibrary(req, res, next) {
    if (req.body._id !== req.params._id) {
      throw new ConflictError(req.body.id, req.params.id);
    }
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

  deleteLibrary(req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(422).json({ status: res.statusCode, errors: result.array() });
    }
    next();
  }
}

module.exports = LibraryValidator;
