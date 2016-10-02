class AuthService {
  constructor($window) {
    this.$window = $window;
  }
  $onInit() {
  }

  saveToken(token) {
    this.$window.localStorage.jwtToken = token;
  }

  getToken() {
    return this.$window.localStorage.jwtToken;
  }

  parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(this.$window.atob(base64));
  }

  isAuthed() {
    var token = this.getToken();
    if(token) {
      var params = this.parseJwt(token);
      return Math.round(new Date().getTime() / 1000) <= params.exp;
    } else {
      return false;
    }
  }
  logout() {
    this.$window.localStorage.removeItem('jwtToken');
  }
}

AuthService.$inject = ['$window'];

export default AuthService;


// REVIEW: Общие вещии касаемые аутентификации.
// 1. Нужно определить абстраткный рутовый скоуп, который резолвит юзера, он возвращает либо юзера, либо fakse
// в итоге внутри остальных все модулей модет доступен зарезолвленный юзер как в рейлс куррент юзер.
// 2. К юзеру или в модуль аутентификации (на выбор) нужно добавить метод который проверяет есть ли токен, если есть запра
// шивает юзера. Причем к апи он обращается один раз, после успешного обращения он сохраняет данные о юзере в рутскопе и отдает из него
// При закрытие приложения или при логауте этот юзер должен очищаться. Возможно для этого лучше использовать $sessionStorage.
// В чем логика, при ПЕРВОМ запуске приложения (при октрытие сайта получается) проверяется есть ли уже у юзера токен
// если есть данные о нем сохраняются на время его сессии. Они учтожаются по выходу или по закрытию приложения.
//
