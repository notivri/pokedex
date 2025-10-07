const API_URL = "https://pokeapi.co/api/v2"

async function getPokemons(amount = 9, from = 0) {
  try {
    const response = await fetch(
      API_URL + `/pokemon?limit=${amount}&offset=${from}`
    )

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`)
    }

    const data = await response.json()

    return data.results
  } catch (err) {
    return "API ERROR " + err
  }
}

async function getPokemonData(id) {
  try {
    const response = await fetch(API_URL + `/pokemon/${id}`)

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`)
    }

    const data = await response.json()

    return data
  } catch (err) {
    return "API ERROR " + err
  }
}

async function getPokemonSpecies(id) {
  try {
    const response = await fetch(API_URL + `/pokemon-species/${id}`)

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`)
    }

    const data = await response.json()

    return data
  } catch (err) {
    return "API ERROR " + err
  }
}

export { getPokemons, getPokemonData, getPokemonSpecies }
