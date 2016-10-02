function userInterceptor ($window, AuthService) {
  if (AuthService.isAuthed()) {
    var token = $window.localStorage.jwtToken;
  }
  var Auth = AuthService
  return {
    request: (config) => {
      config.headers.Authorization = token;
      //config.headers['Content-Type'] = 'multipart/form-data; charset=UTF-8';
      return config;
    },

    response: function(res) {
      if(res.data.token) {
        Auth.saveToken(res.data.token);
      }
      return res;
    },
  }
}

userInterceptor.$inject = ['$window', 'AuthService'];

export default userInterceptor;
