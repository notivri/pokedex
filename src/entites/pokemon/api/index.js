import Api from "@/shared/api/index"

const pokemonApi = new Api(import.meta.env.VITE_API_URL)

async function fetchPokemon(idOrName) {
  return await pokemonApi.get(`pokemon/${idOrName}`)
}

async function fetchPokemonSpecies(url) {
  return await pokemonApi.get(`pokemon-species/${url}`)
}

async function fetchPokemonEvolution(id) {
  const response = await pokemonApi.get(`evolution-chain/${id}`)
  return response.chain
}

async function fetchAllPokemons() {
  const response = await pokemonApi.get("pokemon", { limit: 150 })
  return response.results
}

export {
  fetchPokemon,
  fetchPokemonSpecies,
  fetchPokemonEvolution,
  fetchAllPokemons,
}
