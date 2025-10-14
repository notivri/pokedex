<template>
  <div class="wrapper">
    <div class="text">
      <h1>Pokedex</h1>
      <h3>
        Use the advanced search to find Pokemon by type, weakness, ability and
        more!
      </h3>
    </div>

    <searchBar placeholder="Search a pokemon" />

    <pokeGrid :pokemons="displayedPokemons" />

    <div ref="loadMoreTrigger" />
  </div>
</template>

<script setup>
  import searchBar from "@/widgets/searchBar.vue"
  import pokeGrid from "@/widgets/pokeGrid.vue"
  import { usePokemon } from "@/entites/pokemon/model/usePokemon"

  const { allPokemons, getPokemonDetails, fetchAllPokemonsList } = usePokemon()

  const limit = ref(20)
  const offset = ref(0)
  const loadMoreTrigger = ref(null)
  const displayedPokemons = ref([])

  let observer = null

  async function loadMore() {
    if (!allPokemons.value.length) {
      await fetchAllPokemonsList()
    }

    const nextSlice = allPokemons.value.slice(
      offset.value,
      offset.value + limit.value
    )
    if (!nextSlice.length) return

    const skeletons = nextSlice.map((p) => ({
      ...p,
      isLoaded: false,
    }))
    displayedPokemons.value.push(...skeletons)

    const loadedData = await Promise.all(
      nextSlice.map(async (p) => {
        const data = await getPokemonDetails(p.name)
        return { ...p, ...data, isLoaded: true }
      })
    )

    displayedPokemons.value.splice(offset.value, limit.value, ...loadedData)

    offset.value += limit.value
  }

  const setupIntersectionObserver = () => {
    if (!loadMoreTrigger.value) return

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadMore()
        }
      },
      { root: null, threshold: 1.0 }
    )

    observer.observe(loadMoreTrigger.value)
  }

  onMounted(async () => {
    await fetchAllPokemonsList()
    await loadMore()
    setupIntersectionObserver()
  })

  onUnmounted(() => {
    observer?.disconnect()
  })
</script>

<style scoped>
  .wrapper {
    margin: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .text {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
</style>
