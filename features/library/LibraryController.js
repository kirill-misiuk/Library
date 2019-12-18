const { validationResult } = require('express-validator');

class LibraryController {
  constructor(LibraryService) {
    this.libraryService = LibraryService;
  }

  getAllLibraries(req, res) {
    this.libraryService.getAllLibraries().subscribe({
      next: (library) => res.status(200).json({ status: res.statusCode, library }),
      error: (e) => res.status(400).json({ status: res.statusCode, e }),
    });
  }

  createLibrary(req, res) {
    const errors = validationResult(req);
    this.libraryService.createLibrary(req.body).subscribe({
      next: (library) => res.status(201).json({ status: res.statusCode, library }),
      error: (e) => (!errors.isEmpty() ? res.status(422).json({ errors: errors.array() })
        : res.status(400).json({ status: res.statusCode, message: e })),
    });
  }

  getById(req, res) {
    this.libraryService.getById(req.params.library_id).subscribe({
      next: (library) => (library === null
        ? res.status(404).json({ status: res.statusCode, libraries: library })
        : res.status(200).json({ status: res.statusCode, libraries: library })),
      error: (e) => res.status(400).json({ status: res.statusCode, message: e }),
    });
  }

  updateLibrary(req, res) {
    const errors = validationResult(req);
    const lib = { ...req.params, ...req.body};
    this.libraryService.updateLibrary(lib).subscribe({
      next: (library) => {
        library === null ? res.status(404).json({ status: res.statusCode, libraries: library })
          : res.status(200).json({ status: res.statusCode, libraries: library });
      },
      error: (e) => (!errors.isEmpty() ? res.status(422).json({ errors: errors.array() })
        : res.status(400).json({ status: res.statusCode, message: e })),
    });
  }

  deleteLibrary(req, res) {
    this.libraryService.deleteLibrary([req.params.library_id]).subscribe({
      next: (id) => {
        id[0] === null ? res.status(404).json({ status: res.statusCode, libraries: id })
          : res.status(200).json({ status: res.statusCode, libraries: id });
      },
      error: (e) => {
        res.status(400).json({ status: res.statusCode, message: e });
      },
    });
  }
}
module.exports = LibraryController;
