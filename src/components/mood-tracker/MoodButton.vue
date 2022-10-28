<template>
  <button
    :class="[`mood-tracker-button ${label}`, { 'is-selected': isSelected }]"
    @click="select"
  >
    <b class="mood-tracker-button__icon">{{ icon }}</b>
  </button>
</template>

<script lang="ts">
import { PropType } from "@vue/runtime-core";
export default {
  name: "MoodButton",
  props: {
    label: {
      type: String,
      required: true,
    },
    icon: {
      // TODO: change to real icon
      type: String,
      required: true,
    },
    isSelected: {
      type: Boolean,
      required: true,
      default: false,
    },
    select: {
      type: Function as PropType<(label: string) => void>,
      default: () => ({}),
    },
  },
};
</script>

<style lang="scss">
.mood-tracker-button {
  border-radius: 8px;
  width: 64px;
  height: 64px;

  &.is-selected {
    border: solid 3px black;
  }
}
</style>
