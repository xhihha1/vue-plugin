declare module 'xhihha1-vue-plugin' {
    import { App } from 'vue';
  
    const MyPlugin: {
      install: (app: App) => void;
    };
  
    export default MyPlugin;
}