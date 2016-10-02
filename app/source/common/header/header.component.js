import template   from './header.template.html'
import controller from './header.controller'

const HeaderComponent = {
    bindings:{
      main: '@'
    },
    controller,
    controllerAs: '$ctrl',
    template: template
};
export default HeaderComponent;
