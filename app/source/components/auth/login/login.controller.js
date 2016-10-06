class LoginController {
  constructor(AuthService, UserService, $scope) {
    this.AuthService = AuthService
  }

  isAuthed(){
    return this.AuthService.isAuthed()
  }
}

LoginController.$inject = ['AuthService', 'UserService', '$scope'];

export default LoginController;
