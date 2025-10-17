<template>
  <div class="widget-wrapper">
    <div class="search-bar-wrapper">
      <bInput v-model="model" placeholder="Search a pokemon" />
      <bButton>
        <template #icon>
          <img src="@\app\assets\icons\filter.svg" alt="" />
        </template>
      </bButton>
    </div>

    <div class="grid-wrapper">
      <pokeCard
        v-for="(pokemon, index) in props.pokemons"
        :key="pokemon.id"
        :pokemon="pokemon"
        v-bind="index === 0 ? { ref: props.firstCardRef } : {}"
        @click="emit('goToPokemon', pokemon.id)"
      />
    </div>
  </div>
</template>

<script setup>
  import bInput from "@/shared/ui/bInput.vue"
  import bButton from "@/shared/ui/bButton.vue"

  import pokeCard from "@/entites/pokemon/ui/pokemonCard.vue"

  const props = defineProps({
    pokemons: Array,
    modelValue: String,
    firstCardRef: Object,
  })

  const emit = defineEmits(["update:modelValue", "goToPokemon"])

  const model = computed({
    get: () => props.modelValue,
    set: (value) => emit("update:modelValue", value),
  })
</script>

<style scoped>
  .widget-wrapper {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .search-bar-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 0.5rem;
  }

  .search-bar-wrapper > :first-child {
    flex-grow: 1;
    flex-shrink: 1;
    max-width: 500px;
  }

  .grid-wrapper {
    display: grid;
    gap: 0.5rem;
    grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
  }
</style>
