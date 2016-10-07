class HomeController {
  constructor($scope, $stateParams, HomeService, $mdSidenav, UserService) {
    this.HomeService = HomeService;
  }
}

HomeController.$inject = ['$scope',"HomeService"]

export default HomeController;
