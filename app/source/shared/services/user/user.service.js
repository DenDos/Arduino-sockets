class UserService {

  constructor($http, $window, $rootScope, $q, AuthService) {
    this.$http = $http;
    this.$window = $window;
    this.$rootScope = $rootScope;
    this.$q = $q;
    this.API   = '/api';
    var token  = this.$window.localStorage.jwtToken;
    this.token = token;
    this.auth  = AuthService
  }

  $onInit() {
  }



  saveToken(token) {
    this.$window.localStorage.jwtToken = token;
  }

  getCurrentUserGroups() {
    return this.$http.get(this.API + '/protected/current_user/groups')
  }

  getUserInfo(id) {
    var promise;
    promise = this.$http.get(this.API + '/protected/user/' + id);
    return promise;
  }

  getCurrentUser () {
    var promise;
    if(this.auth.isAuthed()){
      promise = this.$http.get(this.API + '/protected/current_user', {
        headers: {
          Authorization: this.auth.getToken()
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
    return this.$http.get(this.API + '/users')
  }

  register(params) {
    if (params === undefined) {
      params = {}
    }
    return this.$http.post(this.API + '/user', {
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
    return this.$http.post(this.API + '/authenticate', {
        email: params.email,
        password: params.password,
      })
  }

  update(params) {
    console.log(params);
    return this.$http.put(this.API + '/protected/user', {
        fullname: params.fullname,
        description: params.description
      })
  }
}

UserService.$inject = ['$http', '$window', '$rootScope', '$q', 'AuthService'];

export default UserService;
