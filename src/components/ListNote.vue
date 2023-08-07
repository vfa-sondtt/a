<template>
  <!-- list note -->
  <ul class="container_listnote">
    <!-- note -->
    <div
      class="container_listnote_note"
      v-for="(todo, index) in notes"
      :key="index"
    >
      <!-- note container -->
      <div :class="todo.isCompleted ? 'completed' : ''" class="note_content">
        <!-- note text -->
        <q-checkbox dense color="teal" v-model="todo.isCompleted">
          <span>{{ todo.text }}</span>
        </q-checkbox>
        <!-- note priority -->
        <q-chip
          v-if="model"
          dense
          square
          color="white"
          text-color="primary"
          class="q-my-none q-ml-xs q-mr-none note_content-priority"
        >
          <q-avatar color="primary" text-color="white" :icon="model.icon" />
          {{ todo.priority }}
          <template v-slot:append>
            <q-icon name="person" />
          </template>
        </q-chip>
      </div>

      <!-- note btn delete -->
      <q-btn
        style="margin-left: 5px"
        color="red"
        push
        size="11px"
        icon="delete"
        @click="removeNote(todo.id)"
      >
      </q-btn>
    </div>
  </ul>
</template>

<style>
.completed {
  opacity: 0.5;
  text-decoration: line-through;
}
.container_listnote {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  height: 290px;
  margin-top: 10px;
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
}
.container_listnote_note {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 2px;
  width: 746px;
}

.container_listnote_note .note_content {
  height: 28px;
  display: flex;
  align-items: center;
  border: 1px solid white;
  padding: 4px;
  border-radius: 10px;
  width: 670px;
}

.note_content .note_content-priority {
  margin-left: auto;
  margin-right: 10px;
}
</style>

<script>
import { authStore } from "../stores/authStore";
import { computed, ref } from "vue";

export default {
  setup() {
    const notesStore = authStore();
    const notes = computed(() => notesStore.getNotes);
    const model = ref({
      label: "Medium",
      value: "Medium",
      icon: "bluetooth",
    });
    const { execute, data } = notesStore.removeNote();

    async function removeNote(index) {
      // notesStore.removeNote(index);

      try {
        console.log("index", index);
        const result = await this.execute({
          id: index,
        });

        console.log("ten: ", result);

        if (result.error) {
          console.log("error  ", result.error.message);
        } else {
          console.log("result-> ", this.data.login);
        }
      } catch (error) {
        console.log("system error-> ", error);
      }
    }
    return {
      model,
      notes,
      removeNote,
      execute,
      data,
    };
  },
};
</script>
