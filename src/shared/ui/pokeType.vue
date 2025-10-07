<template>
  <button :style="{ 'background-color': props.color ?? 'black' }" class="type">
    <h3><slot /></h3>
  </button>
</template>

<script setup>
  const props = defineProps(["color"])
</script>

<style scoped>
  .type {
    display: flex;
    justify-content: center;
    align-items: center;
    width: max-content;
    border-radius: 10rem;
    padding: 0.275rem 1rem;
    color: white;

    &.inactive {
      opacity: 0.3;

      &:hover {
        opacity: 0.5;
      }
    }
  }
</style>
