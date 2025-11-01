<template>
  <span class="loading">
    <img src="@/app/assets/icons/pokeball.svg" alt="Loading..." />
  </span>
</template>

<style scoped>
  .loading {
    width: 50px;
    height: 50px;
    animation: rotation 1s linear infinite;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
