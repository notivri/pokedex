<template>
  <main>
    <div class="wrapper">
      <typeSelector
        :types="allTypes"
        :selectedType
        @select-type="handleSelectType"
      />
      <pokemonGrid :pokemonsOnPage />
    </div>
  </main>
</template>

<script setup>
  import { ref, onMounted } from "vue"
  import pokemonGrid from "../widgets/pokemonGrid.vue"
  import typeSelector from "../widgets/typeSelector.vue"
  import Api from "../entites/pokemon"
  import { getIdFromUrl } from "../shared/lib/pokemon"

  const MAX_ID = 151

  const pokemonsOnPage = ref([])
  const allTypes = ref([{ name: "all" }])
  const selectedType = ref("all")

  const loading = ref(false)

  function handleSelectType(typeName) {
    if (selectedType.value == typeName) return

    selectedType.value = typeName
    pokemonsOnPage.value = []
    loadPokemons()
  }

  async function loadPokemons() {
    loading.value = true

    try {
      let pokemonList = null

      if (selectedType.value === "all") {
        const data = await Api.getAllPokemons()
        pokemonList = data
      } else {
        const data = await Api.getTypeInfo(selectedType.value)
        pokemonList = data.pokemon.map((p) => p.pokemon)
      }

      const detailedPokemons = await Promise.all(
        pokemonList
          .filter((pokemon) => getIdFromUrl(pokemon.url) <= MAX_ID)
          .map(async (pokemon) => {
            const pokemonName = pokemon?.name ?? pokemon.pokemon.name

            const details = await Api.getPokemon(pokemonName)
            const species = await Api.getPokemonSpecies(pokemonName)
            return { ...details, species }
          })
      )

      pokemonsOnPage.value = detailedPokemons
    } catch (err) {
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  onMounted(async () => {
    allTypes.value.push(...(await Api.getAllPokemonTypes()))
    loadPokemons()
  })
</script>

<style scoped>
  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5rem;
  }
</style>
