<script setup>
import { useProductStore } from '@/stores/productStore';
import { productsUrl } from '@/utils/api/productsEndpoints.js';

const store = useProductStore();
let res;
const handleInput = async (event) => {
  const inputValue = event.target.value;
  if (store.searchedItem.length == 0) {
    res = await $fetch(productsUrl);
  }
  store.setSearchItem(res, inputValue);
};
</script>
<template>
  <label class="relative block">
    <span class="sr-only">Search</span>
    <span class="absolute inset-y-0 left-0 flex items-center pl-2">
      <svg class="h-5 w-5 fill-slate-300" viewBox="0 0 20 20"><!-- ... --></svg>
    </span>
    <input
      class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-green-500 focus:ring-green-500 focus:ring-1 sm:text-sm"
      placeholder="Search product"
      type="text"
      name="search"
      @input="handleInput"
    />
  </label>
</template>
