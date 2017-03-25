import angular from 'angular';
import FirebaseService from './firebase.service';


const firebase = angular
  .module('firebaseModule', [])
  .service('firebaseService', FirebaseService)
  .name;

export default firebase;
