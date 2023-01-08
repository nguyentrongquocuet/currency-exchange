<script setup lang="ts">
import ProgressCircle from '@/components/ProgressCircle.vue'
import ArrowDown from '@/assets/ArrowDown.svg?component'
</script>

<template>
  <!-- HEADER -->
  <div tabindex="0" class="app-sidebar__header">
    <ProgressCircle :percent="50" width="32" height="32" />
    <div class="header-step">
      <span class="header-step__counter"> Step 02 </span>
      <span class="header-step__label"> Specify Amount </span>
    </div>
    <span class="app-sidebar__arrow">
      <ArrowDown />
    </span>
  </div>
</template>

<style lang="scss">
.app-sidebar__header {
  border-radius: 4px;
  background: #2a2e94;
  padding: 13px 11px 10px 12px;
  display: flex;
  align-items: center;
}

.header-step {
  margin-left: 12px;
  text-align: left;
  display: flex;
  flex-direction: column;
  color: #ffffff;

  &__counter {
    font-family: Montserrat;
    font-size: 10px;
    line-height: 12.19px;
    text-transform: uppercase;
  }

  &__label {
    font-family: Rubik;
    font-weight: 500;
    font-size: 12px;
    line-height: 20px;
    letter-spacing: 0.3;
  }
}

.app-sidebar__arrow {
  margin-left: auto;
  color: #ffffff;

  svg path {
    fill: none;
  }
}
</style>
