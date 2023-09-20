import MyComponent from './MyComponent.vue';

const MyPlugin = {
  install(app) {
    app.component('my-component', MyComponent);
  },
};

export default MyPlugin;