<script setup lang="ts">
import { onMounted, ref, shallowRef } from 'vue'
import InfoIcon from '@/assets/Info.svg?component'

const props = defineProps<{
  value?: string | number
}>()

console.log('propsppp', props)

const inputRef = shallowRef<HTMLInputElement>()
const hasValue = ref(false)
const isFocused = ref(false)

onMounted(() => {
  if (!inputRef.value) {
    return
  }

  inputRef.value.addEventListener('focus', () => {
    isFocused.value = true
  })

  inputRef.value.addEventListener('blur', () => {
    isFocused.value = false
  })

  inputRef.value.addEventListener('change', (e) => {
    if (!e.target) {
      return
    }

    hasValue.value = !!(e.target as HTMLInputElement).value
  })
})
</script>

<template>
  <div :class="['me-textfield', { focused: isFocused, 'has-value': hasValue }]">
    <label for="input">Titlhge</label>
    <input ref="inputRef" id="input" type="text" />
    <div class="me-textfield__help">
      <info-icon class="me-help-icon" />
      <span> This is helptext</span>
    </div>
  </div>
</template>

<style lang="scss">
.me-textfield {
  --tf-input-color: #000000;
  --tf-label-color: #2e3a42;
  --tf-border-color: #070c11;
  --tf-help-color: #2a3148;
  /* Focused */
  --tf-focused-border-color: #7b61ff;
  --tf-focused-label-color: #7b61ff;
  --tf-focused-label-bg: #ffffff;

  position: relative;
  margin-top: 8px;

  label,
  input {
    font-size: 16px;
    line-height: 18px;
  }

  label {
    color: var(--tf-label-color);
    position: absolute;
    left: 20px;
    top: 19px;
    z-index: 1;
    transform-origin: 0 0;
    transition: all 0.2s ease-out;
    transition-property: transform padding;
  }

  input {
    height: 56px;
    border-radius: 4px;
    padding: 16px 19px;
    border: 1px solid var(--tf-border-color);
    outline: none;

    &:focus {
      border-color: var(--tf-focused-border-color);
    }
  }

  &__help {
    color: var(--tf-help-color);
    font-size: 11px;
    line-height: 12px;
    margin-top: 4px;
    margin-left: 14.5px;
    display: flex;
    align-items: center;
    gap: 8px;

    .me-help-icon {
      width: 12px;
      height: 12px;
    }
  }

  &:focus-within {
    input {
      border-color: var(--tf-focused-border-color);
    }

    label {
      color: var(--tf-focused-label-color);
    }
  }

  &.focused,
  &.has-value {
    label {
      transform: scale(0.75);
      left: 8px;
      top: -8px;
      background: var(--tf-focused-label-bg);
      padding: 0px 8px;
    }
  }
}
</style>
