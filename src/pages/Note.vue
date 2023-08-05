<template>
  <q-fab
    style="position: fixed; top: 30px; right: 20px"
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

  <div
    style="
      display: flex;
      margin: auto;
      padding: 25px;
      border: 2px solid;
      border-radius: 10px;
      height: 595px;
      width: 800px;
      flex-direction: column;
    "
  >
    <h1
      style="font-size: 32px; font-weight: 700; line-height: 32px; margin: 10px"
    >
      Todo App with Vue
    </h1>

    <!-- component Search -->
    <div style="display: flex; flex-direction: column">
      <p style="margin: 0; margin-right: auto">Search</p>
      <div style="display: flex; justify-content: flex-start">
        <q-input
          dense
          dark
          v-model="filter.search"
          style="flex-grow: 1"
          standout="bg-teal text-white"
          @keydown.enter.prevent=""
          label="Enter Search Text"
        />
        <q-btn style="height: 40px">
          <q-icon name="search" />
        </q-btn>
      </div>
    </div>
    <!-- End component Search -->

    <div style="display: flex; justify-content: space-around; margin-top: 10px">
      <!-- filter by status -->
      <div
        style="
          display: flex;
          flex-direction: column;
          width: 240px;
          justify-content: space-between;
        "
      >
        <p style="margin: 0; margin-right: auto">Filter By Status</p>

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
      <div style="display: flex; flex-direction: column; width: 335px">
        <p style="margin: 0; margin-right: auto">Filter By Priority</p>

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

    <!-- list task -->

    <ul style="padding: 0; margin: 0; height: 300px; margin-top: 10px">
      <div
        style="
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-top: 2px;
        "
        v-for="(todo, index) in notes"
        :key="index"
      >
        <div
          :class="todo.isCompleted ? 'completed' : ''"
          style="
            width: 100%;
            height: 28px;
            display: flex;
            align-items: center;
            border: 1px solid white;
            padding: 4px;
            border-radius: 10px;
          "
        >
          <q-checkbox dense color="teal" v-model="todo.isCompleted">
            <span>{{ todo.text }}</span>
          </q-checkbox>
          <q-chip
            style="margin-left: auto; margin-right: 10px"
            v-if="model"
            dense
            square
            color="white"
            text-color="primary"
            class="q-my-none q-ml-xs q-mr-none"
          >
            <q-avatar color="primary" text-color="white" :icon="model.icon" />
            {{ todo.priority }}
            <template v-slot:append>
              <q-icon name="person" />
            </template>
          </q-chip>
        </div>
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
    <!-- example toggle task -->
    <div
      style="
        width: 100%;
        height: auto;
        display: flex;
        align-items: center;
        border: 1px solid white;
        padding: 4px;
        border-radius: 10px;
        opacity: 0.5;
        text-decoration: line-through;
      "
    >
      <q-checkbox
        v-model="isCheck"
        @input="toggleCheckbox"
        color="teal"
        label="Name"
      />
      <q-chip
        style="margin-left: auto"
        v-if="model"
        dense
        square
        color="white"
        text-color="primary"
        class="q-my-none q-ml-xs q-mr-none"
      >
        <q-avatar color="primary" text-color="white" :icon="model.icon" />
        {{ model.label }}
      </q-chip>
      <q-btn push icon="delete" @click="removeTodo(index)"></q-btn>
    </div>

    <!-- iput new task -->
    <div
      style="display: flex; flex-direction: row; margin: 10px 0; height: 40px"
    >
      <q-input
        dark
        dense
        style="flex-grow: 1; height: 30px"
        standout="bg-teal text-white"
        v-model="newNoteText"
        @keydown.enter.prevent="addNote"
        label="Enter New Note"
      >
        <template v-slot:prepend>
          <q-icon name="event" />
        </template>
      </q-input>
      <!-- add -->

      <q-select
        style="width: 130px"
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

      <q-btn @click="addNote" color="primary" style="width: 50px">Add</q-btn>
    </div>
  </div>
</template>

<style>
.completed {
  opacity: 0.5;
  text-decoration: line-through;
}
</style>

<script>
// import { QBtn } from "quasar";
import { ref, watch, watchEffect, reactive } from "vue";
import { authStore } from "../stores/authStore";
import { computed } from "vue";

export default {
  setup() {
    const notesStore = authStore();

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

    function Logout() {}

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

<!--   components: {
    QBtn,
  },
 -->
