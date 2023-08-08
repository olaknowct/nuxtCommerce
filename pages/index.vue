<script setup>
import { useProductStore } from '@/stores/productStore';
import { useFetch } from '@vueuse/core';
const store = useProductStore();
const { products, setCategories } = store;
const url = 'https://fakestoreapi.com/products/categories';

// const { isFetching, error, data } = useFetch(url);
const { isFetching, error, data, isFinished } = useFetch(url, {
  afterFetch(ctx) {
    setCategories(JSON.parse(ctx.data));
  },
});
</script>
<template>
  <section>
    <div class="text-7xl" v-if="isFetching || !isFinished">looooooooooooooding</div>
    <div class="text-7xl" v-else>{{ products.categories }}</div>
  </section>
</template>
