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

    <div v-if="props.pokemons?.length" class="grid-wrapper">
      <pokeCard
        v-for="pokemon in props.pokemons"
        :key="pokemon.id"
        :pokemon="pokemon"
        @click="onCardClick(pokemon)"
      />
    </div>
  </div>
</template>

<script setup>
  import bInput from "@/shared/ui/bInput.vue"
  import bButton from "@/shared/ui/bButton.vue"

  import pokeCard from "@/entites/pokemon/ui/pokemonCard.vue"

  import { useRouter } from "vue-router"

  const router = useRouter()

  const props = defineProps({
    pokemons: { type: Array, default: () => [] },
    modelValue: String,
  })

  const emit = defineEmits(["update:modelValue"])

  function onCardClick(pokemon) {
    if (pokemon?.isLoaded) {
      router.push({ name: "pokemonPage", params: { id: pokemon.id } })
    }
  }

  const model = computed({
    get: () => props.modelValue,
    set: (value) => emit("update:modelValue", value),
  })
</script>

<style scoped>
  .widget-wrapper{
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

  .grid-wrapper {
    display: grid;
    gap: 0.5rem;
    grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
  }

  .empty {
    height: 50vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
</style>
