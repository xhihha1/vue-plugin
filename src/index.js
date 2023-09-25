import MyComponent from './MyComponent.vue';
import SecondComponent from './SecondComponent.vue';
import DragCtrlChatDialog from './DragCtrlChatDialog.vue';

const MyPlugin = {
  install(app) {
    app.component('my-component', MyComponent);
    app.component('second-component', SecondComponent);
    app.component('drag-ctrl-chat-dialog', DragCtrlChatDialog);
  },
};

export default MyPlugin;