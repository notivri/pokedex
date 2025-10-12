const API_URL = "https://pokeapi.co/api/v2/"

class Api {
  constructor(baseUrl) {
    this.baseUrl = new URL(baseUrl)
  }

  async get(path, params = {}) {
    const url = path.startsWith("http")
      ? new URL(path)
      : new URL(path, this.baseUrl)

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
}

export default new Api(API_URL)
