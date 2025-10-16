import Api from "@/shared/api/index"

const pokemonApi = new Api(import.meta.env.VITE_API_URL)

async function fetchPokemon(name) {
  return await pokemonApi.get(`pokemon/${name}`)
}

async function fetchPokemonSpecies(name) {
  return await pokemonApi.get(`pokemon-species/${name}`)
}

async function fetchPokemonEvolutionChain(url) {
  const response = await pokemonApi.get(url)
  return response.chain
}

async function fetchAllPokemons() {
  const response = await pokemonApi.get("pokemon", { limit: 150 })
  return response.results
}

export {
  fetchPokemon,
  fetchPokemonSpecies,
  fetchPokemonEvolutionChain,
  fetchAllPokemons,
}
