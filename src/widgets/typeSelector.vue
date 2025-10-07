<template>
  <div class="wrapper">
    <div v-if="props.types" class="types">
      <pokeType
        v-for="(type, index) in props.types"
        :key="index"
        :color="typeColors[type.name]"
        @click="$emit('selectType', type.name)"
        :class="{ inactive: props.selectedType !== type.name }"
      >
        {{ type.name.charAt(0).toUpperCase() + type.name.slice(1) }}
      </pokeType>
    </div>
  </div>
</template>

<script setup>
  import pokeType from "../shared/ui/pokeType.vue"
  import { typeColors } from "../shared/constants/colors"

  const props = defineProps(["types", "selectedType"])
</script>

<style scoped>
  .wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .types {
    display: grid;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    max-width: 100%;

    & .active {
    }
  }

  @media (min-width: 1400px) {
    .types {
      grid-template-columns: repeat(10, 1fr);
    }
  }
</style>
