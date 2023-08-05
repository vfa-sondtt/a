import { createApp } from "vue";
import { Quasar } from "quasar";
import "./style.css";
import router from "./router";
import { createPinia } from "pinia";

import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/fontawesome-v5/fontawesome-v5.css";
// Import Quasar css
import "quasar/src/css/index.sass";
import App from "./App.vue";

const myApp = createApp(App);

myApp.use(Quasar, {
  plugins: {},
});

myApp.use(createPinia());
myApp.use(router);
myApp.mount("#app");
