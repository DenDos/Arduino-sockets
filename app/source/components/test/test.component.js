import controller from './test.controller';
import template from './test.template.html';

const TestComponent = {
  bindings: {
    currentUser: '<'
  },
  controller,
  controllerAs: '$ctrl',
  template: template
};

export default TestComponent;
