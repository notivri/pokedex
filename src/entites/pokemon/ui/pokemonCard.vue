<template>
  <div
    class="card-wrapper"
    :style="{ 'background-color': bgColor }"
    @click="emit('click')"
  >
    <div class="name-wrapper">
      <p class="name">
        {{ pokemon.name }}
      </p>
      <p class="id">
        {{ formattedId }}
      </p>
    </div>

    <div class="container">
      <div class="types-wrapper">
        <pokemonType
          v-for="(t, index) in props.pokemon.types"
          :key="index"
          :type="t.type.name"
        />
      </div>
    </div>

    <img id="pokeball" src="@/app/assets/icons/pokeball.svg" />

    <img class="image" :src="spriteSrc" />
  </div>
</template>

<script setup>
  import pokemonType from "./pokemonType.vue"
  import { colors } from "@/entites/pokemon/lib/constants"

  const props = defineProps({
    pokemon: Object,
  })

  const emit = defineEmits(["click"])

  const bgColor = computed(() => {
    const colorName = props?.pokemon?.types?.["0"].type.name

    return colors[colorName]
  })

  const formattedId = computed(() => {
    return String(props.pokemon.id).padStart(3, "0")
  })

  const spriteSrc = computed(() => {
    return props.pokemon?.sprites?.front_default
  })
</script>

<style scoped>
  .card-wrapper {
    max-width: 20rem;
    min-height: 7.5rem;
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1rem;
    border-radius: 1rem;
    gap: 1rem;
    z-index: 1;
    cursor: pointer;

    & #pokeball {
      width: 7rem;
      position: absolute;
      bottom: 0;
      right: 0;
      transform: translate(20%, 20%);
      z-index: -2;
    }
  }

  .name-wrapper {
    display: flex;
    justify-content: space-between;

    .name {
      text-transform: capitalize;
    }

    .id::before {
      content: "#";
    }
  }

  .types-wrapper {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }

  .image {
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: -1;
  }

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  p {
    color: var(--color-text-inverse);
  }
</style>
