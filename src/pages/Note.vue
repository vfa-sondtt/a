<template>
  <!-- btn navigation -->
  <q-fab
    id="navigate"
    color="amber"
    text-color="black"
    icon="menu"
    direction="left"
  >
    <q-fab-action
      color="amber"
      text-color="black"
      @click="chuabietcodegi"
      icon="person"
    />
    <q-fab-action
      color="amber"
      text-color="black"
      @click="Logout"
      icon="logout"
    />
  </q-fab>

  <div class="container">
    <!-- header -->
    <h1 class="container_header">Todo App with Vue</h1>

    <!-- component Flter -->
    <Filter />

    <!-- list note -->
    <ListNote />

    <!-- input conponent -->
    <AddNote />
  </div>
</template>

<style scoped>
#navigate {
  position: fixed;
  top: 30px;
  right: 20px;
}

.container {
  display: flex;
  margin: auto;
  padding: 25px;
  border: 2px solid;
  border-radius: 10px;
  height: 595px;
  width: 800px;
  flex-direction: column;
}

.container_header {
  font-size: 32px;
  font-weight: 700;
  line-height: 32px;
  margin: 10px;
}
</style>

<script>
import { authStore } from "../stores/authStore";
import Filter from "../components/Filter.vue";
import ListNote from "../components/ListNote.vue";
import AddNote from "../components/AddNote.vue";

import router from "../router/index";
import { ref, onMounted } from "vue";

export default {
  components: {
    Filter,
    ListNote,
    AddNote,
  },

  setup() {
    const notesStore = authStore();
    onMounted(() => {
      console.log("hehe co vo ne");
      notesStore.getNoteDepart();
    });

    // const { execute, data } = notesStore.fetchNotesApi();
    // execute({ userId: notesStore.getCurrentUser.userId });

    const Logout = () => {
      notesStore.logout();
      router.push({ name: "Login" });
    };

    return {
      Logout,
    };
  },
};
</script>
