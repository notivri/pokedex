<template>
  <div class="evolutions-wrapper">
    <template v-for="(evolution, index) in props.chain" :key="index">
      <div v-if="evolution.atLevel" class="separator">
        <span class="line" />
        <h3>Level: {{ evolution.atLevel }}</h3>
      </div>

      <div class="evolution-container">
        <div class="image-wrapper">
          <img :src="evolution.image" :alt="evolution.name" />
        </div>
        <div class="info-wrapper">
          <div>
            <h3>#{{ evolution.id.padStart(3, "0") }}</h3>
            <h2>{{ evolution.name }}</h2>
          </div>
          <div class="types-wrapper">
            <pokemonType
              v-for="t in evolution.types"
              :key="t.type.name"
              :type="t.type.name"
              class="text-inverse big bold no-bg border"
            />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
  import pokemonType from "@/entites/pokemon/ui/pokemonType.vue"

  const props = defineProps({
    chain: Array,
  })
</script>

<style scoped>
  .evolutions-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 1rem;

    .separator {
      display: flex;
      align-items: center;
      gap: 1rem;
      transform: translate(calc(-50% - 1rem));

      .line {
        width: 2px;
        height: 5rem;
        background-color: var(--color-border);
      }
    }

    .evolution-container {
      display: flex;
      gap: 0.5rem;
      width: 22rem;
      padding: 0.5rem;
      border-radius: 1rem;
      background-color: var(--color-background);

      .image-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--color-secondary-light);
        width: 10rem;
        height: 7rem;
        border-radius: 1rem;

        img {
          max-width: 100%;
          max-height: 100%;
          border-radius: 1rem;
        }
      }

      .info-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        text-transform: capitalize;

        .types-wrapper {
          display: flex;
          gap: 0.5rem;
        }
      }
    }
  }
</style>
