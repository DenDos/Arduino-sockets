class HomeService {

  constructor(config, $http, $window, $rootScope) {
    this.$http = $http;
    this.config = config;
  }

  $onInit() {
  }

}

HomeService.$inject = ['config','$http', '$window', '$rootScope'];

export default HomeService;
