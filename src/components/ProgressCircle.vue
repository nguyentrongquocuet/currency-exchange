<script setup lang="ts">
import { onMounted, onUpdated, ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    percent?: number
  }>(),
  {
    percent: 10,
  }
)

const circle = ref<HTMLElement>()

const setStyle = () => {
  const percent = props.percent

  if (!circle.value) {
    return
  }

  circle.value.style.strokeDashoffset = (100 - percent).toString()
}

onMounted(setStyle)
onUpdated(setStyle)
</script>

<template>
  <svg
    class="ce-circle-progress"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="-1 -1 34 34"
  >
    <circle
      stroke-width="4"
      cx="16"
      cy="16"
      r="15.9155"
      class="progress__background"
      fill="none"
    />

    <circle
      ref="circle"
      fill="none"
      cx="16"
      cy="16"
      r="15.9155"
      class="progress"
    />
  </svg>
</template>

<style lang="scss">
.ce-circle-progress {
  transform: rotate(-90deg);
}

.progress__background {
  stroke-width: 2px;
  stroke: #0e0d52;
}

.progress {
  stroke: #2af5d6;
  stroke-dasharray: 100 100;
  stroke-dashoffset: 100;
  stroke-linecap: round;
  stroke-width: 2px;
  transition: stroke-dashoffset 1s ease-in-out;
}
</style>
