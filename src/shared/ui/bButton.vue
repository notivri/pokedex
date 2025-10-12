<template>
  <button>
    <div class="wrapper">
      <div v-if="$slots.icon" class="icon">
        <slot name="icon" />
      </div>
      <p v-if="$slots.text" class="text">
        <slot name="text" />
      </p>
    </div>
  </button>
</template>

<style scoped>
  .wrapper {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    justify-content: center;
    align-items: center;

    &.row {
      flex-direction: row;
    }
  }

  button {
    max-width: 10rem;
    padding: 1rem;
    background-color: var(--color-bg-alt);
    border-radius: 1rem;
    transition: 0.2s ease;

    &.no-bg {
      background-color: transparent;
    }

    &.outline {
      border: 0.2rem solid var(--color-border);
    }
  }

  .icon {
    width: 1.5rem;
    height: 1.5rem;
  }
</style>
