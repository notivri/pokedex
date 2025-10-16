import { ref } from "vue"
import * as api from "../api/index"

const allPokemons = ref([])

const cache = {
  pokemon: new Map(),
  species: new Map(),
}

async function getPokemon(name) {
  if (cache.pokemon.has(name)) {
    return cache.pokemon.get(name)
  }

  const data = await api.fetchPokemon(name)
  cache.pokemon.set(name, data)
  return data
}

async function getPokemonSpecies(url) {
  if (cache.species.has(url)) {
    return cache.species.get(url)
  }

  const data = await api.fetchPokemonSpecies(url)
  cache.species.set(url, data)
  return data
}

async function getAllPokemonsList() {
  if (allPokemons.value.length) return

  const list = await api.fetchAllPokemons()
  allPokemons.value = list
}

export function usePokemon() {
  return {
    allPokemons,
    getPokemon,
    getPokemonSpecies,
    getAllPokemonsList,
  }
}
