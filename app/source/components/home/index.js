import angular          from 'angular';
import uiRouter         from 'angular-ui-router';

import HomeComponent from './home.component';
import HomeService      from './home.service';

const testModule = angular
  .module('home', [
    uiRouter,
  ])
  .component('home', HomeComponent)
  .service('HomeService', HomeService)
  .config(($stateProvider, $urlRouterProvider) => {
    $stateProvider
      .state('root.home', {
        url: '/home',
        component: 'home',
        resolve: {
          currentUser: UserService => UserService.getCurrentUser()
        }
      })
  })
  .name;

export default testModule;
