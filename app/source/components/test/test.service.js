class TestService {

  constructor(config, $http, $window, $rootScope) {
    this.$http = $http;
    this.config = config;
  }

  $onInit() {
  }

  getUsers() {
    return this.$http.get(this.config.api_path + '/users')
  }
}

TestService.$inject = ['config','$http', '$window', '$rootScope'];

export default TestService;
