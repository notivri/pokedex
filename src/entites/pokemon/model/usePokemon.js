import * as api from "../api/index"

const allPokemons = ref([])
const cachedPokemons = reactive({})

async function getPokemonData(name) {
  if (cachedPokemons[name]) {
    return cachedPokemons[name]
  }

  try {
    const data = await api.getPokemon(name)

    cachedPokemons[name] = data

    return data
  } catch (e) {
    console.error("Error fetching pokemon details:", e)

    return null
  }
}

async function getAllPokemonsList() {
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
    getPokemonData,
    getAllPokemonsList,
  }
}
