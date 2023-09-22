import MyComponent from './MyComponent.vue';
import SecondComponent from './SecondComponent.vue';

const MyPlugin = {
  install(app) {
    app.component('my-component', MyComponent);
    app.component('second-component', SecondComponent);
  },
};

export default MyPlugin;