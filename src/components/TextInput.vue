<script setup lang="ts">
import { onMounted, ref, shallowRef, useAttrs, watch } from 'vue'
import InfoIcon from '@/assets/Info.svg?component'

const props = withDefaults(
  defineProps<{
    id?: string
    label?: string | number
    helpText?: string
    placeholder?: string
    required?: boolean
    readonly?: boolean
    type?: string
    name?: string
    value?: string
    autocomplete?: boolean
    defaultValue?: string
  }>(),
  {
    type: 'text',
    required: false,
    readonly: false,
    autocomplete: false,
  }
)

const emit = defineEmits<{
  (name: 'change', value: string): void
  (name: 'input', value: string): void
}>()

const attrs = useAttrs()

console.log('attrs', attrs, props)

const innerValue = ref(props.value || props.defaultValue || '')
const uncontrolled = ref(props.value === undefined)
const inputRef = shallowRef<HTMLInputElement>()
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

  const reactToChanges = (e: Event) => {
    if (!e.target) {
      return
    }

    if (uncontrolled.value) {
      innerValue.value = (e.target as HTMLInputElement).value
    }
  }

  inputRef.value.addEventListener('change', reactToChanges)
  inputRef.value.addEventListener('input', reactToChanges)
})

watch(
  () => props.value,
  (newValue) => {
    innerValue.value = newValue || ''
  }
)
</script>

<template>
  <div
    :class="['me-textfield', { focused: isFocused, 'has-value': innerValue }]"
  >
    <label :for="props.id">{{ props.label }}</label>
    <input
      @change="(e) => emit('change', (e.target as HTMLInputElement).value)"
      @input="(e) => emit('input', (e.target as HTMLInputElement).value)"
      ref="inputRef"
      :id="props.id"
      :type="props.type"
      :value="innerValue"
      :placeholder="props.placeholder"
      :readonly="props.readonly"
      :required="props.required"
      :autocomplete="props.autocomplete ? 'on' : 'off'"
    />
    <div v-if="props.helpText" class="me-textfield__help">
      <info-icon class="me-help-icon" />
      <span> {{ props.helpText }}</span>
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
  display: flex;
  flex-direction: column;

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
    pointer-events: none;
  }

  input {
    height: 56px;
    border-radius: 4px;
    padding: 16px 19px;
    border: 1px solid var(--tf-border-color);
    outline: none;
    background: transparent;

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
      pointer-events: all;
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
      pointer-events: all;
    }
  }
}
</style>
