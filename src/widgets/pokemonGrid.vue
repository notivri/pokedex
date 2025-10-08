<template>
  <div class="wrapper">
    <div class="gridWrapper">
      <router-link
        v-for="pokemon in props.pokemonsOnPage"
        :key="pokemon.id"
        :to="`/pokemon/${pokemon.id}`"
      >
        <pokeCard :color="pokeColors[pokemon.species.color.name]">
          <template #name>
            {{ pokemon.name.replace("-", " ") }}
          </template>

          <template #id>
            {{ pokemon.id }}
          </template>

          <template #types>
            <pokeType
              v-for="t in pokemon.types"
              :key="t.slot"
              :color="typeColors[t.type.name]"
            >
              {{ t.type.name }}
            </pokeType>
          </template>

          <template #image>
            <img
              class="pokemon-image"
              :src="pokemon.sprites.other['official-artwork']['front_default']"
              :alt="pokemon.name"
            />
          </template>
        </pokeCard>
      </router-link>
    </div>
  </div>
</template>

<script setup>
  import pokeCard from "../shared/ui/pokeCard.vue"
  import pokeType from "../shared/ui/pokeType.vue"

  import { pokeColors, typeColors } from "../shared/constants/colors"

  const props = defineProps(["pokemonsOnPage"])
</script>
<style scoped>
  .gridWrapper {
    display: grid;
    justify-content: center;
    gap: 2rem;
    grid-template-columns: repeat(3, 1fr);
  }
</style>
