import AuthService from './auth.service';


function authInterceptor (AuthService, $state, $window, $timeout, $rootScope) {
  if (AuthService.isAuthed()) {
    var token = AuthService.getToken()
  }
  var Auth = AuthService;
  return {

    request: function(config) {
      config.headers.Authorization = token;
      //config.headers['Content-Type'] = 'application/json; charset=UTF-8';
      return config;
    },

    response: function(res) {
      if(res.data.token) {
        Auth.saveToken(res.data.token);
        // TODO: fix it later
        //$state.go('root.home')
        window.location.href = '/'
      }

      return res;
    },
  }
}

authInterceptor.$inject = ['AuthService', '$state', '$window', '$timeout', '$rootScope'];

export default authInterceptor;
