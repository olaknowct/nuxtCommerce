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
    <nav class="flex flex-row md:flex-col gap-6 text-lg w-56 px-2">
      <SortBy />

      <div>
        <span>Categories</span>
        <ul class="pl-2 flex flex-row md:flex-col text-xl">
          <ListCategory
            v-for="category of store.products.categories"
            :key="category"
            :category="category"
          />
          <li v-if="isFetching" class="text-gray-500">Loading...</li>
        </ul>
      </div>
    </nav>
  </aside>
</template>
