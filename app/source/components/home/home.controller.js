class HomeController {
  constructor($scope, $stateParams, HomeService, $mdSidenav, UserService) {
    this.$mdSidenav = $mdSidenav;
    this.HomeService = HomeService;
    this.users = "asdfasdf ";
    this.toggleLeft  = this.buildToggler('left');
    this.toggleRight = this.buildToggler('right');

    // UserService.getCurrentUser()
    // .then((data)=>{
    //   debugger
    // })

  }

  buildToggler(componentId) {
      return function() {
        this.$mdSidenav(componentId).toggle();
      }
    }

  $onInit() {
  }
}

HomeController.$inject = ['$scope', '$stateParams', "HomeService", "$mdSidenav", 'UserService']

export default HomeController;
