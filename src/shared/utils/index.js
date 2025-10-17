export function useDebounce(reactiveState, delay) {
  const debouncedValue = ref(reactiveState.value)

  let timeout
  watch(reactiveState, (newValue) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      debouncedValue.value = newValue
    }, delay)
  })

  return debouncedValue
}
