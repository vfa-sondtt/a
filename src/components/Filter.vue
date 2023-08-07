<template>
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
</template>

<style>
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
</style>

<script>
import { watch, reactive } from "vue";
import { authStore } from "../stores/authStore";

export default {
  setup() {
    const notesStore = authStore();

    const filter = reactive({
      search: "",
      status: "All",
      priority: [],
    });

    const optionsFilter = ["Low", "Medium", "High"];

    watch(
      [() => filter.status, () => filter.priority, () => filter.search],

      (newfilter, oldfilter) => {
        console.log("newfilter", filter);
        notesStore.handleFilter(filter);
      }
    );
    return {
      filter,
      optionsFilter,
    };
  },
};
</script>
