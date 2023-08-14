<script setup>
import { useProductStore } from '@/stores/productStore';
import { storeToRefs } from 'pinia';
const store = useProductStore();
const { products } = storeToRefs(store);
defineProps(['isFinished', 'isFetching', 'isFiltering']);
</script>

<template>
  <div class="flex flex-col">
    <div class="flex align-center justify-center mb-4">
      <h1 class="text-2xl">
        {{ products.selectedCategory.charAt(0).toUpperCase() + products.selectedCategory.slice(1) }}
      </h1>
      <span class="ml-4 grow border-b-2 max-h-5 border-dashed border-slate-500"></span>
    </div>
    <div v-if="isFiltering">
      <svg class="animate-spin h-5 w-5 mr-3 bg-green-400 ..." viewBox="0 0 24 24">
        <!-- ... -->
      </svg>
    </div>
    <ul class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 px-2" v-else>
      <div v-if="!products.items">Products not found</div>
      <Product v-else v-for="(item, index) in products.items" :key="index" :product="item" />
    </ul>
  </div>
</template>
