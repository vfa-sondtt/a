<script setup></script>

<template>
  <router-view />
</template>

<script>
import { defineComponent, watch } from "vue";
import { authStore } from "./stores/authStore.js";
import { useClient, defaultPlugins, cache, fetch } from "villus";

export default defineComponent({
  name: "App",
  // data() {
  //   return { storeAuth: authStore() };
  // },

  setup() {
    // const storeAuth = storeAuth();
    // const curentUser = storeAuth.getCurrentUser;
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

    const store = authStore();
    const curentUser = store.getCurrentUser;

    watch(store, () => {
      curentUser.accessToken = store.getCurrentUser?.accessToken;
    });

    console.log("log1", "Bearer " + curentUser?.accessToken);

    function authPlugin({ afterQuery, opContext }) {
      afterQuery((result, { response }) => {
        if (response?.status === 403) {
          // call API to refresh token with either client.executeMutaiton or execute from the useMutation then update token
          console.log("in debug case ", result, response);
          storeAuth.logout();
        }
      });

      opContext.headers.Authorization = "Bearer " + curentUser?.accessToken;
    }

    useClient({
      url: "http://localhost:3000/graphql", // your endpoint.
      use: [authPlugin, cache(), ...defaultPlugins()],
    });
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
