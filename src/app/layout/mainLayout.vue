<template>
  <mainHeader v-if="$route.meta.showHeader" />

  <div>
    <router-view v-slot="{ Component }">
      <template v-if="Component">
        <Suspense>
          <component :is="Component"></component>
        </Suspense>
      </template>
    </router-view>
  </div>
</template>

<script setup>
  import mainHeader from "/src/widgets/mainHeader.vue"
</script>
