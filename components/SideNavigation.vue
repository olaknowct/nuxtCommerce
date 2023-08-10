<script setup>
import { useProductStore } from '@/stores/productStore';
import { useFetch } from '@vueuse/core';
import { categoriesUrl } from '@/utils/api/productsEndpoints.js';

const store = useProductStore();
const { products } = store;

const { isFetching, error, data, isFinished } = useFetch(categoriesUrl, {
  afterFetch(ctx) {
    store.setCategories(JSON.parse(ctx.data));
  },
});
</script>

<template>
  <aside>
    <nav>
      <SortBy />
      <ul class="flex flex-col text-xl">
        <ListCategory
          v-for="category of store.products.categories"
          :key="category"
          :category="category"
        />
        <li v-if="isFetching" class="text-gray-500">Loading...</li>
      </ul>
    </nav>
  </aside>
</template>
