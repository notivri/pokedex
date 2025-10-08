const API_URL = "https://pokeapi.co/api/v2/"

class Api {
  constructor(baseUrl = API_URL) {
    this.baseUrl = new URL(baseUrl)
  }

  async _fetch(path, params = {}) {
    const url = new URL(path, this.baseUrl)
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value)
    })

    try {
      const response = await fetch(url.href)

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error(`API ERROR for URL: ${url.href}`, error)

      throw error
    }
  }

  async getPokemon(idOrName) {
    const response = await this._fetch(`pokemon/${idOrName}`)

    return response
  }

  async getPokemonSpecies(idOrName) {
    const response = await this._fetch(`pokemon-species/${idOrName}`)

    return response
  }

  async getPokemonEvolution(idOrName) {
    const response = await this._fetch(`evolution-chain/${idOrName}`)

    return response.chain
  }

  async getTypeInfo(typeName) {
    const response = await this._fetch(`type/${typeName}`)

    return response
  }

  async getAllPokemons(limit = 21, offset = 0) {
    const response = await this._fetch("pokemon", { limit, offset })

    return response.results
  }

  async getAllPokemonTypes() {
    const response = await this._fetch("type", { limit: 1000 })

    return response.results
  }

  async getDataFromURL(url) {
    const response = await this._fetch(url)

    return response?.results ?? response
  }
}

export default new Api()
