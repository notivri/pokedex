<template>
  <div class="type-wrapper">
    <div
      class="image-wrapper"
      :style="{
        'background-color': colors[props.type],
      }"
    >
      <img class="image" :src="pathToIcon" />
    </div>

    <p>
      {{ props.type }}
    </p>
  </div>
</template>

<script setup>
  import { colors } from "@/entites/pokemon/lib/constants"

  const icons = import.meta.glob("@/app/assets/icons/pokemonTypes/*.svg", {
    eager: true,
    import: "default",
  })

  const props = defineProps({
    type: String,
  })

  const pathToIcon = computed(
    () => icons[`/src/app/assets/icons/pokemonTypes/${props.type}.svg`]
  )
</script>

<style scoped>
  .type-wrapper {
    width: fit-content;
    display: flex;
    justify-content: start;
    align-items: center;
    background-color: hsla(0, 0%, 0%, 0.2);
    border-radius: 1rem;
    padding: 0.2rem 0.5rem 0.2rem 0.2rem;
    gap: 0.2rem;
    transition: all 0.2s;

    .image-wrapper {
      width: 1rem;
      height: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 100%;
      padding: 0.2rem;
      transition: all 0.2s;
    }

    .image {
      width: 100%;
      height: 100%;
    }

    &.no-bg {
      background-color: transparent;
    }

    &.no-text {
      padding: 0;
      gap: 0;

      p {
        display: none;
      }
    }

    &.border {
      border: 2px solid var(--color-bg-alt);
    }

    &.big {
      .image-wrapper {
        width: 1.75rem;
        height: 1.75rem;
      }

      .image {
        width: 90%;
      }
    }

    &.text-inverse p {
      color: var(--color-text-primary);
    }

    &.bold p {
      font-weight: bold;
    }
  }

  p {
    color: var(--color-text-inverse);
    text-transform: capitalize;
  }
</style>
