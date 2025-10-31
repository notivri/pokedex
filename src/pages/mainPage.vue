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

    <searchBar v-model="nameFilter" />

    <pokemonsSearchGrid
      class="main-pokemon-grid"
      :pokemons="displayedPokemons"
      @go-to-pokemon="goToPokemon"
    />

    <div v-if="isLoading" class="loader-container">
      <bLoading />
    </div>
    <div ref="loadMoreTrigger" />
  </div>
</template>
<script setup>
  import pokemonsHistoryCarousel from "@/widgets/historyCarousel.vue"
  import pokemonsSearchGrid from "@/widgets/cardsGrid.vue"
  import searchBar from "@/widgets/searchBar.vue"
  import bLoading from "@/shared/ui/bLoading.vue"
  import { usePokemon } from "@/entites/pokemon/model/usePokemon"
  import { useHistoryStore } from "@/entites/pokemon/stores/useHistoryStore"
  import { useRouter } from "vue-router"
  import { useObserver, useDebounce } from "@/shared/lib"

  const { allPokemons, getPokemon, getAllPokemonsList } = usePokemon()
  const historyStore = useHistoryStore()
  const router = useRouter()

  const DEBOUNCE_TIME = 500

  const isLoading = ref(false)
  const limit = ref(7)
  const offset = ref(0)
  const displayedPokemons = ref([])
  const historyPokemons = ref([])
  const nameFilter = ref("")
  const debouncedNameFilter = useDebounce(nameFilter, DEBOUNCE_TIME)

  const loadMoreTrigger = ref(null)
  useObserver(loadMoreTrigger, loadMore)

  const filteredPokemons = computed(() => {
    if (!debouncedNameFilter.value) return allPokemons.value

    return allPokemons.value.filter(
      (p) =>
        p.name.startsWith(debouncedNameFilter.value.toLowerCase()) ||
        p.id.startsWith(debouncedNameFilter.value)
    )
  })

  function goToPokemon(pokemonId) {
    historyStore.add(pokemonId)
    router.push({ name: "pokemonPage", params: { id: pokemonId } })
  }

  async function loadMore() {
    if (isLoading.value) return
    isLoading.value = true

    try {
      if (!allPokemons.value.length) {
        await getAllPokemonsList()
      }

      const nextSlice = filteredPokemons.value.slice(
        offset.value,
        offset.value + limit.value
      )
      if (!nextSlice.length) return

      const pokemonsData = await Promise.all(
        nextSlice.map(async (p) => await getPokemon(p.name))
      )

      displayedPokemons.value.push(...pokemonsData)
      offset.value += limit.value
    } catch (error) {
      console.error(error)
    } finally {
      isLoading.value = false
    }
  }

  watch(
    () => historyStore.getIds(),
    async (ids) => {
      if (!ids.length) {
        historyPokemons.value = []
        return
      }

      const pokemonsData = await Promise.all(ids.map((id) => getPokemon(id)))
      historyPokemons.value = pokemonsData
    },
    { immediate: true }
  )

  watch(filteredPokemons, () => {
    offset.value = 0
    displayedPokemons.value = []
    loadMore()
  })

  onMounted(async () => {
    const isMobile = window.innerWidth < 768
    limit.value = isMobile ? 14 : 30

    await getAllPokemonsList()
    await loadMore()
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

  .loader-container {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
  }

  @media (min-width: 768px) {
    .wrapper {
      padding: 0 2rem 2rem 2rem;
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
