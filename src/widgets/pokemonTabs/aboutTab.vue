<template v-if="props.pokemon">
  <div class="wrapper">
    <h3>{{ flavor_text }}</h3>

    <bCard>
      <span class="text-wrapper">
        <h2>{{ pokemonWeight }} kg</h2>
        <p>Weight</p>
      </span>

      <span class="text-wrapper">
        <h2>{{ pokemonHeight }} cm</h2>
        <p>Height</p>
      </span>
    </bCard>

    <bCard>
      <div class="container">
        <span class="types-wrapper">
          <pokemonType
            v-for="t in props.pokemon.types"
            :key="t.type.name"
            :type="t.type.name"
            class="no-text big"
          />
        </span>
        <span>
          <p>Category</p>
        </span>
      </div>

      <div class="container">
        <span class="abilities-wrapper">
          <h3 v-for="(a, index) in props.pokemon.abilities" :key="index">
            {{ a.ability.name }}
          </h3>
        </span>

        <p>Abilities</p>
      </div>
    </bCard>
  </div>
</template>

<script setup>
  import bCard from "@/shared/ui/bCard.vue"
  import pokemonType from "@/entites/pokemon/ui/pokemonType.vue"

  const props = defineProps({
    pokemon: Object,
  })

  const pokemonSpecies = computed(() => {
    return props.pokemon.species
  })

  const flavor_text = computed(() => {
    const entries = pokemonSpecies.value?.flavor_text_entries ?? ""

    const englishEntry = entries.find((entry) => entry.language.name === "en")

    return englishEntry ? englishEntry.flavor_text : ""
  })

  const pokemonWeight = computed(() => {
    return props.pokemon.weight / 10
  })

  const pokemonHeight = computed(() => {
    return props.pokemon.height / 10
  })
</script>

<style scoped>
  .wrapper {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .container {
    gap: 0.5rem;
  }

  .text-wrapper {
    gap: 0.2rem;
  }

  .types-wrapper {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
  }

  .abilities-wrapper {
    display: flex;
    flex-wrap: wrap;
    text-transform: capitalize;
    justify-content: center;

    h3 {
      color: var(--color-text-primary);

      &:not(:last-child)::after {
        content: ",\00a0"; /* Пробел */
      }
    }
  }

  p {
    color: var(--color-text-secondary);
  }
</style>
