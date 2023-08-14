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
    <nav class="flex flex-col gap-6 text-lg w-56 px-2">
      <Search />
      <SortBy />

      <div>
        <span>Categories</span>
        <ul class="pl-2 flex flex-col justify-center items-start text-xl">
          <ListCategory
            v-for="category of products.categories"
            :key="category"
            :category="category"
          />
          <div v-if="!isFinished">
            <svg class="animate-spin h-5 w-5 mr-3 bg-green-400 ..." viewBox="0 0 24 24">
              <!-- ... -->
            </svg>
          </div>
        </ul>
      </div>
    </nav>
  </aside>
</template>
