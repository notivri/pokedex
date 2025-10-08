export function getIdFromUrl(url) {
  const parts = url.split("/").filter(Boolean)
  return Number(parts[parts.length - 1])
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
