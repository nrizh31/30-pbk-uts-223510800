import { createApp } from 'vue';
import App from './App.vue';
import router from './router/indexRouter.js';  // Corrected import
import { createPinia } from 'pinia';
import { Quasar } from 'quasar';

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css';

// Import Quasar css
import 'quasar/dist/quasar.css';

const pinia = createPinia();

const myApp = createApp(App);

myApp.use(router);
myApp.use(pinia);
myApp.use(Quasar, {
  plugins: [] // Ensure this is an array if no plugins are added
});

// Assumes you have a <div id="app"></div> in your index.html
myApp.mount('#app');
