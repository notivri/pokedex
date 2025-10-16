<template>
  <div class="wrapper">
    <div class="text">
      <h1>Pokedex</h1>
      <h3>
        Use the advanced search to find Pokemon by type, weakness, ability and
        more!
      </h3>
    </div>

    <pokemonSearchGrid
      v-if="displayedPokemons.length"
      :pokemons="displayedPokemons"
    />

    <div ref="loadMoreTrigger" />
  </div>
</template>

<script setup>
  import pokemonSearchGrid from "@/widgets/pokemonSearchGrid.vue"
  import { usePokemon } from "@/entites/pokemon/model/usePokemon"

  const { allPokemons, getPokemon, getAllPokemonsList } = usePokemon()

  const limit = ref(20)
  const offset = ref(0)
  const displayedPokemons = ref([])

  const loadMoreTrigger = ref(null)

  let observer = null

  async function loadMore() {
    if (!allPokemons.value.length) {
      await getAllPokemonsList()
    }

    const nextSlice = allPokemons.value.slice(
      offset.value,
      offset.value + limit.value
    )
    if (!nextSlice.length) return

    const pokemonsData = await Promise.all(
      nextSlice.map(async (p) => {
        const data = await getPokemon(p.name)

        return data
      })
    )

    displayedPokemons.value.push(...pokemonsData)

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
    await getAllPokemonsList()
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
