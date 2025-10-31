<template>
  <div class="search-bar">
    <bInput v-model="model" placeholder="Search a pokemon" />
  </div>
</template>

<script setup>
  import bInput from "@/shared/ui/bInput.vue"

  const model = defineModel()
</script>

<style>
  .search-bar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 0.5rem;

    & > input {
      flex-grow: 1;
      flex-shrink: 1;
      max-width: 500px;
    }
  }
</style>
