<template>
  <div class="dashboard">
    <h2>Journal de bord: {{ dateOfDay }}</h2>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
export default {
  name: "DashboardCmp",
  props: {},
  setup() {
    const dateOfDay = ref<string>("");

    return { dateOfDay };
  },
  mounted() {
    this.dateOfDay = new Date()
      .toISOString()
      .replace("-", "/")
      .split("T")[0]
      .replace("-", "/");
  },
};
</script>

<style>
.dashboard {
  display: flex;
}
</style>
