<script setup lang="ts">
import { appDecimalTransform, getOgNum } from '@/utils'
import TextInput from './TextInput.vue'
</script>

<template>
  <TextInput
    :transform-output="getOgNum"
    :transform-value="appDecimalTransform"
  />
</template>
