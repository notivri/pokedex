import * as api from "../api/index"
import { reactive, ref, computed } from "vue"
import { getIdFromUrl } from "../lib/utils"

const allPokemons = ref([])
const cachedPokemons = reactive({})

async function fetchPokemonDetails(idOrName) {
  const data = await api.getPokemon(idOrName)
  const species = await api.getPokemonSpecies(idOrName)

  return { ...data, species }
}

async function getPokemonDetails(name) {
  if (cachedPokemons[name]?.isLoaded) {
    return cachedPokemons[name].data
  }

  try {
    const data = await fetchPokemonDetails(name)
    cachedPokemons[name] = { data, isLoaded: true }
    return data
  } catch (e) {
    console.error("Error fetching pokemon details:", e)
    return null
  }
}

async function fetchAllPokemonsList() {
  if (allPokemons.value.length) return

  try {
    const list = await api.getAllPokemons()
    allPokemons.value = list
  } catch (e) {
    console.error("Error fetching all pokemon list:", e)
    return null
  }
}

export function usePokemon() {
  const limit = ref(20)
  const offset = ref(0)

  const visiblePokemons = computed(() =>
    allPokemons.value.slice(0, offset.value)
  )

  const detailedPokemons = computed(() =>
    visiblePokemons.value.map((p) => {
      const cached = cachedPokemons[p.name]

      return cached
        ? { ...p, ...cached.data, isLoaded: cached.isLoaded }
        : { ...p, isLoaded: false }
    })
  )

  async function loadMore() {
    if (!allPokemons.value.length) {
      await fetchAllPokemonsList()
    }

    const nextSlice = allPokemons.value.slice(
      offset.value,
      offset.value + limit.value
    )

    if (!nextSlice.length) return

    await Promise.all(nextSlice.map((p) => getPokemonDetails(p.name)))

    offset.value += nextSlice.length
  }

  async function getSinglePokemon(idOrName) {
    if (!allPokemons.value.length) {
      await fetchAllPokemonsList()
    }

    const pokemon = allPokemons.value.find(
      (p) =>
        p.name.toLowerCase() === idOrName.toString().toLowerCase() ||
        getIdFromUrl(p.url) === idOrName.toString()
    )

    if (!pokemon) return null
    return getPokemonDetails(pokemon.name)
  }

  return {
    detailedPokemons,
    allPokemons,
    loadMore,
    fetchAllPokemonsList,
    getSinglePokemon,
    limit,
    offset,
  }
}
