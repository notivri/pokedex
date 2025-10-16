import { ref } from "vue"
import * as api from "../api/index"

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
  if (cache.evolution_chain.has(url)) {
    return cache.evolution_chain.get(url)
  }

  const data = await api.fetchPokemonEvolutionChain(url)
  cache.evolution_chain.set(url, data)
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
