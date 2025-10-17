<template>
  <div class="container">
    <div class="header">
      <h2>Last viewed</h2>
      <a @click="$emit('clearHistory')">Clear</a>
    </div>

    <Swiper
      :modules="[FreeMode]"
      :free-mode="{ enabled: true }"
      :space-between="8"
      slides-per-view="auto"
      class="swiper-container"
    >
      <SwiperSlide
        v-for="pokemon in props.pokemons"
        :key="pokemon.id"
        class="swiper-slide"
      >
        <pokemon-card
          :pokemon="pokemon"
          @click="emits('goToPokemon', pokemon.id)"
        />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup>
  import PokemonCard from "@/entites/pokemon/ui/pokemonCard.vue"
  import { Swiper, SwiperSlide } from "swiper/vue"
  import { FreeMode } from "swiper/modules"
  import "swiper/css"
  import "swiper/css/free-mode"

  const props = defineProps({
    pokemons: Array,
  })

  const emits = defineEmits(["goToPokemon", "clearHistory"])
</script>

<style scoped>
  .container {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem;
      border-bottom: 2px solid var(--color-border);

      a {
        font-size: 16px;
        color: var(--color-text-secondary);
        cursor: pointer;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    .swiper-container {
      width: 100%;

      .swiper-slide {
        flex: 0 0 auto;
        width: 12rem;
      }
    }
  }
</style>
