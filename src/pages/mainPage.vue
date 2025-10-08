<template>
  <main>
    <div class="wrapper">
      <typeSelector :types :selectedType @select-type="handleSelectType" />
      <pokemonGrid :pokemons="pokemonsOnPage" />
    </div>
  </main>
</template>

<script setup>
  import { ref, computed, onMounted, watch } from "vue"
  import api from "../entites/pokemon/api/api.js"
  import pokemonGrid from "../widgets/pokemonGrid.vue"
  import typeSelector from "../widgets/typeSelector.vue"

  const MAX_ITEMS_PER_PAGE = 21

  const pokemonList = ref([])
  const pokemonsOnPage = ref([])
  const types = ref([])
  const selectedType = ref("all")
  const currentPage = ref(1)

  const paginatedList = computed(() => {
    const start = (currentPage.value - 1) * MAX_ITEMS_PER_PAGE
    const end = start + MAX_ITEMS_PER_PAGE

    return pokemonList.value.slice(start, end)
  })

  const loadPokemonList = async (listPromise) => {
    try {
      pokemonList.value = await listPromise
    } catch (error) {
      console.error("Failed to load pokemon list:", error)
      pokemonList.value = []
    }
  }

  const handleSelectType = async (type) => {
    selectedType.value = type
    currentPage.value = 1

    if (type === "all") {
      await loadPokemonList(api.getPokemons(151))
    } else {
      await loadPokemonList(api.getPokemonsByType(type))
    }
  }

  onMounted(async () => {
    try {
      const [loadedTypes] = await Promise.all([
        api.getAllTypes(),
        handleSelectType("all"),
      ])

      types.value = [{ name: "all" }, ...loadedTypes]
    } catch (error) {
      console.error("Failed initial data load", error)
    }
  })

  watch(paginatedList, async (newPokemonList) => {
    if (newPokemonList.length === 0) {
      pokemonsOnPage.value = []
      return
    }

    try {
      const detailedPokemons = await Promise.all(
        newPokemonList.map((p) => api.getPokemonDetails(p.url))
      )
      pokemonsOnPage.value = detailedPokemons
    } catch (error) {
      console.error("Failed to load pokemon details:", error)
    }
  })
</script>

<style>
  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5rem;
  }
</style>
