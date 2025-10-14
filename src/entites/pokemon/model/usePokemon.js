import * as api from "../api/index"

const allPokemons = ref([])
const cachedPokemons = reactive({})

async function fetchPokemonDetails(idOrName) {
  const data = await api.getPokemon(idOrName)
  const species = await api.getPokemonSpecies(idOrName)
  return { ...data, species }
}

async function getPokemonDetails(name) {
  if (cachedPokemons[name]?.isLoaded) {
    return cachedPokemons[name].data
  }

  try {
    const data = await fetchPokemonDetails(name)
    cachedPokemons[name] = { data, isLoaded: true }
    return data
  } catch (e) {
    console.error("Error fetching pokemon details:", e)
    return null
  }
}

async function fetchAllPokemonsList() {
  if (allPokemons.value.length) return
  try {
    const list = await api.getAllPokemons()
    allPokemons.value = list
  } catch (e) {
    console.error("Error fetching all pokemon list:", e)
    return null
  }
}

export function usePokemon() {
  return {
    allPokemons,
    cachedPokemons,
    getPokemonDetails,
    fetchAllPokemonsList,
  }
}
