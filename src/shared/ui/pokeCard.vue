<template>
  <div class="card">
    <div class="info">
      <div>
        <h2><slot name="name" /></h2>
        <p><slot name="id" /></p>
      </div>
      <div class="types">
        <slot name="types" />
      </div>
    </div>
    <div class="logo" :style="{ backgroundColor: props.color ?? black }">
      <img
        class="pokeball"
        src="@/app/assets/icons/pokeball.svg"
        alt="pokeball"
      />
      <div class="image-wrapper">
        <slot class="image-container" name="image" />
      </div>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps(["color"])
</script>

<style scoped>
  .card {
    display: flex;
    justify-content: space-between;
    width: 27rem;
    height: 10rem;
    background-color: #f6f7f9;
    border-radius: 2rem;
  }

  .info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1.5rem 1rem;
    z-index: 3;

    & .types {
      display: flex;
      flex-direction: column;
      gap: 0.275rem;
    }

    & h2 {
      font-family: "Archive";
    }

    & p::before {
      content: "#";
    }
  }

  .logo {
    position: relative;
    width: 60%;
    height: auto;
    height: 100%;
    border-radius: 0 2rem 2rem 0;
    z-index: 2;
    overflow: clip;
    overflow-clip-margin: 10rem;
    clip-path: inset(-100% 0 0 0);

    & .image-wrapper {
      transform: translate(5%, -15%);

      & :deep(.pokemon-image) {
        width: 250px;
      }
    }

    & .pokeball {
      width: 10rem;
      height: 10rem;
      position: absolute;
      top: -1rem;
      right: 1rem;
      z-index: -1;
    }
  }
</style>
