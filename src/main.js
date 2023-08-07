import { createApp } from "vue";
import router from "./router";
import { createPinia } from "pinia";
import { createClient } from "villus";
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
console.log("log1", store.getCurrentUser);
const curentUser = store.getCurrentUser;

// Creates a villus client instance
const client = createClient({
  url: "http://localhost:8008/graphql",
  headers: {
    Authorization: "Bearer " + curentUser?.accessToken,
  },
});

myApp.use(client);
myApp.mount("#app");
