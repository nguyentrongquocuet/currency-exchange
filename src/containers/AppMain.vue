<script setup lang="ts">
import SpecifyAmount from './SpecifyAmount.vue'
</script>

<template>
  <main id="app-main">
    <SpecifyAmount />
  </main>
</template>

<style>
#app-main {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  box-shadow: 0px 3px 7px #d7d9de;
  border-radius: 4px;
  margin-right: 16px;
  flex-shrink: 0;
}

@media screen and (max-width: 767px) {
  #app-main {
    margin: 0;
    width: 100vw;
    box-shadow: none;
    padding-top: 48px;
    padding-bottom: 16px;
    overflow-y: auto;
  }
}
</style>
