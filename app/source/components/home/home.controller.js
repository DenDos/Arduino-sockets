class HomeController {
  constructor($scope, $stateParams, HomeService, $mdSidenav, UserService, socket, $firebaseObject) {
    this.$firebaseObject = $firebaseObject;
    this.socket = socket;
    this.HomeService = HomeService;
    this.connected = false;
    this.slider  = 900;
    var config = {
      apiKey: "AIzaSyB0t0SCh_yXEv54G7PfpARAESYpTreCngk",
      authDomain: "test-50531.firebaseapp.com",
      databaseURL: "https://test-50531.firebaseio.com",
      storageBucket: "test-50531.appspot.com",
      messagingSenderId: "212272808520"
    };
    firebase.initializeApp(config);
     this.ref = firebase.database().ref().child("test");
    // create a synchronized array
    // click on `index.html` above to see it used in the DOM!
    this.messages = $firebaseObject(this.ref);
    console.log(this.messages);
  }

  sliderChange() {
    var obj = this.$firebaseObject(this.ref);
    obj.foo = this.slider;
    obj.$save().then((ref)=> {
      ref.key === obj.$id; // true
    }, function(error) {
      console.log("Error:", error);
    });
    //  this.ref.set({ as: this.slider });
    console.log(this.slider);
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
