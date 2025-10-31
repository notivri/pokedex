<template>
  <div class="cards-grid">
    <div class="grid-wrapper">
      <pokeCard
        v-for="(pokemon, index) in props.pokemons"
        :key="pokemon.id"
        :pokemon="pokemon"
        v-bind="index === 0 ? { ref: props.firstCardRef } : {}"
        @click="emit('goToPokemon', pokemon.id)"
      />
    </div>
  </div>
</template>

<script setup>
  import pokeCard from "@/entites/pokemon/ui/pokemonCard.vue"

  const props = defineProps({
    pokemons: Array,
    modelValue: String,
    firstCardRef: Object,
  })

  const emit = defineEmits(["update:modelValue", "goToPokemon"])
</script>

<style scoped>
  .cards-grid {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .grid-wrapper {
    display: grid;
    gap: 0.5rem;
    grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  }

  @media (min-width: 920px) {
    .grid-wrapper {
      grid-template-columns: repeat(5, minmax(10rem, 1fr));
    }
  }
</style>
