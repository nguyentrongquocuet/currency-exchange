import { onBeforeUnmount, onMounted, Ref } from 'vue'

export const useClickOutside = (
  wrapperRef: Ref<HTMLElement | null>,
  listener: () => void
) => {
  const onWindowClick = (e: MouseEvent) => {
    if (!wrapperRef.value || !e.target) {
      return
    }

    if (
      e.target === wrapperRef.value ||
      wrapperRef.value.contains(e.target as HTMLElement)
    ) {
      return
    }
    listener()
  }

  onMounted(() => {
    window.addEventListener('click', onWindowClick)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('click', onWindowClick)
  })
}
