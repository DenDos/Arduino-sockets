import controller from './app.controller'
const AppComponent = {
    controller,
    template: `
    <div>
        <div ui-view></div>
    </div>
  `
};

export default AppComponent;
