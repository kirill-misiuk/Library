class AuthController {
  constructor(AuthService) {
    this.authService = AuthService;
  }

  initialize() {
    this.authService.initialize();
  }

  signIn(req, res) {
    res.status(200).json({ status: res.statusCode, user: req.user});
}
}
module.exports = AuthController;
