export function getIdFromUrl(url) {
  return url.split("/").slice(-2, -1)[0]
}

export function getEvolutionIds(chainRoot) {
  const ids = []

  function traverse(node) {
    if (!node) return
    ids.push(getIdFromUrl(node.species.url))
    node.evolves_to?.forEach(traverse)
  }

  traverse(chainRoot)
  return ids
}
