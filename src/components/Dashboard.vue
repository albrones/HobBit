<template>
  <div class="dashboard">
    <h2>Journal de bord: {{ dateOfDay }}</h2>
  </div>
</template>

<script lang="ts">
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
export default {
  name: "DashboardCmp",
  props: {},
  setup() {
    const dateOfDay = ref<string>("");
    const store = useStore();
    const initLocalStorage = () => {
      if (window.localStorage.getItem(dateOfDay.value)) return;

      const defaultEntryOfTheDay = {
        mood: "",
      };
      window.localStorage.setItem(
        dateOfDay.value,
        JSON.stringify(defaultEntryOfTheDay)
      );
      store.commit("initLogOfDay", dateOfDay);
    };

    onMounted(() => {
      dateOfDay.value = new Date()
        .toISOString()
        .replace("-", "/")
        .split("T")[0]
        .replace("-", "/");
      initLocalStorage();
    });

    return { dateOfDay };
  },
};
</script>

<style>
.dashboard {
  display: flex;
}
</style>
