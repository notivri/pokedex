import * as api from "../api/index"
import { getIdFromUrl } from "../lib/utils"

const allPokemons = ref([])

const cache = {
  pokemon: new Map(),
  species: new Map(),
  evolution_chain: new Map(),
}

async function getPokemon(name) {
  if (cache.pokemon.has(name)) {
    return cache.pokemon.get(name)
  }

  const data = await api.fetchPokemon(name)
  cache.pokemon.set(name, data)
  return data
}

async function getPokemonSpecies(name) {
  if (cache.species.has(name)) {
    return cache.species.get(name)
  }

  const data = await api.fetchPokemonSpecies(name)
  cache.species.set(name, data)
  return data
}

async function getPokemonEvolutionChain(url) {
  const id = getIdFromUrl(url)

  if (cache.evolution_chain.has(id)) {
    return cache.evolution_chain.get(id)
  }

  const data = await api.fetchPokemonEvolutionChain(id)
  cache.evolution_chain.set(id, data)
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
    getPokemonEvolutionChain,
    getAllPokemonsList,
  }
}
