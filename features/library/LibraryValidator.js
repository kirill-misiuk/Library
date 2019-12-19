const { validationResult } = require('express-validator');

class LibraryValidator {
  constructor(Controller) {
    this.controller = Controller;
  }

  getAllLibraries(req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(422).json({ status: res.statusCode, errors: Error.array() });
    }
    next(this.controller.getAllLibraries(req, res));
  }

  createLibrary(req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty() && result.errors[0].value !== undefined) {
      return res.status(422).json({ status: res.statusCode, errors: Error.array() });
    }
    next(this.controller.createLibrary(req, res));
  }

  updateLibrary(req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty() && result.errors[0].value !== undefined) {
      return res.status(422).json({ status: res.statusCode, errors: Error.array() });
    }
    next(this.controller.updateLibrary(req, res));
  }

  getById(req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(422).json({ status: res.statusCode, errors: Error.array() });
    }
    next(this.controller.getById(req, res));
  }

  deleteLibrary(req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(422).json({ status: res.statusCode, errors: Error.array() });
    }
    next(this.controller.deleteLibrary(req, res));
  }
}
module.exports = LibraryValidator;
