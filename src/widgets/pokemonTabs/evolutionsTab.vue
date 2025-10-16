<template>
  <pokemonCard :pokemon="props.pokemon" />
</template>

<script setup>
  import pokemonCard from "@/entites/pokemon/ui/pokemonCard.vue"

  const props = defineProps({
    pokemon: Object,
  })
</script>
