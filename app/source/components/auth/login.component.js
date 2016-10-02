import controller from './auth.controller';
import template from './auth.template.html';
import loginTemplate from './login.template.html';



const LoginComponent = {
  controller,
  controllerAs: 'auth',
  template: loginTemplate,
};


export default LoginComponent;
