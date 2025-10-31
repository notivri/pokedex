export default function useObserver(
  target,
  action,
  config = { threshold: 0.5 }
) {
  let observer = null

  onMounted(() => {
    observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        action()
      }
    }, config)

    observer.observe(target?.value)
  })

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
      observer = null
    }
  })
}
