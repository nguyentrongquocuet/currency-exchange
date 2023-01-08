<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    disabled?: boolean
    variant?: 'outlined' | 'contained'
  }>(),
  {
    disabled: false,
    variant: 'outlined',
  }
)
</script>

<template>
  <button
    :class="['app-button', `app-button--${props.variant}`]"
    :disabled="props.disabled"
  >
    <slot />
  </button>
</template>

<style lang="scss">
.app-button {
  border-radius: 4px;
  cursor: pointer;
  color: #111a27;
  padding-top: 12px;
  padding-bottom: 12px;
  outline: none;
  font-family: Montserrat;
  font-weight: 600;
  font-size: 13px;
  background: transparent;
  line-height: 16px;

  &--outlined {
    border: 2px solid #2af5d6;
  }

  &--contained {
    background: #2af5d6;
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
}
</style>
