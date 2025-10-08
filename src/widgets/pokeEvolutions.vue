<template>
  <div class="evo-wrapper" v-if="evolutionStages.length">
    <div
      class="stage"
      v-for="pokemonStage in evolutionStages"
      :key="pokemonStage.id"
    >
      <router-link :to="`/pokemon/${pokemonStage.id}`" class="stage-card">
        <img
          :src="pokemonStage.image"
          :alt="pokemonStage.name"
          :class="{ inactive: pokemonStage.name !== pokemon.name }"
        />
        <div class="name-wrapper">
          <span
            :class="{ inactive: pokemonStage.name !== pokemon.name }"
            class="name"
          >
            {{ pokemonStage.name }}
          </span>
          <span class="id">#{{ pokemonStage.id }}</span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
  import { computed } from "vue"

  const props = defineProps(["pokemonData"])
  const pokemon = props.pokemonData

  const evolutionStages = computed(() => props.pokemonData?.evolutions ?? [])
</script>

<style scoped>
  .evo-wrapper {
    display: flex;
    align-items: center;
    gap: 1rem;
    background: white;
    padding: 3rem;
    border-radius: 1rem;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.06);
  }

  .stage {
    display: flex;
    align-items: center;
    gap: 1rem;

    &:not(:last-child)::after {
      content: "→";
      font-size: 1.5rem;
      color: rgba(0, 0, 0, 0.4);
    }
  }

  .stage-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    color: inherit;
  }

  .stage-card img {
    width: 8rem;
    object-fit: contain;

    &.inactive {
      filter: opacity(40%);
    }
  }

  .name {
    text-transform: capitalize;
    font-family: "Archive";
    margin-top: 4px;

    &.inactive {
      filter: opacity(40%);
    }
  }

  .name-wrapper {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .id {
    color: gray;
    font-size: 12pt;
  }
</style>
