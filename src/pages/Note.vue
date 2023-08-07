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
    <h1 class="container_header">Todo App with Vue</h1>

    <!-- component Flter -->
    <!-- Search bar -->
    <div class="container_search">
      <p>Search</p>
      <div>
        <q-input
          dense
          dark
          v-model="filter.search"
          class="container_search-input"
          standout="bg-teal text-white"
          @keydown.enter.prevent=""
          label="Enter Search Text"
        />
        <q-btn>
          <q-icon name="search" />
        </q-btn>
      </div>
    </div>

    <!-- Filter bar -->
    <div class="container_filter">
      <!-- filter by status -->
      <div class="container_filter_status">
        <p>Filter By Status</p>

        <div>
          <q-radio
            dark
            val="All"
            v-model="filter.status"
            label="All"
            color="green"
            checked-icon="task_alt"
            unchecked-icon="highlight_off"
          />
          <q-radio
            dark
            val="0"
            v-model="filter.status"
            label="Todo"
            color="green"
            checked-icon="task_alt"
            unchecked-icon="highlight_off"
          />

          <q-radio
            dark
            val="1"
            v-model="filter.status"
            label="Completed"
            color="green"
            checked-icon="task_alt"
            unchecked-icon="highlight_off"
          />
        </div>
      </div>

      <!-- filter by Piority -->
      <div class="container_filter_piority">
        <p>Filter By Priority</p>

        <div class="q-gutter-sm">
          <q-select
            dense
            dark
            filled
            transition-show="scale"
            transition-hide="scale"
            v-model="filter.priority"
            multiple
            :options="optionsFilter"
            use-chips
            stack-label
            label="Priority"
          />
        </div>
      </div>
    </div>

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
          @click="removeNote(index)"
        >
        </q-btn>
      </div>
    </ul>

    <!-- toggle thì margin right = 10px biến mất -->

    <!-- input conponent -->
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
  </div>
</template>

<style>
#navigate {
  position: fixed;
  top: 30px;
  right: 20px;
}
.completed {
  opacity: 0.5;
  text-decoration: line-through;
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

.container_search {
  display: flex;
  flex-direction: column;
}

.container_search-input {
  flex-grow: 1;
}

.container_search > p {
  margin: 0;
  margin-right: auto;
}

.container_search > div {
  display: flex;
  justify-content: flex-start;
}

.container_search q-btn {
  height: 40px;
}

.container_filter {
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
}

.container_filter_status {
  display: flex;
  flex-direction: column;
  width: 240px;
  justify-content: space-between;
}
.container_filter_status p {
  margin: 0;
  margin-right: auto;
}

.container_filter_piority {
  display: flex;
  flex-direction: column;
  width: 335px;
}
.container_filter_piority p {
  margin: 0;
  margin-right: auto;
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
import { ref, watch, reactive } from "vue";
import { authStore } from "../stores/authStore";
import { computed } from "vue";

import router from "../router/index";

export default {
  setup() {
    const notesStore = authStore();

    const { execute, data } = notesStore.fetchNotesApi();
    execute({ userId: notesStore.getCurrentUser.userId });

    const filter = reactive({
      search: "",
      status: "All",
      priority: [],
    });

    watch(
      [() => filter.status, () => filter.priority, () => filter.search],

      (newfilter, oldfilter) => {
        console.log("newfilter", filter);
        notesStore.handleFilter(filter);
      }
    );

    const isCheck = ref(false);
    const newNoteText = ref("");
    const newNotePriority = ref({
      label: "Medium",
      value: "Medium",
      icon: "bluetooth",
    });

    const model = ref({
      label: "Medium",
      value: "Medium",
      icon: "bluetooth",
    });
    const options = [
      {
        label: "Low",
        value: "Low",
        icon: "mail",
      },
      {
        label: "Medium",
        value: "Medium",
        icon: "bluetooth",
      },
      {
        label: "High",
        value: "High",
        icon: "map",
      },
    ];

    const optionsFilter = ["Low", "Medium", "High"];
    const selectOptions = ref([
      { value: "option1", label: "Option 1", icon: "search" },
    ]);

    const notes = computed(() => notesStore.getNotes);

    function addNote() {
      if (newNoteText.value.trim() !== "") {
        notesStore.addNote({
          id: Date.now(),
          text: newNoteText.value,
          priority: newNotePriority.value.label,
          isCompleted: false,
        });
      }

      newNoteText.value = "";
      newNotePriority.value = {
        label: "Medium",
        value: "Medium",
        icon: "bluetooth",
      };
    }

    function removeNote(index) {
      notesStore.removeNote(index);
    }
    function toggleCheckbox() {}

    const Logout = () => {
      // this.$router.push({ name: "Login" });

      // this.$router.push("/");
      router.push({ name: "Login" });
    };

    return {
      notes,
      model,
      newNoteText,
      newNotePriority,
      removeNote,
      addNote,
      isCheck,
      filter,
      selectOptions,
      toggleCheckbox,
      Logout,
      options,
      optionsFilter,
    };
  },
};
</script>
