class UserService {

  constructor($http, $window, $rootScope, AuthService, config) {
    this.AuthService  = AuthService

    this.$http = $http;
    this.$window = $window;
    this.$rootScope = $rootScope;
    this.config    = config;

    var token  = this.$window.localStorage.jwtToken;
    this.token = token;

  }

  saveToken(token) {
    this.$window.localStorage.jwtToken = token;
  }

  getUserInfo(id) {
    return this.$http.get(this.config.api_path  + '/protected/user/' + id);
  }

  getCurrentUser () {
    var promise;
    if(this.AuthService.isAuthed()){
      promise = this.$http.get(this.config.api_path  + '/protected/current_user', {
        headers: {
          Authorization: this.AuthService.getToken()
        }
      })
    } else {
      promise = new Promise(function(resolve, reject) {
        resolve({data:{user: false}})
      })
    }
    return promise;
  }

  save() {
    this.getCurrentUser((res)=> {
      this.$rootScope.currentUser = res.data.user;
    });
  }

  getUsers() {
    return this.$http.get(this.config.api_path  + '/users')
  }

  register(params) {
    if (params === undefined) {
      params = {}
    }
    return this.$http.post(this.config.api_path  + '/user', {
        first_name: params.first_name,
        last_name: params.last_name,
        address: params.address,
        email: params.email,
        password: params.password
      })
  }

  login(params) {
    if (params === undefined) {
      params = {}
    }
    return this.$http.post(this.config.api_path  + '/authenticate', {
        email: params.email,
        password: params.password,
      })
  }

  update(params) {
    return this.$http.put(this.config.api_path  + '/protected/user', {
        fullname: params.fullname,
        description: params.description
      })
  }
}

UserService.$inject = ['$http', '$window', '$rootScope', 'AuthService', 'config'];

export default UserService;
