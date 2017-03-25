import controller from './colors.controller';
import template from './colors.template.html';

const ColorsComponent = {
  bindings: {
    currentUser: '<'
  },
  controller,
  controllerAs: '$ctrl',
  template: template
};

export default ColorsComponent;
