<template>
  <div class="container_input">
    <!-- input -->
    <q-input
      class="container_input_enter"
      dark
      dense
      standout="bg-teal text-white"
      v-model="newNoteText"
      @keydown.enter.prevent="addNote"
      label="Enter New Note"
    >
      <template v-slot:prepend>
        <q-icon name="event" />
      </template>
    </q-input>

    <!-- btn-priority&add -->
    <q-select
      class="container_input-btnPriority"
      dense=""
      dark
      filled
      v-model="newNotePriority"
      :options="options"
      stack-label
      label="Priority"
    >
      <template v-slot:selected>
        <q-chip
          v-if="newNotePriority"
          dense
          square
          color="white"
          text-color="primary"
          class="q-my-none q-ml-xs q-mr-none"
        >
          <q-avatar
            color="primary"
            text-color="white"
            :icon="newNotePriority.icon"
          />
          {{ newNotePriority.label }}
        </q-chip>
        <q-badge v-else>*none*</q-badge>
      </template>
    </q-select>

    <!-- btn-Add -->
    <q-btn @click="addNote" color="primary" class="container_input-btnAdd"
      >Add</q-btn
    >
  </div>
</template>

<style>
.container_input {
  display: flex;
  flex-direction: row;
  margin: 10px 0;
  height: 40px;
}
.container_input_enter {
  flex-grow: 1;
  height: 30px;
}

.container_input-btnPriority {
  width: 130px;
}

.container_input-btnAdd {
  width: 50px;
}
</style>

<script>
import { ref } from "vue";
import { authStore } from "../stores/authStore";

export default {
  setup() {
    const store = authStore();
    const { execute, data } = store.addNote();

    const newNoteText = ref("");
    const newNotePriority = ref({
      label: "Medium",
      value: "Medium",
      icon: "bluetooth",
    });

    const options = [
      {
        label: "High",
        value: "High",
        icon: "map",
      },
      {
        value: "Medium",
        icon: "bluetooth",
      },
      {
        label: "Low",
        value: "Low",
        icon: "mail",
      },
    ];
    const reload = ref(true);

    const selectOptions = ref([
      { value: "option1", label: "Option 1", icon: "search" },
    ]);

    async function addNote() {
      if (newNoteText.value.trim() !== "") {
        // notesStore.addNote({
        //   id: Date.now(),
        //   text: newNoteText.value,
        //   priority: newNotePriority.value.label,
        //   isCompleted: false,
        // });

        // làm tiếp
        function check(x) {
          switch (x) {
            case "Low":
              return 1;
              break;
            case "Medium":
              return 2;
              break;
            case "High":
              return 3;
              break;

            default:
              return 1;
          }
        }
        // <!-- new function -->
        function a(b) {
          console.log("hello", b);
        }

        // new function
        function hello(hehe) {
          console.log("ssss", hehe);
        }

        try {
          const result = await execute({
            Content: newNoteText.value,
            Piority: check(newNotePriority.value.label),
            isComplete: false,
          });

          if (result.error) {
            console.log("error  ", result.error.message);
            // $q.notify({
            //   message: result.error.message,
            //   type: "negative",
            //   timeout: 1000000,
            // });
          } else {
            console.log("result-> ", result.data.createList.id);
            //
            store.addNoteToReload({
              id: result.data.createList.id,
              text: newNoteText.value,
              priority: newNotePriority.value.label,
              isCompleted: false,
            });
            //
          }
        } catch (error) {
          console.log("system error-> ", error);
        }
      }

      newNoteText.value = "";
      newNotePriority.value = {
        label: "Medium",
        value: "Medium",
        icon: "bluetooth",
      };
    }

    return {
      newNoteText,
      newNotePriority,
      addNote,
      selectOptions,
      options,
      execute,
      store,
      data,
    };
  },
};
</script>
