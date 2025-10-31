<template>
  <div class="wrapper" v-if="!isLoading">
    <div
      class="sprite-wrapper"
      :style="{
        background: `linear-gradient(180deg, ${bgColor} 0%, var(--color-bg-main) 90%)`,
      }"
    >
      <div class="header">
        <bButton class="no-bg" @click="router.push('/main')">
          <template #icon>
            <img src="@\app\assets\icons\arrow.svg" />
          </template>
        </bButton>
        <span class="id"> #{{ pokemonId }} </span>
        <bButton class="no-bg">
          <template #icon>
            <img src="@\app\assets\icons\heart.svg" />
          </template>
        </bButton>
      </div>
      <img class="image" :src="imageSrc" />
      <h1>{{ pokemon?.name }}</h1>
      <h3>{{ pokemon?.species?.genera?.[7]?.genus }}</h3>
    </div>

    <div class="content-container">
      <template v-if="isMobile">
        <bNavBar :tabs />
        <div v-if="pokemon" class="tabs-wrapper">
          <router-view :pokemon :species :chain="detailedEvolutionChain" />
        </div>
      </template>

      <template v-else>
        <div v-if="pokemon" class="desktop-layout">
          <div class="desktop-column">
            <section class="desktop-section">
              <h2>About</h2>
              <aboutTab :pokemon :species />
            </section>

            <section class="desktop-section">
              <h2>Stats</h2>
              <statsTab :pokemon />
            </section>
          </div>

          <div class="desktop-column">
            <section class="desktop-section">
              <h2>Evolutions</h2>
              <evolutionsTab :chain="detailedEvolutionChain" />
            </section>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
  import { useRoute, useRouter } from "vue-router"
  import { usePokemon } from "@/entites/pokemon/model/usePokemon"
  import { parseEvolutionChain } from "@/entites/pokemon/lib/utils"
  import { colors } from "@/entites/pokemon/lib/constants"

  import bButton from "@/shared/ui/bButton.vue"
  import bNavBar from "@/shared/ui/bNavBar.vue"
  import aboutTab from "@/widgets/pokemonTabs/aboutTab.vue"
  import evolutionsTab from "@/widgets/pokemonTabs/evolutionsTab.vue"
  import statsTab from "@/widgets/pokemonTabs/statsTab.vue"

  const route = useRoute()
  const router = useRouter()
  const { getPokemon, getPokemonSpecies, getPokemonEvolutionChain } =
    usePokemon()

  const mobileWidth = 768
  const tabs = ["about", "stats", "evolutions"]

  const isLoading = ref(true)
  const pokemon = ref(null)
  const species = ref(null)
  const detailedEvolutionChain = ref([])

  const isMobile = ref(false)
  let mediaQuery

  const bgColor = computed(() => {
    const typeName = pokemon.value?.types?.[0]?.type?.name
    return typeName ? colors[typeName] : "var(--color-bg-main)"
  })

  const pokemonId = computed(() =>
    pokemon.value?.id ? String(pokemon.value.id).padStart(3, "0") : ""
  )

  const imageSrc = computed(
    () =>
      pokemon.value?.sprites?.other?.["official-artwork"]?.front_default ??
      pokemon.value?.sprites?.front_default ??
      ""
  )

  async function loadPokemonData(id) {
    try {
      isLoading.value = true

      const pokemonData = await getPokemon(id)
      const speciesData = await getPokemonSpecies(pokemonData.species.name)
      const evolutionChainData = await getPokemonEvolutionChain(
        speciesData?.evolution_chain?.url
      )

      const parsed = parseEvolutionChain(evolutionChainData)
      const detailed = await Promise.all(
        parsed.map(async (evo) => {
          const evoPokemonData = await getPokemon(evo.id)
          return {
            ...evo,
            image:
              evoPokemonData?.sprites["front_default"] ??
              evoPokemonData?.sprites["other"]["showdown"]["front_default"],
            types: evoPokemonData?.types,
          }
        })
      )

      pokemon.value = pokemonData
      species.value = speciesData
      detailedEvolutionChain.value = detailed
    } catch (error) {
      console.error("Cant fetch pokemon data ", error)
      router.replace({ name: "mainPage" })
    } finally {
      isLoading.value = false
    }
  }

  onMounted(() => {
    loadPokemonData(route.params.id)

    mediaQuery = window.matchMedia(`(max-width: ${mobileWidth}px)`)
    isMobile.value = mediaQuery.matches
    mediaQuery.addEventListener("change", (e) => (isMobile.value = e.matches))
  })

  onUnmounted(() => {
    mediaQuery?.removeEventListener("change", () => {})
  })
</script>

<style scoped>
  .wrapper {
    width: 100%;
    overflow-x: hidden;
  }

  .header {
    display: flex;
    width: 100%;
    max-width: 1100px;
    margin: 0 auto;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    box-sizing: border-box;
  }

  .sprite-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-transform: capitalize;
    width: 100%;
    padding-bottom: 1.5rem;

    h1 {
      margin-top: 1rem;
      margin-bottom: 0.25rem;
      padding: 0 1rem;
      text-align: center;
      word-break: break-word;
    }

    h3 {
      margin: 0;
      padding: 0 1rem;
      text-align: center;
      font-weight: 500;
      color: var(--color-text-secondary);
    }
  }

  .image {
    width: 400px;
    max-width: 20rem;
    height: auto;
    object-fit: contain;
    margin-top: 1rem;
  }

  .content-container {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 1rem;
    box-sizing: border-box;
  }

  .tabs-wrapper {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  .desktop-layout {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    margin: 2rem 0;
  }

  .desktop-column {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .desktop-section {
    background: var(--color-bg-secondary);
    border-radius: 16px;
    padding: 1.5rem;
    box-shadow: 0 4px 20px var(--color-shadow);

    h2 {
      margin-top: 0;
      margin-bottom: 1.5rem;
      padding-bottom: 0.75rem;
      border-bottom: 1px solid var(--color-border);
      font-size: 1.25rem;
      text-transform: capitalize;
    }
  }

  @media (min-width: 769px) {
    .image {
      max-width: 25rem;
    }

    .heade,
    .content-container {
      padding-left: 1.5rem;
      padding-right: 1.5rem;
    }

    .sprite-wrapper h1 {
      font-size: 2.5rem;
    }

    .sprite-wrapper h3 {
      font-size: 1.25rem;
    }
  }

  @media (min-width: 1024px) {
    .desktop-layout {
      grid-template-columns: 1fr 1fr;
    }
  }
</style>
