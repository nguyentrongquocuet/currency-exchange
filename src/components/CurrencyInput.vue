<script setup lang="ts">
import { appDecimalTransform } from '@/utils'
import TextInput from './TextInput.vue'
</script>

<template>
  <TextInput :transform-value="appDecimalTransform" />
</template>
