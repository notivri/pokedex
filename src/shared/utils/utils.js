function getIdFromURL(rawPokemon) {
  return rawPokemon.map((pokemon) => {
    const id = pokemon.url.split("/").filter(Boolean).pop()
    return { ...pokemon, id }
  })
}

function normalisePokemons(pokemons) {
  return pokemons.map(({ pokemon }) => ({
    name: pokemon.name,
    url: pokemon.url,
  }))
}

export { getIdFromURL, normalisePokemons }
