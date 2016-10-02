import Header             from './header';

import angular            from 'angular';

const common = angular
  .module('app.common', [
    Header
  ])
  .name;

export default common;
