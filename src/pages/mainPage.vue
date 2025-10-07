<template>
  <main>
    <div class="wrapper">
      <div class="gridWrapper">
        <router-link
          v-for="pokemon in pokemons"
          :key="pokemon.id"
          :to="`/pokemon/${pokemon.id}`"
        >
          <pokeCard v-if="pokemon.color" :color="colors[pokemon.color]">
            <template #name>
              {{ pokemon.name }}
            </template>

            <template #id>
              {{ pokemon.id }}
            </template>

            <template #types>
              <pokeType v-for="type in pokemon.types" :key="type.slot">
                {{
                  type.type.name.charAt(0).toUpperCase() +
                  type.type.name.slice(1)
                }}
              </pokeType>
            </template>

            <template #image>
              <img
                class="pokemon-image"
                :src="pokemon.image"
                :alt="pokemon.name"
              />
            </template>
          </pokeCard>
        </router-link>
      </div>
    </div>
  </main>
</template>

<script setup>
  import { ref, onMounted } from "vue"
  import {
    getPokemons,
    getPokemonData,
    getPokemonSpecies,
  } from "../entites/pokemon/api"
  import pokeCard from "../shared/ui/pokeCard.vue"
  import pokeType from "../shared/ui/pokeType.vue"
  import { colors } from "../shared/constants/colors"

  const pokemons = ref([])

  onMounted(async () => {
    const basePokemons = await getPokemons()
    const withIds = basePokemons.map((p) => {
      const id = p.url.split("/").filter(Boolean).pop()
      return { ...p, id, image: null }
    })

    pokemons.value = withIds

    pokemons.value.forEach(async (pokemon) => {
      const data = await getPokemonData(pokemon.id)
      const species = await getPokemonSpecies(pokemon.id)
      pokemon.image = data.sprites.other["official-artwork"]["front_default"]
      pokemon.types = data.types
      pokemon.color = species.color.name

      console.log(species)
    })
  })
</script>

<style>
  .wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .gridWrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2.5rem;
  }
</style>
