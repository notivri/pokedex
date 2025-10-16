function getIdFromUrl(url) {
  return url.split("/").slice(-2, -1)[0]
}

function parseEvolutionChain(chain) {
  const result = []

  function traverse(node) {
    if (!node) return

    const atLevel = node.evolution_details?.["0"]?.min_level ?? null

    result.push({
      id: getIdFromUrl(node.species.url),
      name: node.species.name,
      atLevel,
    })

    if (node.evolves_to?.length) {
      node.evolves_to.forEach(traverse)
    }
  }

  traverse(chain)
  return result
}

export { getIdFromUrl, parseEvolutionChain }
