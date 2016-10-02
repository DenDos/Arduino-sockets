class HeaderController {
  constructor($scope, $stateParams, HomeService, $mdSidenav) {
    this.$mdSidenav = $mdSidenav;
    this.HomeService = HomeService;
    this.users = "asdfasdf ";
    this.toggleLeft  = this.buildToggler('left');
    this.toggleRight = this.buildToggler('right');

  }

  buildToggler(componentId) {
      return function() {
        this.$mdSidenav(componentId).toggle();
      }
    }

  $onInit() {
  }
}

HeaderController.$inject = ['$scope', '$stateParams', "HomeService", "$mdSidenav"]

export default HeaderController;
