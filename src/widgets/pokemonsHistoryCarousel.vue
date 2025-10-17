<template>
  <div class="container">
    <div class="header">
      <h2>Last viewed</h2>
      <a @click="$emit('clearHistory')">Clear</a>
    </div>

    <div class="carousel-wrapper">
      <pokemon-card
        v-for="pokemon in props.pokemons"
        :key="pokemon.id"
        :pokemon="pokemon"
        class="carousel-item"
        draggable="true"
        @click="emits('goToPokemon', pokemon.id)"
      />
    </div>
  </div>
</template>

<script setup>
  import PokemonCard from "@/entites/pokemon/ui/pokemonCard.vue"

  const props = defineProps({
    pokemons: Array,
  })

  const emits = defineEmits(["goToPokemon", "clearHistory"])
</script>

<style scoped>
  .container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
    border-bottom: 2px solid var(--color-border);
  }

  .carousel-wrapper {
    display: flex;
    gap: 0.5rem;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    cursor: grab;
  }

  .carousel-wrapper:active {
    cursor: grabbing;
  }

  .carousel-item {
    flex: 0 0 auto;
    scroll-snap-align: start;
  }

  a {
    font-size: 16px;
    color: var(--color-text-secondary);
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
</style>
