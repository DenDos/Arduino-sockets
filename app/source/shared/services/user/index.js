import angular from 'angular';
import uiRouter from 'angular-ui-router';
import UserService from './user.service';


const user = angular
  .module('user', [
    uiRouter
  ])
  .service('UserService', UserService)
  .constant('API', '/api')
  .config(($httpProvider)=>{
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  })
  .name;

export default user;
