<script setup>
import { useProductStore } from '@/stores/productStore';
import { useFetch } from '@vueuse/core';
const store = useProductStore();
const { products, setItems } = store;
const url = 'https://fakestoreapi.com/products';

// const { isFetching, error, data } = useFetch(url);
const { isFetching, error, data, isFinished } = useFetch(url, {
  afterFetch(ctx) {
    setItems(JSON.parse(ctx.data));
  },
});
</script>

<template>
  <section>
    <div class="text-7xl" v-if="isFetching || !isFinished">looooooooooooooding</div>
    <div class="text-7xl" v-else>{{ products.items }}</div>
  </section>
</template>
