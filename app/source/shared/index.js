import angular from 'angular';
import Services from './services';



const shared = angular
  .module('app.shared', [
    Services
  ])
  .name;

export default shared;
