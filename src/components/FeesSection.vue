<script setup lang="ts">
import ExportIcon from '@/assets/Export.svg?component'
import MinusIcon from '@/assets/Minus.svg?component'
</script>

<template>
  <div>
    <ul>
      <li>
        <MinusIcon />
        <span> 3.67 USD fees </span>
      </li>
      <li>
        <ExportIcon />
        <span> 0.854565 EUR exchange rate </span>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
ul {
  list-style: none;
  padding: 48px 12px;
  position: relative;
  background: #edf6ff;

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

li {
  display: flex;
  align-items: center;
  gap: 18px;
  z-index: 1;

  span {
    font-size: 12px;
    line-height: 20px;
  }
}
</style>
