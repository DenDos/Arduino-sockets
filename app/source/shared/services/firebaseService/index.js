import angular from 'angular';
import FirebaseService from './firebase.service';


const firebase = angular
  .module('firebaseService', [])
  .service('FirebaseService', FirebaseService)
  .name;

export default firebase;
