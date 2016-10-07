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
import loginTemplate  from './login/login.template.html'
import LoginComponent from './login/login.component'
import LoginFormComponent from './login/login-form/login_form.component'

// registration
import regTemplate  from './registration/reg.template.html'
import RegComponent from './registration/reg.component'



const auth = angular
  .module('auth', [
    uiRouter
  ])
  .component('login', LoginComponent)
  .component('reg', RegComponent)
  .component('auth', AuthComponent)
  .component('loginForm', LoginFormComponent)
  .service('AuthService', AuthService)
  .service('UserService', UserService)
  .factory('authInterceptor', authInterceptor)
  .controller('AuthCtrl', AuthController)
  .config(($stateProvider, $urlRouterProvider, $httpProvider) => {

    $stateProvider
      .state('auth', {
        abstract: true,
        url: '/auth',
        component: 'auth'
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
