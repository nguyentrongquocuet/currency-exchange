<script setup lang="ts">
import CurrencyExchange from './CurrencyExchange.vue'
</script>
<template>
  <div>
    <CurrencyExchange />

    <TextInput
      class="message"
      default-value="Please buy new clothes and have fun!"
      label="Title"
      help-text="Optional"
    />
  </div>
</template>

<style lang="scss">
.container {
  width: 520px;
  background: #ffffff;
  margin: 0 auto;
}
</style>
