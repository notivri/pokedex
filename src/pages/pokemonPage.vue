<template>
  <div class="wrapper">
    <div
      class="sprite-wrapper"
      :style="{
        background: `linear-gradient(180deg, ${bgColor} 0%, var(--color-bg-main) 90%)`,
      }"
    >
      <div class="header">
        <bButton class="no-bg" @click="router.push('/main')">
          <template #icon>
            <img src="@\app\assets\icons\arrow.svg" />
          </template>
        </bButton>

        <span class="id"> #{{ pokemonId }} </span>

        <bButton class="no-bg">
          <template #icon>
            <img src="@\app\assets\icons\heart.svg" />
          </template>
        </bButton>
      </div>

      <img
        class="image"
        :src="pokemon?.sprites['other']['official-artwork']['front_default']"
      />

      <h1>{{ pokemon?.name }}</h1>
      <h3>{{ pokemon?.species.genera[7].genus }}</h3>
    </div>

    <bNavBar :tabs />

    <div v-if="pokemon" class="tabs-wrapper">
      <router-view :pokemon :chain="detailedEvolutionChain" />
    </div>
  </div>
</template>

<script setup>
  import bButton from "@/shared/ui/bButton.vue"
  import bNavBar from "@/shared/ui/bNavBar.vue"

  import { useRoute, useRouter } from "vue-router"
  import { usePokemon } from "@/entites/pokemon/model/usePokemon"
  import { parseEvolutionChain } from "@/entites/pokemon/lib/utils"
  import { colors } from "@/entites/pokemon/lib/constants"

  const { getPokemon, getPokemonSpecies, getPokemonEvolutionChain } =
    usePokemon()

  const route = useRoute()
  const router = useRouter()

  const pokemon = await getPokemon(route.params.id)
  const species = await getPokemonSpecies(pokemon.id)
  const evolutionChain = await getPokemonEvolutionChain(
    species.evolution_chain?.url
  )
  const parsedEvolutionChain = parseEvolutionChain(evolutionChain)
  const detailedEvolutionChain = await Promise.all(
    parsedEvolutionChain.map(async (evo) => {
      const evoPokemonData = await getPokemon(evo.id)
      return {
        ...evo,
        image: evoPokemonData.sprites.front_default,
        types: evoPokemonData.types,
      }
    })
  )

  pokemon.species = species

  const tabs = ["about", "stats", "moves", "evolutions"]

  const bgColor = computed(() => {
    return colors[pokemon?.types["0"].type.name]
  })

  const pokemonId = computed(() => {
    return String(pokemon?.id).padStart(3, "0")
  })
</script>

<style scoped>
  .header {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
  }

  .sprite-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-transform: capitalize;
  }

  .image {
    width: 20rem;
    height: 20rem;
  }

  .tabs-wrapper {
    margin: 1rem;
  }
</style>
