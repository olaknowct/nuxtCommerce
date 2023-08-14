<script setup>
import { useProductStore } from '@/stores/productStore';
const store = useProductStore();

const { products } = store;
</script>

<template>
  <div class="flex flex-col gap-2">
    <label for="sortBy">Sort By</label>
    <select
      class="border-2 rounded-2xl px-2 py-1"
      id="sortBy"
      name="sortBy"
      v-model="products.sortBy"
    >
      <option value="alphabetically">Alphabetically</option>
      <option value="pricing">Pricing</option>
      <option value="rating">Rating</option>
    </select>
  </div>
</template>
