class HomeController {
  constructor($scope, $stateParams, HomeService, $mdSidenav, UserService, socket) {
    this.socket = socket;
    this.HomeService = HomeService;
    this.connected = false;
    this.slider  = 900;
  }

  $onInit() {
    this.socket.on('connected',(msg) => {
      this.connected = msg;
    })
  }

  $onDestroy() {
    console.log('asdfasdf');
  }

  connect(){
    this.socket.emit('connect', true)
  }

  disconnect(){
    this.socket.emit('connect', false)
  }
}

// HomeController.$inject = ['$scope', "HomeService", "socket"]

export default HomeController;
