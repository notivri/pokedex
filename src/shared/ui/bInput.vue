<template>
  <input
    type="text"
    :value="props.modelValue"
    @input="emit('update:modelValue', $event.target.value)"
  />
</template>

<script setup>
  const props = defineProps({
    modelValue: String,
  })

  const emit = defineEmits(["update:modelValue"])
</script>

<style scoped>
  input {
    width: 100%;
    padding: 0.5rem;
    border: 0.2rem solid var(--color-border);
    border-radius: 1rem;
  }
</style>
