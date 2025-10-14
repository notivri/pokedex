<template>
  <div class="moves-wrapper">
    <ul>
      <li v-for="m in props.pokemon.moves" :key="m.move.name">
        {{ formatName(m.move.name) }}
      </li>
    </ul>
  </div>
</template>

<script setup>
  const props = defineProps({
    pokemon: {
      moves: Array,
    },
  })

  function formatName(name) {
    return name.replace("-", " ")
  }
</script>

<style scoped>
  .moves-wrapper {
    display: flex;
    flex-direction: column;

    & li {
      padding: 0.5rem 1rem;
      color: var(--color-text-primary);
      text-transform: capitalize;
      border-bottom: 2px solid var(--color-border);
    }
  }
</style>
