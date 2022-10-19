<template>
  <div class="hobbies-tracker">
    Hobbies of day
    <template v-if="isExtended">
      <HobbyButton
        class="hobbies-tracker__button wood"
        label="wood"
        :icon="getIcon('wood')"
        :isSelected="selected['wood']"
        :select="setSelected('wood')"
      />
      <HobbyButton
        class="hobbies-tracker__button music"
        label="music"
        :icon="getIcon('music')"
        :isSelected="selected['music']"
        :select="setSelected('music')"
      />
      <HobbyButton
        class="hobbies-tracker__button game"
        label="game"
        :icon="getIcon('game')"
        :isSelected="selected['game']"
        :select="setSelected('game')"
      />
      <HobbyButton
        class="hobbies-tracker__button draw"
        label="draw"
        :icon="getIcon('draw')"
        :isSelected="selected['draw']"
        :select="setSelected('draw')"
      />
      <HobbyButton
        class="hobbies-tracker__button cook"
        label="cook"
        :icon="getIcon('cook')"
        :isSelected="selected['cook']"
        :select="setSelected('cook')"
      />
    </template>
    <template v-else>
      <HobbyButton
        v-for="(hobby, i) in spitedHobbiesOfDay"
        :key="i"
        :class="`hobbies-tracker__button ${hobby}`"
        :label="hobby"
        :icon="getIcon(hobby)"
        :isSelected="selected[hobby]"
      />
    </template>
    <div class="hobbies-tracker__button-extend-wrapper">
      <button class="hobbies-tracker__button-extend" @click="toggleExtend">
        {{ extendIcon }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { SelectedHobbies } from "@/components/hobbies-tracker/types/HobbiesTracker-types";
import { Log } from "@/store/store-types";
import { computed, onMounted, ref } from "vue";
import HobbyButton from "@/components/hobbies-tracker/HobbyButton.vue";
import { useStore } from "vuex";
export default {
  name: "HobbiesTracker",
  components: { HobbyButton },
  props: {},
  setup() {
    const hobbiesOfDay = ref<string>("");
    const isExtended = ref<boolean>(false);
    const defaultSelectedValue = {
      wood: false,
      music: false,
      game: false,
      draw: false,
      cook: false,
    };
    const selected = ref<SelectedHobbies>({ ...defaultSelectedValue });
    const currentValue = ref<Log>({ mood: "", hobbies: "" });
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
      console.log(currentValue.value.hobbies);

      if (currentValue.value.hobbies) {
        hobbiesOfDay.value = currentValue.value.hobbies;
        spitedHobbiesOfDay.value.forEach((hobby) => {
          selected.value[hobby] = true;
        });
      }
    });

    const getCurrentData = (date: string) => {
      const data = window.localStorage.getItem(date);
      if (data) return JSON.parse(data);
      return null;
    };

    const getIcon = (hobby: string): string => {
      // TODO: replace by real icons
      switch (hobby) {
        case "wood":
          return "🪵";
        case "music":
          return "🎹";
        case "game":
          return "🎮";
        case "draw":
          return "🖊";
        case "cook":
          return "🍳";
        default:
          return "❓";
      }
    };

    const updateLocalData = () => {
      if (currentValue.value) {
        currentValue.value.hobbies = hobbiesOfDay.value;
        window.localStorage.setItem(date, JSON.stringify(currentValue.value));
        store.commit("updateLog", currentValue.value);
      }
    };

    const setSelected = (hobbies: string) => () => {
      if (hobbiesOfDay.value !== "") {
        hobbiesOfDay.value = hobbiesOfDay.value.concat(`,${hobbies}`);
      } else {
        hobbiesOfDay.value = hobbies;
      }

      selected.value[hobbies] = true;
      updateLocalData();
    };

    const toggleExtend = () => {
      isExtended.value = !isExtended.value;
    };

    const spitedHobbiesOfDay = computed(() => {
      if (!hobbiesOfDay.value) return [""];
      return hobbiesOfDay.value?.split(",");
    });

    return {
      hobbiesOfDay,
      isExtended,
      selected,
      extendIcon,
      spitedHobbiesOfDay,
      setSelected,
      getIcon,
      toggleExtend,
    };
  },
};
</script>

<style lang="scss">
.hobbies-tracker {
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
