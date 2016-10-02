// Vendor
import angular      from 'angular';
import uiRouter     from 'angular-ui-router';
import 'angular-validation'
import 'angular-validation/dist/angular-validation-rule'
import 'angular-loading-bar'
import 'angular-animate'
import 'angular-socket-io'
import 'angular-material'


// Config
import config from "./config"

// App
import AppComponent from './app.component';
import Components   from './components';
import Shared       from './shared';
import Common       from './common';



const app = angular
  .module('arduino', [
    uiRouter,
    Shared,
    Common,
    Components,
    'ngMaterial',
    'ngAnimate'
  ])
  .component('app', AppComponent)
  .constant('config', config)
  .config(['$stateProvider', '$urlRouterProvider','$locationProvider', '$mdThemingProvider',
  function($stateProvider, $urlRouterProvider,$locationProvider, $mdThemingProvider){
    $urlRouterProvider.otherwise("/")
    $locationProvider.html5Mode(true)
    // Enable browser color
    $mdThemingProvider.theme('default')
    .primaryPalette('teal');

    $stateProvider
      .state('root', {
        url: '',
        abstract: true,
        component: 'app',
      })

  }])
  .run(function($rootScope, $state, $location, $transitions, AuthService){

  })
  .name



export default app
