import angular from 'angular';
import User from './user';
import socket from './socket';


const sharedServices = angular
  .module('app.sharedServices', [
    User,
    socket
  ])
  .name;

export default sharedServices;
