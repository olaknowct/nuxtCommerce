<script setup>
const route = useRoute();
// const nuxtApp = useNuxtApp()
const slug = ref(route.params.slug);
</script>
<template>
  <div class="text-7xl">slug is : {{ slug }}</div>
</template>
