import controller  from '../auth.controller';
import regTemplate from './reg.template.html';

const RegComponent = {
  controller,
  controllerAs: 'auth',
  template: regTemplate,
};

export default RegComponent;
