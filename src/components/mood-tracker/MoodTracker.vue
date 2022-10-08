<template>
  <div class="mood-tracker">
    <MoodButton
      class="mood-tracker__button good"
      label="good"
      icon=":D"
      :isSelected="selected['good']"
      :select="setSelected('good')"
    />
    <MoodButton
      class="mood-tracker__button normal"
      label="normal"
      icon=":)"
      :isSelected="selected['normal']"
      :select="setSelected('normal')"
    />
    <MoodButton
      class="mood-tracker__button medium"
      label="medium"
      icon=":|"
      :isSelected="selected['medium']"
      :select="setSelected('medium')"
    />
    <MoodButton
      class="mood-tracker__button low"
      label="low"
      icon=":\"
      :isSelected="selected['low']"
      :select="setSelected('low')"
    />
    <MoodButton
      class="mood-tracker__button down"
      label="down"
      icon=":("
      :isSelected="selected['down']"
      :select="setSelected('down')"
    />
    <MoodButton
      class="mood-tracker__button bad"
      label="bad"
      icon=":C"
      :isSelected="selected['bad']"
      :select="setSelected('bad')"
    />
  </div>
</template>

<script lang="ts">
import { SelectedMood } from "@/components/mood-tracker/types/MoodTracker-types";
import { Log } from "@/store/store-types";
import { onMounted, ref } from "vue";
import MoodButton from "@/components/mood-tracker/MoodButton.vue";
import { useStore } from "vuex";
export default {
  name: "MoodTracker",
  components: { MoodButton },
  props: {},
  setup() {
    const moodOfDay = ref<string>("");
    const defaultSelectedValue = {
      good: false,
      normal: false,
      medium: false,
      low: false,
      down: false,
      bad: false,
    };
    const store = useStore();
    const selected = ref<SelectedMood>({ ...defaultSelectedValue });
    const currentValue = ref<Log>({ mood: "" });
    const date = new Date()
      .toISOString()
      .replace("-", "/")
      .split("T")[0]
      .replace("-", "/");

    onMounted(() => {
      currentValue.value = getCurrentData(date);
      if (currentValue.value) selected.value[currentValue.value.mood] = true;
    });

    const getCurrentData = (date: string) => {
      const data = window.localStorage.getItem(date);
      if (data) return JSON.parse(data);
      return null;
    };

    const updateLocalData = (mood: string) => {
      if (currentValue.value) {
        currentValue.value.mood = mood;
        window.localStorage.setItem(date, JSON.stringify(currentValue.value));

        store.commit("updateLog", currentValue.value);
      }
    };

    const setSelected = (mood: string) => () => {
      moodOfDay.value = mood;
      selected.value = { ...defaultSelectedValue };
      selected.value[mood] = true;
      updateLocalData(mood);
    };
    return { moodOfDay, setSelected, selected };
  },
};
</script>

<style lang="scss">
.mood-tracker {
  display: flex;
  gap: 16px;

  &__button {
    border-radius: 8px;
    width: 64px;
    height: 64px;

    &.good {
      background-color: green;
    }
    &.normal {
      background-color: greenyellow;
    }
    &.medium {
      background-color: lightskyblue;
    }
    &.low {
      background-color: purple;
    }
    &.down {
      background-color: orange;
    }
    &.bad {
      background-color: orangered;
    }
    &.is-selected {
      border: solid 3px black;
    }
  }
}
</style>
