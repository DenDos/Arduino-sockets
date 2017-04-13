class AuthService {
  constructor($window) {
    this.$window = $window;
  }

  saveToken(token) {
    this.$window.localStorage.arduinoJwtToken = token;
  }

  getToken() {
    return this.$window.localStorage.arduinoJwtToken;
  }

  parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(this.$window.atob(base64));
  }

  isAuthed() {
    var token = this.getToken();
    if(token) {
      var params = this.parseJwt(token);
      return Math.round(new Date().getTime() / 1000) <= params.exp;
    } else {
      return false;
    }
  }

  logout() {
    this.$window.localStorage.removeItem('arduinoJwtToken');
     window.location.href = '/';
  }

}

AuthService.$inject = ['$window'];

export default AuthService;
