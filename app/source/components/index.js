import angular from 'angular';
import Auth    from './auth';
import Home    from './home';
import testModule    from './test';


const components = angular
  .module('app.components', [
    Auth,
    testModule,
    Home
  ])

  .name;

export default components;
