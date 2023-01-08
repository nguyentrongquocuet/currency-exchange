<script setup lang="ts">
import ExportIcon from '@/assets/Export.svg?component'
import MinusIcon from '@/assets/Minus.svg?component'

const props = withDefaults(
  defineProps<{
    inCurrency: string
    outCurrency: string
    rate: number
    feeAmount: number
    loading?: boolean
  }>(),
  {
    loading: false,
  }
)
</script>

<template>
  <div :class="{ loading }">
    <ul>
      <li>
        <MinusIcon />
        <span> {{ props.feeAmount }} {{ props.inCurrency }} fees </span>
      </li>
      <li>
        <ExportIcon />
        <span> {{ props.rate }} {{ props.outCurrency }} exchange rate </span>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
ul {
  list-style: none;
  padding: 48px 12px;
  position: relative;

  display: flex;
  flex-direction: column;
  row-gap: 24px;

  &::before {
    content: '';
    display: block;
    width: 0px;
    height: 100%;
    border-left: 1px dashed #234afb;
    position: absolute;
    left: 22px;
    top: 0;
  }
}

.loading li span {
  color: transparent;
  background: #fafafa;
  animation: wave 0.3s ease-in infinite alternate;
}

li {
  display: flex;
  align-items: center;
  gap: 18px;
  z-index: 0;

  span {
    font-size: 12px;
    line-height: 20px;
    transition: color 0.1s linear;
  }
}

@keyframes wave {
  from {
    opacity: 1;
  }

  to {
    opacity: 0.5;
  }
}
</style>
