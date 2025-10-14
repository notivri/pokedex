<template>
  <div class="stat-bar-wrapper">
    <div class="text-wrapper">
      <h3 class="stat-name">
        {{ name.replace("-", " ").replace("special", "Sp.") }}
      </h3>
      <h3 class="stat-value">{{ value }}</h3>
    </div>

    <div class="bars-wrapper">
      <div
        v-for="i in maxBars"
        :key="i"
        class="bar"
        :class="{ filled: i <= filledBars }"
      />
    </div>
  </div>
</template>

<script setup>
  import { computed } from "vue"

  const props = defineProps({
    name: String,
    value: Number,
    maxValue: Number,
    maxBars: {
      type: Number,
      default: 13,
    },
  })

  const filledBars = computed(() =>
    Math.round((props.value / props.maxValue) * props.maxBars)
  )
</script>

<style scoped>
  .stat-bar-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    width: 100%;
  }

  .text-wrapper {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }

  .stat-name {
    white-space: nowrap;
    text-transform: capitalize;
    text-align: justify;
    color: var(--color-text-secondary);
  }

  .stat-value {
    text-align: end;
    color: var(--color-text-primary);
    font-weight: 500;
  }

  .bars-wrapper {
    display: flex;
    gap: 0.25rem;
  }

  .bar {
    width: 0.7rem;
    height: 1.5rem;
    border-radius: 0.5rem;
    background-color: var(--color-secondary-light);

    &.filled {
      background-color: var(--color-primary);
    }
  }
</style>
