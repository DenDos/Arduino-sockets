import controller from '../auth.controller';
import loginTemplate from './login.template.html';



const LoginComponent = {
  bindings: {
    currentUser: '<'
  },
  controller,
  controllerAs: 'auth',
  template: loginTemplate,
};


export default LoginComponent;
