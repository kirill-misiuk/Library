class LibraryController {
  constructor(LibraryService) {
    this.libraryService = LibraryService;
  }

  getAllLibraries(req, res) {
    this.libraryService.getAllLibraries().subscribe({
      next: (data) => res.status(200).json({ status: res.statusCode, data }),
      error: (e) => res.status(400).json({ status: res.statusCode, message: e.message }),
    });
  }

  createLibrary(req, res) {
    const lib = req.body;
    this.libraryService.createLibrary(lib).subscribe({
      next: (data) => res.status(201).json({ status: res.statusCode, data }),
      error: (e) => (res.status(400).json({ status: res.statusCode, message: e.message })),
    });
  }

  getById(req, res) {
    const { id } = req.params;
    this.libraryService.getById(id).subscribe({
      next: (data) => (!data
        ? res.status(404).json({ status: res.statusCode, message: 'Not found' })
        : res.status(200).json({ status: res.statusCode, data })),
      error: (e) => res.status(400).json({ status: res.statusCode, message: e.message }),
    });
  }

  updateLibrary(req, res) {
    const id = req.params;
    const library = req.body;
    if (id.id === library.id) {
      this.libraryService.updateLibrary(library).subscribe({
        next: (data) => {
          !data ? res.status(404).json({ status: res.statusCode, message: 'Not found' })
            : res.status(200).json({ status: res.statusCode, data });
        },
        error: (e) => res.status(400).json({status: res.statusCode, message: e.message}),
      });
    } else res.status(409).json({ status: res.statusCode, message: 'Conflict params and body data' });
  }

  deleteLibrary(req, res) {
    let ids = req.query.id;
    if (!Array.isArray(ids)) ids = [ids];
    this.libraryService.deleteLibrary(ids).subscribe({
      next: (data) => {
        res.status(200).json({ status: res.statusCode, data });
      },
      error: (e) => {
        res.status(400).json({ status: res.statusCode, message: e.message });
      },
    });
  }
}

module.exports = LibraryController;
