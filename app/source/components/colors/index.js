import angular          from 'angular';
import uiRouter         from 'angular-ui-router';

import ColorsComponent from './colors.component';
import ColorsService      from './colors.service';

const testModule = angular
  .module('colors', [
    uiRouter,
  ])
  .component('colors', ColorsComponent)
  .service('ColorsService', ColorsService)
  .config(($stateProvider, $urlRouterProvider) => {
    $stateProvider
      .state('root.colors', {
        url: '/colors',
        component: 'colors',
        resolve: {
          currentUser: UserService => UserService.getCurrentUser()
        }
      })
  })
  .name;

export default testModule;
