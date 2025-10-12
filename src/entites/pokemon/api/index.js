import api from "@/shared/api/index"

export async function getPokemon(idOrName) {
  return api.get(`pokemon/${idOrName}`)
}

export async function getPokemonSpecies(idOrName) {
  return api.get(`pokemon-species/${idOrName}`)
}

export async function getPokemonEvolution(id) {
  const response = await api.get(`evolution-chain/${id}`)
  return response.chain
}

export async function getTypeInfo(typeName) {
  return api.get(`type/${typeName}`)
}

export async function getAllPokemons() {
  const response = await api.get("pokemon", { limit: 150 })
  return response.results
}

export async function getAllPokemonTypes() {
  const response = await api.get("type", { limit: 1000 })
  return response.results
}

export async function getDataFromURL(url) {
  const response = await api.get(url)
  return response?.results ?? response
}
