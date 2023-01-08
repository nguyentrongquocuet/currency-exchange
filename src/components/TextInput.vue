<script setup lang="ts">
import { onMounted, ref, shallowRef, watch } from 'vue'
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
    value?: string | number
    autocomplete?: boolean
    defaultValue?: string
    transformValue?: (value: string) => string
    transformOutput?: (value: string) => string
  }>(),
  {
    type: 'text',
    required: false,
    readonly: false,
    autocomplete: false,
    transformValue: (v: string) => v,
    transformOutput: (v: string) => v,
  }
)

const emit = defineEmits<{
  (name: 'change', e: string): void
  (name: 'input', e: string): void
}>()

const innerValue = ref(props.value || props.defaultValue || '')
const uncontrolled = ref(props.value === undefined)
const inputRef = shallowRef<HTMLInputElement>()
const isFocused = ref(false)

onMounted(() => {
  if (!inputRef.value) {
    return
  }

  inputRef.value.addEventListener('focus', () => {
    isFocused.value = !props.readonly
  })

  inputRef.value.addEventListener('blur', () => {
    isFocused.value = false
  })

  const reactToChanges = (e: Event) => {
    if (!e.target) {
      return
    }

    const target = e.target as HTMLInputElement

    const value = target.value

    const result = props.transformValue ? props.transformValue(value) : value

    target.value = result

    if (uncontrolled.value) {
      innerValue.value = result
    }

    emit(e.type as any, props.transformOutput(result))
  }

  inputRef.value.addEventListener('change', reactToChanges)
  inputRef.value.addEventListener('input', reactToChanges)
})

watch(
  () => props.value,
  (newValue) => {
    innerValue.value = props.transformValue
      ? props.transformValue(newValue?.toString() || '')
      : newValue || ''
  }
)
</script>

<template>
  <div
    :class="['ce-textfield', { focused: isFocused, 'has-value': innerValue }]"
  >
    <label :for="props.id">{{ props.label }}</label>
    <input
      ref="inputRef"
      :id="props.id"
      :type="props.type"
      :value="innerValue"
      :placeholder="props.placeholder"
      :readonly="props.readonly"
      :required="props.required"
      :autocomplete="props.autocomplete ? 'on' : 'off'"
    />
    <div v-if="props.helpText" class="ce-textfield__help">
      <info-icon class="ce-help-icon" />
      <span> {{ props.helpText }}</span>
    </div>
  </div>
</template>

<style lang="scss">
.ce-textfield {
  --tf-input-color: #000000;
  --tf-label-color: #2e3a42;
  --tf-border-color: #070c11;
  --tf-help-color: #2a3148;
  /* Focused */
  --tf-focused-border-color: #7b61ff;
  --tf-focused-label-color: #7b61ff;
  --tf-focused-label-bg: #ffffff;

  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;

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
    align-items: flex-start;
    gap: 8px;

    .ce-help-icon {
      width: 12px;
      height: 12px;
      flex-shrink: 0;
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
