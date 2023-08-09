<script setup>
import { useProductStore } from '@/stores/productStore';

const route = useRoute();
// const nuxtApp = useNuxtApp()
const slug = ref(route.params.slug);

const store = useProductStore();
const { products, setCategories, countComputed } = store;
const url = 'https://fakestoreapi.com/products/categories';

// const { isFetching, error, data } = useFetch(url);
const { isFetching, error, data, isFinished } = useFetch(url, {
  afterFetch(ctx) {
    console.log(ctx.data);
    setItems(JSON.parse(ctx.data));
  },
});
</script>
<template>
  <div class="text-7xl">slug is : {{ products.items }}</div>
</template>
