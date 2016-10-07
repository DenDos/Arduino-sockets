import controller  from './auth.controller';
import template    from './auth.template.html';

const AuthComponent = {
  bindings: {
    currentUser: '<'
  },
  controller,
  controllerAs: 'auth',
  template: template,
};


export default AuthComponent;
