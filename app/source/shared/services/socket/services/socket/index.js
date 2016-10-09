import angular from 'angular';
import uiRouter from 'angular-ui-router';
import SocketFactory from './socket.factory.js';
import 'angular-socket-io';


const socket = angular
  .module('socket', [
    uiRouter,
    'btford.socket-io'
  ])
  .factory('socket', SocketFactory)
  .name;

export default socket;
