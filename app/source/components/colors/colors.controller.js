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
    this.handlaChangeValue(this.colorsRef);
    
  }

  handlaChangeValue(ref) {
    ref.on('value', (dataSnapshot) => {
      let dataValue = dataSnapshot.val();
      this.colorPicker = this.catchColorPicker(dataValue)
      this.ledStatus   = this.catchLedStatus(dataValue)
    })
  }

  catchColorPicker(data) {
    return this.ColorsService.RGBToHex(data.red, data.green, data.blue)
  }

  catchLedStatus(data) {
    return data.led
  }

  ledOn() {
    this.FirebaseService.sendToDb( this.colorsRef, this.firebaseData, { led: true })
  }

  ledOff() {
    this.FirebaseService.sendToDb( this.colorsRef, this.firebaseData, { led: false })
  }

  colorChage() {
    let rgb = this.ColorsService.hexToRGB(this.colorPicker);
    this.FirebaseService.sendToDb( this.colorsRef, this.firebaseData, rgb )
  }
}

export default ColorsController;
