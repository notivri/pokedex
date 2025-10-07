<template>
  <div class="type">
    <h3><slot /></h3>
  </div>
</template>

<style scoped>
  .type {
    display: flex;
    justify-content: center;
    align-items: center;
    width: max-content;
    border-radius: 10rem;
    padding: 0.275rem 1rem;
    color: white;
    background-color: #a891ec;
  }
</style>
