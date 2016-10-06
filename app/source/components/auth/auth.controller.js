class AuthController {
  constructor(AuthService, UserService, $scope) {
    this.UserService   = UserService;
    this.$scope = $scope;
    this.message = '';
    this.errors  = [];

    this.handleRequest = (res)=> {
      if (res.data.success == false) {
        self.message = res.data.message
        self.$scope.serverErrors = res.data.message
        if (res.data.error){
          this.errors = res.data.error.errors
        }
      }
      var token = res.data ? res.data.token : null;
    }
  }

  login(params) {
    self = this
    this.UserService.login(params)
      .then(this.handleRequest, this.handleRequest)
  }

  register(params) {
    self = this
    this.UserService.register(params)
      .then(this.handleRequest, this.handleRequest)

  }

  logout() {
    this.auth.logout()
  }

  isAuthed() {
    return this.auth.isAuthed()
  }

}

AuthController.$inject = ['AuthService', 'UserService', '$scope'];

export default AuthController;
