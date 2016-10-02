import angular          from 'angular';
import uiRouter         from 'angular-ui-router';

import TestComponent from './test.component';
import TestService      from './test.service';



const testModule = angular
  .module('test', [
    uiRouter,
  ])
  .component('test', TestComponent)
  .service('TestService', TestService)
  .config(($stateProvider, $urlRouterProvider) => {
    $stateProvider
      .state('root.test', {
        url: '/test',
        component: 'test'
      })
  })
  .name;

export default testModule;
