class ColorsController {
  constructor($scope, $stateParams, ColorsService, $mdSidenav, UserService, socket, $firebaseObject, config) {
    this.$firebaseObject = $firebaseObject;
    this.socket = socket;
    this.ColorsService = ColorsService;

    this.connected = false;
    this.slider  = 900;
    debugger
    firebase.initializeApp(config.firebase);
    debugger

    this.ref = firebase.database().ref().child("test");
    this.ref.on('value', function(dataSnapshot) {
      console.log(dataSnapshot.val(), 'dataSnapshot');
    })
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

// ColorsController.$inject = ['$scope', "ColorsService", "socket", 'config']

export default ColorsController;
