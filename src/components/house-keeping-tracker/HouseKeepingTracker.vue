<template>
  <div class="house-keeping-tracker">
    Hobbies of day
    <template v-if="isExtended">
      <HobbyButton
        class="house-keeping-tracker__button wood"
        label="wood"
        :icon="getIcon('wood')"
        :isSelected="selected['wood']"
        :select="setSelected('wood')"
      />
      <HobbyButton
        class="house-keeping-tracker__button music"
        label="music"
        :icon="getIcon('music')"
        :isSelected="selected['music']"
        :select="setSelected('music')"
      />
      <HobbyButton
        class="house-keeping-tracker__button game"
        label="game"
        :icon="getIcon('game')"
        :isSelected="selected['game']"
        :select="setSelected('game')"
      />
      <HobbyButton
        class="house-keeping-tracker__button draw"
        label="draw"
        :icon="getIcon('draw')"
        :isSelected="selected['draw']"
        :select="setSelected('draw')"
      />
      <HobbyButton
        class="house-keeping-tracker__button cook"
        label="cook"
        :icon="getIcon('cook')"
        :isSelected="selected['cook']"
        :select="setSelected('cook')"
      />
    </template>
    <template v-else>
      <HobbyButton
        v-for="(hobby, i) in splitedHouseTasksOfDay"
        :key="i"
        :class="`house-keeping-tracker__button ${hobby}`"
        :label="hobby"
        :icon="getIcon(hobby)"
        :isSelected="selected[hobby]"
      />
    </template>
    <div class="house-keeping-tracker__button-extend-wrapper">
      <button
        class="house-keeping-tracker__button-extend"
        @click="toggleExtend"
      >
        {{ extendIcon }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Log } from "@/store/store-types";
import { computed, onMounted, ref } from "vue";
import HobbyButton from "@/components/house-keeping-tracker/HobbyButton.vue";
import { useStore } from "vuex";
import { SelectedHouseTasks } from "@/components/house-keeping-tracker/types/HouseKeepingTracker-types";
export default {
  name: "HobbiesTracker",
  components: { HobbyButton },
  props: {},
  setup() {
    const tasksStateOfDay = ref<string>("");
    const isExtended = ref<boolean>(false);
    const defaultSelectedValue = {
      living: {
        lastUpdate: "",
        delayInDays: 2,
      },
      balcony: {
        lastUpdate: "",
        delayInDays: 7,
      },
      kitchen: {
        lastUpdate: "",
        delayInDays: 1,
      },
      bathroom: {
        lastUpdate: "",
        delayInDays: 4,
      },
      bedroom: {
        lastUpdate: "",
        delayInDays: 7,
      },
      studio: {
        lastUpdate: "",
        delayInDays: 2,
      },
    };
    const selected = ref<SelectedHouseTasks>({ ...defaultSelectedValue });
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
      console.log(currentValue.value.houseTasks);

      if (currentValue.value.houseTasks) {
        tasksStateOfDay.value = currentValue.value.houseTasks;
        splitedHouseTasksOfDay.value.forEach((task) => {
          selected.value[task] = {
            delayInDays: selected.value[task].delayInDays,
            lastUpdate: selected.value[task].lastUpdate,
          };
        });
      }
    });

    const getCurrentData = (date: string) => {
      const data = window.localStorage.getItem(date);
      if (data) return JSON.parse(data);
      return null;
    };

    const getIcon = (task: string): string => {
      // TODO: replace by real icons
      switch (task) {
        case "living":
          return "📺";
        case "balcony":
          return "⛩";
        case "kitchen":
          return "🥣";
        case "bathroom":
          return "🛁";
        case "bedroom":
          return "🛏";
        case "studio":
          return "🖥";
        default:
          return "❓";
      }
    };

    const updateLocalData = () => {
      if (currentValue.value) {
        currentValue.value.houseTasks = tasksStateOfDay.value;
        window.localStorage.setItem(date, JSON.stringify(currentValue.value));
        store.commit("updateLog", currentValue.value);
      }
    };

    const setSelected = (tasks: string) => () => {
      if (tasksStateOfDay.value !== "") {
        tasksStateOfDay.value = tasksStateOfDay.value.concat(`,${tasks}`);
      } else {
        tasksStateOfDay.value = tasks;
      }

      selected.value[tasks] = selected.value[tasks] = {
        delayInDays: selected.value[tasks].delayInDays,
        lastUpdate: date,
      };
      updateLocalData();
    };

    const toggleExtend = () => {
      isExtended.value = !isExtended.value;
    };

    const splitedHouseTasksOfDay = computed(() => {
      if (!tasksStateOfDay.value) return [""];
      return tasksStateOfDay.value?.split(",");
    });

    return {
      tasksStateOfDay,
      isExtended,
      selected,
      extendIcon,
      splitedHouseTasksOfDay,
      setSelected,
      getIcon,
      toggleExtend,
    };
  },
};
</script>

<style lang="scss">
.house-keeping-tracker {
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

    &.wood {
      background-color: rgb(79, 52, 52);
    }
    &.music {
      background-color: rgb(111, 17, 198);
    }
    &.game {
      background-color: rgb(157, 9, 149);
    }
    &.draw {
      background-color: rgb(44, 142, 142);
    }
    &.cook {
      background-color: rgb(158, 25, 25);
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
