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
        v-for="pokemon in props.pokemons"
        :key="pokemon.id"
        :pokemon="pokemon"
        @click="handleCardClick(pokemon)"
      />
    </div>
  </div>
</template>

<script setup>
  import bInput from "@/shared/ui/bInput.vue"
  import bButton from "@/shared/ui/bButton.vue"

  import pokeCard from "@/entites/pokemon/ui/pokemonCard.vue"

  import { useRouter } from "vue-router"

  const props = defineProps({
    pokemons: Array,
    modelValue: String,
  })

  const emit = defineEmits(["update:modelValue"])

  const model = computed({
    get: () => props.modelValue,
    set: (value) => emit("update:modelValue", value),
  })

  const router = useRouter()

  function handleCardClick(pokemon) {
    router.push({ name: "pokemonPage", params: { id: pokemon.id } })
  }
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
