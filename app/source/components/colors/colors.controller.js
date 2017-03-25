class ColorsController {
  constructor($scope, ColorsService, $firebaseObject, config, FirebaseService) {
    this.$scope = $scope;
    this.ColorsService = ColorsService;
    this.FirebaseService = FirebaseService;
    this.$firebaseObject = $firebaseObject;
    this.init();
  }

  init() {
    this.firebaseModule = this.FirebaseService.init();
    this.colorsRef      = this.FirebaseService.getDatabase('colors');
    this.firebaseData   =  this.$firebaseObject(this.colorsRef);

    this.colorsRef.on('value', (dataSnapshot) => {
      let rgb = dataSnapshot.val();
      this.colorPicker = this.ColorsService.RGBToHex(rgb.red, rgb.green, rgb.blue)
    })

  }

  colorChage() {
    let rgb = this.ColorsService.hexToRGB(this.colorPicker);
    this.FirebaseService.sendToDb( this.colorsRef, this.firebaseData, rgb )
  }
}

export default ColorsController;
