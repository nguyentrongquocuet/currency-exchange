<script setup lang="ts">
import { ref } from 'vue'

const AVAILABLE_CURRENCIES = ['USD', 'EUR', 'PL', 'MX', 'GBP', 'CAD'] as const
type Currency = typeof AVAILABLE_CURRENCIES[number]

const value = ref<Currency>(AVAILABLE_CURRENCIES[0])

const onChange = (e: Event) => {
  value.value = (e.target as HTMLSelectElement).value as Currency
}
</script>
<template>
  <div>
    <select @change="onChange" :value="value">
      <template :key="currency" v-for="currency in AVAILABLE_CURRENCIES">
        <option :value="currency">
          {{ currency }}
        </option>
      </template>
    </select>
  </div>
</template>
