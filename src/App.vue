<script setup lang="ts">
import { onMounted } from 'vue'
import AppMain from './containers/AppMain.vue'
import AppSidebar from './containers/AppSidebar.vue'
import MiniAppButton from './containers/MiniAppButton.vue'
import StepHeader from './containers/StepHeader.vue'

onMounted(() => {
  const container = document.querySelector('#app') as HTMLElement

  if (container) {
    container.addEventListener('transitionstart', () => {
      container.style.overflow = 'visible'
    })

    container.addEventListener('transitionend', () => {
      if (container.classList.contains('sidebar-visible')) {
        container.style.overflow = 'hidden'
      } else {
        container.style.overflow = 'visible'
      }
    })
  }
})
</script>

<template>
  <AppSidebar>
    <template #header>
      <StepHeader />
    </template>
    <template #featured>
      <MiniAppButton />
    </template>
  </AppSidebar>
  <AppMain />
</template>
