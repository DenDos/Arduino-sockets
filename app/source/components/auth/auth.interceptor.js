import AuthService from './auth.service';


function authInterceptor (AuthService, $window) {
  if (AuthService.isAuthed()) {
    var token = AuthService.getToken()
  }
  var Auth = AuthService;
  return {

    request: function(config) {
      config.headers.Authorization = token;
      return config;
    },

    response: function(res) {
      if(res.data.token) {
        Auth.saveToken(res.data.token);
        window.location.href = '/'
      }
      return res;
    }
  }
}

authInterceptor.$inject = ['AuthService', '$window'];

export default authInterceptor;
