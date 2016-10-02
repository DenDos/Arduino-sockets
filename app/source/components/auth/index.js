// Vendor
import angular  from 'angular';
import uiRouter from 'angular-ui-router';
// Auth
import AuthComponent   from './auth.component';
import AuthController  from './auth.controller';
import AuthService     from './auth.service';
import UserService     from '../../shared/services/user/user.service';
import authInterceptor from './auth.interceptor';

// login
import loginTemplate  from './login.template.html'
import LoginComponent from './login.component'

// registration
import regTemplate  from './reg.template.html'
import RegComponent from './reg.component'



const auth = angular
  .module('auth', [
    uiRouter
  ])
  .component('login', LoginComponent)
  .component('reg', RegComponent)
  .component('auth', AuthComponent)
  .service('AuthService', AuthService)
  .service('UserService', UserService)
  .factory('authInterceptor', authInterceptor)
  .controller('AuthCtrl', AuthController)
  // REVIEW: Вынести в глобальный конфиг.
  .constant('API', 'http://localhost:3000')
  .config(($stateProvider, $urlRouterProvider, $httpProvider) => {
    $stateProvider
      .state('auth', {
        abstract: true,
        url: '/auth',
        component: 'auth',

        // onEnter: function($state, AuthService){
        //   if(AuthService.isAuthed()){
        //     $state.go('mainNav');
        //   }
        // }
      })
      .state('registration', {
        url: '/registration',
        component: 'reg'
      })
      .state('auth.login', {
        url: '/login',
        component: 'login'
      })
    $httpProvider.interceptors.push('authInterceptor');
  })

  .name;

export default auth;
