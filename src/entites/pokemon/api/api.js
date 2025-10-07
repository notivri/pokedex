const API_URL = "https://pokeapi.co/api/v2"

class Api {
  constructor(baseUrl = API_URL) {
    this.baseUrl = baseUrl
  }

  async _fetch(pathOrUrl) {
    const isFullUrl = pathOrUrl.startsWith("http")
    const url = isFullUrl ? pathOrUrl : this.baseUrl + pathOrUrl

    try {
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`)
      }

      return await response.json()
    } catch (err) {
      console.error(`API ERROR for URL: ${url}`, err)
      return null
    }
  }

  async getDataFrom(path, id = "") {
    if (path.startsWith("http")) {
      return await this._fetch(path)
    }

    const normalizedPath = path.endsWith("/") ? path.slice(0, -1) : path
    const fullPath = id ? `${normalizedPath}/${id}` : normalizedPath

    return await this._fetch(fullPath)
  }

  async getResultsFrom(url, query = {}) {
    const stringifiedQuery = Object.entries(query)
      .map(([param, value]) => `${param}=${value}`)
      .join("&")

    const fullPath = `${url}?${stringifiedQuery}`

    const data = await this._fetch(fullPath)

    return data?.results ?? data
  }
}

const api = new Api()
export default api
