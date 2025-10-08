<template>
  <div class="wrapper">
    <div v-if="props.types" class="types">
      <pokeType
        v-for="(type, index) in props.types"
        :key="index"
        :color="typeColors[type.name]"
        :class="{ inactive: props.selectedType !== type.name }"
        @click="$emit('selectType', type.name)"
      >
        {{ type.name }}
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
    max-width: 1200px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  button {
    all: unset;
    cursor: pointer;
    transition: 0.2s ease;

    &:hover {
      scale: 110%;
    }
  }

  .types {
    display: grid;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    max-width: 100%;
  }
</style>
