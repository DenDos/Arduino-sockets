import angular          from 'angular';
import User             from './user';
import socket           from './socket';
import firebaseService  from './firebaseService';


const sharedServices = angular
  .module('app.sharedServices', [
    User,
    socket,
    firebaseService,
  ])
  .name;

export default sharedServices;
