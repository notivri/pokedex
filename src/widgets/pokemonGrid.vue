<template>
  <div class="wrapper">
    <div class="gridWrapper">
      <router-link
        v-for="pokemon in props.pokemons"
        :key="pokemon.id"
        :to="`/pokemon/${pokemon.id}`"
      >
        <pokeCard v-if="pokemon.color" :color="pokeColors[pokemon.color]">
          <template #name>
            {{ pokemon.name }}
          </template>

          <template #id>
            {{ pokemon.id }}
          </template>

          <template #types>
            <pokeType
              v-for="type in pokemon.types"
              :key="type.slot"
              :color="typeColors[type.type.name]"
            >
              {{
                type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)
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
</template>

<script setup>
  import pokeCard from "../shared/ui/pokeCard.vue"
  import pokeType from "../shared/ui/pokeType.vue"

  import { pokeColors, typeColors } from "../shared/constants/colors"

  const props = defineProps(["pokemons"])
</script>
<style scoped>
  .gridWrapper {
    display: grid;
    justify-content: center;
    gap: 2rem;
    grid-template-columns: repeat(3, 1fr);
  }
</style>
