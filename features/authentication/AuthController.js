class BookController {
  constructor(AuthService) {
    this.bookService = AuthService;
  }

  initialize() {
    this.bookService.initialize();
  }

  signIn(req, res) {
    const { username } = req.body;
    const { password } = req.body;
    this.bookService.localSignIn(username, password).subscribe({
      next: (data) => res.status(200).json({ status: res.statusCode, user: data }),
      error: (e) => res.status(e.statusCode || 401).json({ status: res.statusCode, message: e.message }),
    });
  }

  signUp(req, res) {

  }
}
module.exports = BookController;
