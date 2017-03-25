class ColorsService {

  constructor(config, $http, $window, $rootScope) {
    this.$http   = $http;
    this.config  = config;
  }

  $onInit() {
  }

  RGBToHex(r,g,b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  hexToRGB(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  	return result ? {
  		red: parseInt(result[1], 16),
  		green: parseInt(result[2], 16),
  		blue: parseInt(result[3], 16)
  	} : null;
  }
}

ColorsService.$inject = ['config','$http', '$window', '$rootScope'];

export default ColorsService;
