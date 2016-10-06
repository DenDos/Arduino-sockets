import controller from './home.controller';
import template from './home.template.html';

const HomeComponent = {
  bindings: {
    currentUser: '<'
  },
  controller,
  controllerAs: '$ctrl',
  template: template
};

export default HomeComponent;
