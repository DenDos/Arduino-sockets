import moment from "moment"

class ColorsController {
  constructor($scope, ColorsService, $firebaseObject, config, FirebaseService) {
    this.$scope = $scope;
    this.ColorsService = ColorsService;
    this.FirebaseService = FirebaseService;
    this.$firebaseObject = $firebaseObject;
    this.init();
  }

  init() {
    this.interval = setInterval(() => { 
      this.handleConnected()
    } , 5000)
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
      this.slider      = this.catchSlider(dataValue)
      this.connected   = this.catchConnected(dataValue)
    })
  }

  catchConnected(data) {
    if (!data.connected && !this.checkDate(data.date)) {
      return false;
    }
    return true
  }

  checkDate(date) {
    return moment().subtract(5, 'seconds') > moment(date)
  }

  catchColorPicker(data) {
    return this.ColorsService.RGBToHex(data.red, data.green, data.blue)
  }


  catchSlider(data) {
    return data.slider
  }

  catchLedStatus(data) {
    return data.led
  }
  
  sliderChange() {
    this.FirebaseService.sendToDb( this.colorsRef, this.firebaseData, { slider: this.slider })
  }

  handleConnected() {
    this.FirebaseService.sendToDb( this.colorsRef, this.firebaseData, { 
      connected: false,
      date: moment().format()
    })
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
  $onDestroy() {
    clearInterval(this.interval)
  }
}

export default ColorsController;
