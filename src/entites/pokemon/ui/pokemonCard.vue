<template>
  <div
    class="card-wrapper"
    :class="{ skeleton: !isReady }"
    :style="{ 'background-color': isReady ? bgColor : '' }"
    @click="emit('click')"
  >
    <template v-if="isReady">
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
            v-for="(t, index) in types"
            :key="index"
            :type="t.type.name"
          />
        </div>
      </div>

      <img id="pokeball" src="@/app/assets/icons/pokeball.svg" />
    </template>

    <img
      v-if="spriteSrc"
      class="image"
      :src="spriteSrc"
      @load="handleImageLoad"
    />
  </div>
</template>

<script setup>
  import pokemonType from "./pokemonType.vue"
  import { colors } from "@/entites/pokemon/lib/constants"

  const props = defineProps({
    pokemon: { type: Object },
  })

  const emit = defineEmits(["click"])

  const isImageLoaded = ref(false)

  const isReady = computed(() => props.pokemon?.isLoaded && isImageLoaded.value)

  const bgColor = computed(() => {
    const colorName = props.pokemon.types["0"].type.name
    return colors[colorName]
  })

  const formattedId = computed(() => {
    return String(props.pokemon.id).padStart(3, "0")
  })

  const spriteSrc = computed(() => {
    return props.pokemon?.sprites?.front_default
  })

  const types = computed(() => props.pokemon?.types)

  function handleImageLoad() {
    isImageLoaded.value = true
  }
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

  .skeleton {
    background: #c2c2c2;
    animation: pulse 2s infinite;
  }

  p {
    color: var(--color-text-inverse);
  }

  @keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.55;
    }
    100% {
      opacity: 1;
    }
  }
</style>
