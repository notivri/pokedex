<template>
  <div v-if="props?.pokemons?.length" class="grid-wrapper">
    <pokeCard
      v-for="pokemon in props.pokemons"
      :key="pokemon.id"
      :pokemon="pokemon"
      @click="onCardClick(pokemon)"
    />
  </div>
</template>

<script setup>
  import pokeCard from "@/entites/pokemon/ui/pokemonCard.vue"
  import { useRouter } from "vue-router"

  const router = useRouter()

  const props = defineProps({
    pokemons: { type: Array, default: () => [] },
  })

  function onCardClick(pokemon) {
    if (pokemon?.isLoaded) {
      router.push({ name: "pokemonPage", params: { id: pokemon.id } })
    }
  }
</script>

<style scoped>
  .grid-wrapper {
    display: grid;
    gap: 0.5rem;
    grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
  }

  .empty {
    height: 50vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
</style>
