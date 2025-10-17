<template>
  <div class="wrapper">
    <div class="text">
      <h1>Pokedex</h1>
      <h3>
        Use the advanced search to find Pokemon by type, weakness, ability and
        more!
      </h3>
    </div>

    <pokemonsHistoryCarousel
      v-if="historyPokemons.length"
      :pokemons="historyPokemons"
      @go-to-pokemon="goToPokemon"
      @clear-history="() => historyStore.clear()"
    />

    <pokemonSearchGrid
      v-model="nameFilter"
      class="main-pokemon-grid"
      :pokemons="displayedPokemons"
      @go-to-pokemon="goToPokemon"
    />

    <div ref="loadMoreTrigger" />
  </div>
</template>

<script setup>
  import pokemonSearchGrid from "@/widgets/pokemonsSearchGrid.vue"
  import pokemonsHistoryCarousel from "@/widgets/pokemonsHistoryCarousel.vue"
  import { usePokemon } from "@/entites/pokemon/model/usePokemon"
  import { useHistoryStore } from "@/entites/pokemon/stores/useHistoryStore"
  import { useRouter } from "vue-router"
  import { watchEffect } from "vue"

  const { allPokemons, getPokemon, getAllPokemonsList } = usePokemon()
  const historyStore = useHistoryStore()
  const router = useRouter()

  const limit = ref(42)
  const offset = ref(0)
  const filteredPokemons = ref([])
  const displayedPokemons = ref([])
  const nameFilter = ref("")
  let timeout = null

  watch(nameFilter, (value) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      filteredPokemons.value = value
        ? allPokemons.value.filter(
            (p) =>
              p.name.startsWith(value.toLowerCase()) || p.id.startsWith(value)
          )
        : allPokemons.value

      offset.value = 0
      displayedPokemons.value = []
      loadMore()
    }, 300)
  })

  const loadMoreTrigger = ref(null)

  let observer = null

  const historyPokemons = ref([])

  function goToPokemon(pokemonId) {
    historyStore.add(pokemonId)
    router.push({ name: "pokemonPage", params: { id: pokemonId } })
  }

  async function loadMore() {
    if (!allPokemons.value.length) {
      await getAllPokemonsList()
    }

    const nextSlice = filteredPokemons.value.slice(
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
      { root: null, threshold: 0.5 }
    )

    observer.observe(loadMoreTrigger.value)
  }

  onMounted(async () => {
    await getAllPokemonsList()
    await loadMore()

    filteredPokemons.value = [...allPokemons.value]

    setupIntersectionObserver()
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  watchEffect(async () => {
    const ids = historyStore.getIds()
    if (!ids.length) {
      historyPokemons.value = []
      return
    }

    const pokemonsData = await Promise.all(ids.map((id) => getPokemon(id)))
    historyPokemons.value = pokemonsData
  })
</script>
<style scoped>
  .wrapper {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 1rem 1rem 1rem;
    box-sizing: border-box;
  }

  .text {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding-top: 1rem;

    h1 {
      font-size: 2.25rem;
    }

    h3 {
      color: var(--color-text-secondary);
      font-weight: 500;
      line-height: 1.5;
    }
  }

  @media (min-width: 768px) {
    .wrapper {
      padding: 0 2rem 2rem 2rem;
      gap: 1rem;
    }

    .text {
      align-items: center;
      padding-top: 2rem;
      text-align: center;
    }

    .text h1 {
      font-size: 3rem;
    }

    .text h3 {
      font-size: 1.15rem;
      max-width: 650px;
    }
  }
</style>
