import angular from 'angular';
import Auth    from './auth';
import Home    from './home';
import testModule    from './test';
import ColorsModule    from './colors';


const components = angular
  .module('app.components', [
    Auth,
    Home,
    testModule,
    ColorsModule,
  ])

  .name;

export default components;
