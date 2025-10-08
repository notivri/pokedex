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

  async getAllTypes() {
    const data = await this._fetch("type", { limit: 10000 })

    return data.results
  }

  async getPokemons(limit = 21, offset = 0) {
    const data = await this._fetch("pokemon", { limit, offset })

    return data.results
  }

  async getPokemonsByType(typeName) {
    const data = await this._fetch(`type/${typeName}`)

    return data.pokemon.map((p) => p.pokemon)
  }

  async getPokemonDetails(urlOrId) {
    const path = urlOrId.startsWith("http")
      ? new URL(urlOrId).pathname
      : `pokemon/${urlOrId}`

    const data = await this._fetch(path)
    const speciesData = await this._fetch(data.species.url)

    return {
      id: data.id,
      name: data.name,
      image: data.sprites.other["official-artwork"]["front_default"],
      types: data.types,
      color: speciesData.color.name,
    }
  }
}

export default new Api()
