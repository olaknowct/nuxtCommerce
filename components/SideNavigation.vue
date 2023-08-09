<script setup>
import { useProductStore } from '@/stores/productStore';
import { useFetch } from '@vueuse/core';
const store = useProductStore();
const { products, setCategories, countComputed } = store;

const url = 'https://fakestoreapi.com/products/categories';

// const { isFetching, error, data } = useFetch(url);
const { isFetching, error, data, isFinished } = useFetch(url, {
  afterFetch(ctx) {
    // console.log(ctx.data);
    setCategories(JSON.parse(ctx.data));
  },
});
</script>

<template>
  <aside>
    <nav>
      <ul class="flex flex-col text-xl">
        <ListCategory
          v-for="category of products.categories"
          :key="category"
          :category="category"
        />
        <li v-if="isFetching" class="text-gray-500">Loading...</li>
      </ul>
    </nav>
  </aside>
</template>
