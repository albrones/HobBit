<template>
  <div class="mood-tracker">
    Mood of day
    <template v-if="isExtended">
      <MoodButton
        class="mood-tracker__button good"
        label="good"
        :icon="getIcon('good')"
        :isSelected="selected['good']"
        :select="setSelected('good')"
      />
      <MoodButton
        class="mood-tracker__button normal"
        label="normal"
        :icon="getIcon('normal')"
        :isSelected="selected['normal']"
        :select="setSelected('normal')"
      />
      <MoodButton
        class="mood-tracker__button medium"
        label="medium"
        :icon="getIcon('medium')"
        :isSelected="selected['medium']"
        :select="setSelected('medium')"
      />
      <MoodButton
        class="mood-tracker__button low"
        label="low"
        :icon="getIcon('low')"
        :isSelected="selected['low']"
        :select="setSelected('low')"
      />
      <MoodButton
        class="mood-tracker__button down"
        label="down"
        :icon="getIcon('down')"
        :isSelected="selected['down']"
        :select="setSelected('down')"
      />
      <MoodButton
        class="mood-tracker__button bad"
        label="bad"
        :icon="getIcon('bad')"
        :isSelected="selected['bad']"
        :select="setSelected('bad')"
      />
    </template>
    <template v-else>
      <MoodButton
        :class="`mood-tracker__button ${moodOfDay}`"
        label="moodOfDay"
        :icon="getIcon(moodOfDay)"
        :isSelected="selected[moodOfDay]"
      />
    </template>
    <div class="mood-tracker__button-extend-wrapper">
      <button class="mood-tracker__button-extend" @click="toggleExtend">
        {{ extendIcon }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { SelectedMood } from "@/components/mood-tracker/types/MoodTracker-types";
import { Log } from "@/store/store-types";
import { computed, onMounted, ref } from "vue";
import MoodButton from "@/components/mood-tracker/MoodButton.vue";
import { useStore } from "vuex";
export default {
  name: "MoodTracker",
  components: { MoodButton },
  props: {},
  setup() {
    const moodOfDay = ref<string>("");
    const isExtended = ref<boolean>(false);
    const defaultSelectedValue = {
      good: false,
      normal: false,
      medium: false,
      low: false,
      down: false,
      bad: false,
    };
    const selected = ref<SelectedMood>({ ...defaultSelectedValue });
    const currentValue = ref<Log>({ mood: "", hobbies: "", houseTasks: "" });
    const date = new Date()
      .toISOString()
      .replace("-", "/")
      .split("T")[0]
      .replace("-", "/");
    const store = useStore();

    const extendIcon = computed(() => {
      return isExtended.value ? "➖" : "➕";
    });

    onMounted(() => {
      currentValue.value = getCurrentData(date);
      if (currentValue.value) {
        selected.value[currentValue.value.mood] = true;
        moodOfDay.value = currentValue.value.mood;
      }
    });

    const getCurrentData = (date: string) => {
      const data = window.localStorage.getItem(date);
      if (data) return JSON.parse(data);
      return null;
    };

    const getIcon = (mood: string): string => {
      // TODO: replace by real icons
      switch (mood) {
        case "good":
          return "😁";
        case "normal":
          return "😊";
        case "medium":
          return "😐";
        case "low":
          return "😕";
        case "down":
          return "🙁";
        case "bad":
          return "☹️";
        default:
          return "❓";
      }
    };

    const updateLocalData = (mood: string) => {
      if (currentValue.value.mood) {
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

    const toggleExtend = () => {
      isExtended.value = !isExtended.value;
    };

    return {
      moodOfDay,
      isExtended,
      selected,
      extendIcon,
      setSelected,
      getIcon,
      toggleExtend,
    };
  },
};
</script>

<style lang="scss">
.mood-tracker {
  display: flex;
  gap: 16px;
  border: solid 1px black;
  padding: 8px;
  max-width: fit-content;
  border-radius: 8px;
  background: azure;

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

  &__button-extend-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  &__button-extend {
    border-radius: 8px;
    height: fit-content;
  }
}
</style>
