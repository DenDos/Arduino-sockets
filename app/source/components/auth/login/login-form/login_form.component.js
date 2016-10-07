import controller from '../../auth.controller';
import loginTemplate from './login_form.template.html';



const LoginFormComponent = {
  bindings: {
    currentUser: '<'
  },
  controller,
  controllerAs: 'auth',
  template: loginTemplate,
};


export default LoginFormComponent;
