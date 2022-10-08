<template>
  <Dashboard />
  <MoodTracker />
</template>

<script lang="ts">
import Dashboard from "./components/Dashboard.vue";
import MoodTracker from "./components/mood-tracker/MoodTracker.vue";

export default {
  name: "App",
  components: {
    Dashboard,
    MoodTracker,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
