class Api {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }

  async get(path, params = {}) {
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
}

export default Api
