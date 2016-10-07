class HeaderController {
  constructor($scope, $stateParams, HomeService, $mdSidenav) {
    this.$mdSidenav = $mdSidenav;
    this.toggleLeft  = this.buildToggler('left');
    this.toggleRight = this.buildToggler('right');
  }

  buildToggler(componentId) {
    return function() {
      this.$mdSidenav(componentId).toggle();
    }
  }

}
export default HeaderController;
