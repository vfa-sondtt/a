<script setup></script>

<template>
  <router-view />
</template>

<script>
import { defineComponent, watch } from "vue";
// import { useClient, defaultPlugins, ClientPluginContext } from "villus";

import { authStore } from "./stores/authStore.js";
// import { useNotesStore } from "./stores/notes";

export default defineComponent({
  name: "App",

  data() {
    return { storeAuth: authStore() };
  },

  setup() {
    // const storeAuth = storeAuth();
    // const curentUser = this.storeAuth.getCurrentUser;
    // watch(storeAuth, () => {
    //   curentUser.accessToken = storeAuth.getCurrentUser?.accessToken;
    // });
    // function authPlugin({ afterQuery, opContext }: ClientPluginContext) {
    //   afterQuery((result, { response }) => {
    //     if (response?.status === 403) {
    //       // call API to refresh token with either client.executeMutaiton or execute from the useMutation then update token
    //       console.log("in debug case ", result, response);
    //       storeAuth.logout();
    //     }
    //   });
    //   opContext.headers.Authorization = "Bearer " + curentUser?.accessToken;
    // }
    // useClient({
    //   url: process.env.URL_API || "", // your endpoint.
    //   use: [authPlugin, ...defaultPlugins()],
    // });
  },
});
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
