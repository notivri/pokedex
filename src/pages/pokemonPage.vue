<template>
  <main v-if="!loading">
    <pokeInfo :pokemon-data />
    <pokeEvolutions :pokemon-data />
  </main>
</template>

<script setup>
  import pokeInfo from "../widgets/pokeInfo.vue"
  import pokeEvolutions from "../widgets/pokeEvolutions.vue"
  import Api from "../entites/pokemon"
  import { useRoute, onBeforeRouteUpdate } from "vue-router"
  import { getIdFromUrl, getEvolutionIds } from "../shared/lib/pokemon"

  const router = useRoute()
  const pokemonId = ref(router.params.id)

  const loading = ref(true)
  const pokemonData = ref(null)

  async function loadPokemon() {
    loading.value = true

    try {
      const data = await Api.getPokemon(pokemonId.value)
      const species = await Api.getPokemonSpecies(pokemonId.value)

      let evolutionsPrepared = []
      const chainId = getIdFromUrl(species.evolution_chain.url)

      if (chainId) {
        const evolutionChain = await Api.getPokemonEvolution(chainId)
        const speciesIds = getEvolutionIds(evolutionChain)
        const evoDetails = await Promise.all(
          speciesIds.map((id) => Api.getPokemon(id))
        )

        evolutionsPrepared = evoDetails.map((detail) => ({
          id: detail.id,
          name: detail.name,
          image: detail.sprites["front_default"],
        }))
      }

      pokemonData.value = {
        ...data,
        species,
        evolutions: evolutionsPrepared,
      }
    } catch (err) {
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    loadPokemon()
  })

  onBeforeRouteUpdate((to) => {
    pokemonId.value = to.params.id
    loadPokemon()
  })
</script>

<style scoped>
  main {
    display: flex;
    justify-content: center;
    align-items: start;
    gap: 1rem;
  }
</style>
