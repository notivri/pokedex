<template>
  <div class="search-bar-wrapper">
    <bInput v-model="model" placeholder="Search a pokemon" />
    <bButton>
      <template #icon>
        <img src="@\app\assets\icons\filter.svg" alt="" />
      </template>
    </bButton>
  </div>
</template>

<script setup>
  import bInput from "@/shared/ui/bInput.vue"
  import bButton from "@/shared/ui/bButton.vue"

  const props = defineProps({
    modelValue: String,
  })

  const emit = defineEmits(["update:modelValue"])

  const model = computed({
    get: () => props.modelValue,
    set: (value) => emit("update:modelValue", value),
  })
</script>

<style scoped>
  .search-bar-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 0.5rem;
  }
</style>
