import angular from 'angular';
import uiRouter from 'angular-ui-router';
import SocketFactory from './socket.factory.js';


const socket = angular
  .module('socket', [
    uiRouter
  ])
  .factory('socket', SocketFactory)
  .name;

export default socket;
