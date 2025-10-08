<template>
  <div class="evo-wrapper" v-if="evolutionStages.length">
    <div class="stage" v-for="(p, idx) in evolutionStages" :key="p.id">
      <router-link :to="`/pokemon/${p.id}`" class="stage-card">
        <img
          :src="p.image"
          :alt="p.name"
          :class="{ inactive: p.name !== pokemon.name }"
        />
        <div class="name-wrapper">
          <span :class="{ inactive: p.name !== pokemon.name }" class="name">
            {{ p.name }}
          </span>
          <span class="id">#{{ p.id }}</span>
        </div>
      </router-link>
      <div v-if="idx < evolutionStages.length - 1" class="arrow">→</div>
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

  .name-wrapper {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .name {
    text-transform: capitalize;
    font-family: "Archive";
    margin-top: 4px;

    &.inactive {
      filter: opacity(40%);
    }
  }

  .id {
    color: gray;
    font-size: 12pt;
  }

  .arrow {
    font-size: 1.5rem;
    color: rgba(0, 0, 0, 0.4);
  }
</style>
