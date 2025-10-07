<template>
  <main>
    <div class="wrapper">
      <typeSelector :types :selectedType @select-type="handleSelectType" />
      <pokemonGrid :pokemons="paginatedPokemons" />
    </div>
  </main>
</template>

<script setup>
  import api from "../entites/pokemon/api/api.js"

  import pokemonGrid from "../widgets/pokemonGrid.vue"
  import typeSelector from "../widgets/typeSelector.vue"

  import { getIdFromURL, normalisePokemons } from "../shared/utils/utils.js"
  import { ref, computed, watch, onMounted } from "vue"

  const pokemons = ref([])
  const selectedType = ref("all")
  const currentPage = ref(1)

  const maxItems = 21
  // const lastPage = computed(() =>
  //   Math.ceil(pokemons.value.length / maxItems)
  // )

  const start = computed(() => {
    return (currentPage.value - 1) * maxItems
  })

  const end = computed(() => {
    return start.value + maxItems
  })

  const paginatedPokemons = computed(() => {
    return pokemons.value.slice(start.value, end.value)
  })

  const types = [
    { name: "all" },
    ...(await api.getResultsFrom("/type", { limit: 10000 })),
  ]

  const handleSelectType = async (type) => {
    selectedType.value = type
    currentPage.value = 1

    if (type === "all") {
      const rawPokemons = await api.getResultsFrom("/pokemon", { limit: 21 })
      const idPokemons = getIdFromURL(rawPokemons)

      pokemons.value = idPokemons

      return
    }

    const typesData = await api.getDataFrom(`/type/${type}`)
    const typedPokemons = typesData.pokemon
    const normalisedPokemons = normalisePokemons(typedPokemons)
    const idPokemons = getIdFromURL(normalisedPokemons)

    pokemons.value = idPokemons
  }

  watch(pokemons, () => {
    pokemons.value.forEach(async (pokemon) => {
      const data = await api.getDataFrom(`/pokemon/${pokemon.id}`)

      if (!data) return

      const speciesUrl = data.species.url

      const species = await api.getDataFrom(speciesUrl)

      pokemon.image = data.sprites.other["official-artwork"]["front_default"]
      pokemon.types = data.types
      pokemon.color = species.color.name
    })
  })

  onMounted(async () => {
    if (pokemons.value.length === 0) {
      const rawPokemons = await api.getResultsFrom("/pokemon", { limit: 21 })
      const idPokemons = getIdFromURL(rawPokemons)

      pokemons.value = idPokemons
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
