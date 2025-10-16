import Api from "@/shared/api/index"

const pokemonApi = new Api(import.meta.env.VITE_API_URL)

async function fetchPokemon(name) {
  return await pokemonApi.get(`pokemon/${name}`)
}

async function fetchPokemonSpecies(name) {
  return await pokemonApi.get(`pokemon-species/${name}`)
}

async function fetchPokemonEvolutionChain(id) {
  const response = await pokemonApi.get(`evolution-chain/${id}`)
  return response.chain
}

async function fetchAllPokemons() {
  const response = await pokemonApi.get("pokemon", { limit: 10000 })
  return response.results
}

export {
  fetchPokemon,
  fetchPokemonSpecies,
  fetchPokemonEvolutionChain,
  fetchAllPokemons,
}
