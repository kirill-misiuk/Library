class LibraryController {
  constructor(LibraryService) {
    this.libraryService = LibraryService;
  }

  getAllLibraries(req, res) {
    this.libraryService.getAllLibraries().subscribe({
      next: (data) => res.status(200).json({ status: res.statusCode, data }),
      error: (e) => res.status(e.statusCode || 400).json({ status: res.statusCode, message: e.message }),
    });
  }

  createLibrary(req, res) {
    const lib = req.body;
    this.libraryService.createLibrary(lib).subscribe({
      next: (data) => res.status(201).json({ status: res.statusCode, data }),
      error: (e) => (res.status(e.statusCode || 400).json({ status: res.statusCode, message: e.message })),
    });
  }

  getById(req, res) {
    const { id } = req.params;
    this.libraryService.getById(id).subscribe({
      next: (data) => (!data
        ? res.status(404).json({ status: res.statusCode, message: 'Not found' })
        : res.status(200).json({ status: res.statusCode, data })),
      error: (e) => res.status(e.statusCode || 400).json({ status: res.statusCode, message: e.message }),
    });
  }

  updateLibrary(req, res) {
    const library = req.body;
    this.libraryService.updateLibrary(library).subscribe({
      next: (data) => {
        !data ? res.status(404).json({ status: res.statusCode, message: 'Not found' })
          : res.status(200).json({ status: res.statusCode, data });
      },
      error: (e) => res.status(e.statusCode || 400).json({ status: res.statusCode, message: e.message }),
    });
  }

  getLibraries(req, res) {
    const { id } = req.params;
    this.libraryService.getLibraries(id).subscribe({
      next: (data) => res.status(200).json({ status: res.statusCode, data }),
      error: (e) => res.status(e.statusCode || 400).json({ status: res.statusCode, message: e.message }),
    });
  }

  deleteLibrary(req, res) {
    const ids = req.query.id;
    this.libraryService.deleteLibrary(Array.isArray(ids) ? ids : [ids]).subscribe({
      next: (data) => {
        res.status(200).json({ status: res.statusCode, data });
      },
      error: (e) => {
        res.status(e.statusCode || 400).json({ status: res.statusCode, message: e.message });
      },
    });
  }
}

module.exports = LibraryController;
