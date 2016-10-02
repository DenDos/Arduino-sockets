import controller  from './auth.controller';
import template    from './auth.template.html';
import regTemplate from './reg.template.html';

const RegComponent = {
  controller,
  controllerAs: 'auth',
  template: regTemplate,
};

export default RegComponent;
