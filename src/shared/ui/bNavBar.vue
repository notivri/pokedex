<template>
  <nav class="tabs-wrapper">
    <router-link
      v-for="(tab, index) in props.tabs"
      :key="index"
      :to="tab"
      class="tab"
      active-class="active"
    >
      <h3>{{ tab }}</h3>
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
    justify-content: space-between;
    padding: 1rem;
  }

  .tab {
    text-transform: capitalize;
    padding: 0.5rem;
    transition: 0.2s ease;
    cursor: pointer;

    &.active h3 {
      color: var(--color-text-primary);
    }
  }
</style>
