class AuthController {
  constructor(AuthService, UserService, $scope, $state, $parse) {
    this.user   = UserService;
    this.auth   = AuthService;
    this.$scope = $scope;
    this.$state = $state;
    this.$parse = $parse
    this.message = '';
    this.errors  = [];

    this.handleRequest = (res)=> {
      console.log(res)
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
  $onInit() {

  }



  login(params) {
    self = this
    this.user.login(params)
      .then(this.handleRequest, this.handleRequest)
    }

  register(params) {
    self = this
    this.user.register(params)
      .then(this.handleRequest, this.handleRequest)

  }

  logout() {
    this.auth.logout()
  }
  isAuthed() {
    return this.auth.isAuthed()
  }



}

AuthController.$inject = ['AuthService', 'UserService', '$scope', '$state', '$parse'];

export default AuthController;
