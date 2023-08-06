import { createApp } from "vue";
// import { Quasar } from "quasar";
import "./style.css";
import router from "./router";
import { createPinia } from "pinia";

import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/fontawesome-v5/fontawesome-v5.css";
// Import Quasar css
import "quasar/src/css/index.sass";
// import quasarUserOptions from './quasar-user-options';
import App from "./App.vue";

import { Quasar, Notify } from "quasar";

// villus
import { createClient } from "villus";

// Creates a villus client instance
const client = createClient({
  url: "http://localhost:8008/graphql", // your endpoint.
});
// app.use(Quasar, quasarUserOptions);
const myApp = createApp(App);

myApp.use(Quasar, {
  plugins: {
    Notify,
  },
});

myApp.use(createPinia());
myApp.use(router);
myApp.use(client);
myApp.mount("#app");
