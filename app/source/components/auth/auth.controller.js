class AuthController {
  constructor(AuthService, UserService, $scope, $mdDialog) {
    this.$mdDialog     = $mdDialog;
    this.AuthService   = AuthService;
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

  cancel(){
    this.$mdDialog.cancel();
  }

  modal(ev) {
    this.$mdDialog.show({
      controller: ($scope) => {
      },
      template: '<login-form on-close="cancel($event)" current_user="auth.currentUser"></login-form>',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
    })
    .then(function(answer) {
    }, function() {
    });

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
    this.AuthService.logout()
  }

  isAuthed() {
    return this.AuthService.isAuthed()
  }

}

AuthController.$inject = ['AuthService', 'UserService', '$scope', "$mdDialog"];

export default AuthController;
