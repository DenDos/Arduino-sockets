import angular from 'angular';
import uiRouter from 'angular-ui-router';
import UserService from './user.service';
import userInterceptor from './user.interceptor';


const user = angular
  .module('user', [
    uiRouter
  ])
  .service('UserService', UserService)
  .constant('API', '/api')
  .factory('userInterceptor', userInterceptor)
  .config(($httpProvider)=>{
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.interceptors.push('userInterceptor');
  })
  .name;

export default user;
