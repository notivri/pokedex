<template>
  <nav class="tabs-wrapper">
    <router-link
      v-for="(tab, index) in props.tabs"
      :key="index"
      :to="tab"
      class="tab"
      active-class="active"
    >
      <h3 class="tab-name">
        {{ tab }}
      </h3>
    </router-link>
  </nav>
</template>

<script setup>
  const props = defineProps({
    tabs: Array,
  })
</script>

<style scoped>
  nav {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 1rem;
  }

  .tab {
    text-transform: capitalize;
    padding: 0.5rem;
    filter: opacity(60%);
    transition: 0.2s ease;
    cursor: pointer;

    &.active {
      filter: opacity(100%);

      h3 {
        color: black;
      }
    }
  }

  h3 {
    color: var(--color-text-secondary);
  }
</style>
