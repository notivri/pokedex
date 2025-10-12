<template>
  <div class="wrapper">
    <div class="text">
      <h1>Pokedex</h1>
      <h3>
        Use the advanced search to find Pokemon by type, weakness, ability and
        more!
      </h3>
    </div>

    <searchBar placeholder="Search a pokemon" />

    <pokeGrid :pokemons="detailedPokemons" />

    <div ref="loadMoreTrigger" />
  </div>
</template>

<script setup>
  import searchBar from "@/widgets/searchBar.vue"
  import pokeGrid from "@/widgets/pokeGrid.vue"
  import { usePokemon } from "@/entites/pokemon/model/usePokemon"

  const { detailedPokemons, loadMore } = usePokemon()

  const loadMoreTrigger = ref(null)

  let observer = null

  const setupIntersectionObserver = () => {
    if (!loadMoreTrigger.value) return

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadMore()
        }
      },
      { root: null, threshold: 1.0 }
    )

    observer.observe(loadMoreTrigger.value)
  }

  onMounted(async () => {
    setupIntersectionObserver()
  })

  onUnmounted(() => {
    observer?.disconnect()
  })
</script>

<style scoped>
  .wrapper {
    margin: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .text {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
</style>
