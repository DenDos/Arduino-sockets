import template   from './header.template.html'
import controller from './header.controller'

const HeaderComponent = {
    bindings:{
      currentUser: '<'
    },
    controller,
    controllerAs: '$ctrl',
    template: template
};
export default HeaderComponent;
