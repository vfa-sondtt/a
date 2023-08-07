import { createApp } from "vue";
import router from "./router";
import { createPinia } from "pinia";

import { Quasar, Notify } from "quasar";
import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/fontawesome-v5/fontawesome-v5.css";
import "quasar/src/css/index.sass";
import App from "./App.vue";
import "./style.css";

const myApp = createApp(App);

myApp.use(Quasar, {
  plugins: {
    Notify,
  },
});

myApp.use(createPinia());
myApp.use(router);

import { authStore } from "./stores/authStore";
const store = authStore();
const curentUser = store.getCurrentUser;
console.log("log1", "Bearer " + curentUser?.accessToken);

myApp.mount("#app");
