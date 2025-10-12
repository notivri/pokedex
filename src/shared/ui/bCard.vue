<template>
  <div class="card-wrapper">
    <div class="card">
      <slot />
    </div>
  </div>
</template>

<style scoped>
  .card-wrapper {
    display: flex;
    background-color: var(--color-bg-alt);
    border-radius: 1rem;
    padding: 0.5rem;
  }

  .card {
    width: 100%;
    display: flex;
    text-align: center;
  }

  .card > :deep(*) {
    flex: 1;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    padding: 1rem 0.5rem;
    min-height: 60px;
  }

  .card > :deep(*:not(:last-child))::after {
    content: "";
    display: block;
    width: 2px;
    height: 70%;
    background-color: var(--color-border);
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
</style>
