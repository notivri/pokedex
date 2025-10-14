<template>
  <div class="wrapper">
    <bStatBar
      v-for="(s, index) in props.pokemon.stats"
      :key="index"
      :name="s.stat.name"
      :value="s.base_stat"
      :max-value="maxPossibleStats[s.stat.name]"
    />
  </div>
</template>

<script setup>
  import bStatBar from "@/shared/ui/bStatBar.vue"
  import { maxPossibleStats } from "@/entites/pokemon/lib/constants"

  const props = defineProps({
    pokemon: Object,
  })
</script>

<style scoped>
  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 1rem;
    gap: 1rem;
  }
</style>
